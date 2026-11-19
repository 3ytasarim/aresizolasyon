import { NextResponse, type NextRequest } from "next/server";
import { createHmac, randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { FILE_RULES, quoteSchema } from "@/lib/quote-schema";

export const runtime = "nodejs";

// ── naive in-memory rate limit (per instance). Swap for Redis/Upstash when deployed to multiple instances.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > LIMIT;
}

const err = (status: number, code: string, details?: unknown) => NextResponse.json({ ok: false, error: { code, details } }, { status });

/** Light content sniffing so a renamed executable can't pass as a PDF. */
function signatureOk(ext: string, buf: Buffer) {
  const head = buf.subarray(0, 8);
  const starts = (sig: number[]) => sig.every((b, i) => head[i] === b);
  switch (ext) {
    case "pdf": return starts([0x25, 0x50, 0x44, 0x46]);
    case "png": return starts([0x89, 0x50, 0x4e, 0x47]);
    case "jpg": case "jpeg": return starts([0xff, 0xd8, 0xff]);
    case "webp": return starts([0x52, 0x49, 0x46, 0x46]);
    case "xlsx": case "docx": case "zip": return starts([0x50, 0x4b]);
    case "xls": case "doc": return starts([0xd0, 0xcf, 0x11, 0xe0]);
    case "dwg": return head.subarray(0, 4).toString("latin1") === "AC10";
    case "dxf": case "csv": return !buf.subarray(0, 512).includes(0);
    default: return false;
  }
}

const safeName = (n: string) => n.normalize("NFKD").replace(/[^\w.\-]+/g, "_").slice(-100);

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return err(429, "rate_limited");

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return err(400, "bad_request");
  }

  let json: unknown;
  try {
    json = JSON.parse(String(form.get("data") ?? ""));
  } catch {
    return err(400, "bad_json");
  }
  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) return err(422, "validation", parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })));
  const data = parsed.data;

  // Bots: honeypot filled or form submitted implausibly fast → pretend success, store nothing.
  if (data.website || Date.now() - data.startedAt < 3000) return NextResponse.json({ ok: true, ref: "AR-0000000" });

  const files = form.getAll("files").filter((f): f is File => typeof f === "object" && "arrayBuffer" in f && f.size > 0);
  if (files.length > FILE_RULES.maxFiles) return err(422, "too_many_files");
  const accepted: { name: string; size: number; type: string; buf: Buffer }[] = [];
  for (const f of files) {
    const ext = (f.name.split(".").pop() ?? "").toLowerCase();
    if (!(FILE_RULES.extensions as readonly string[]).includes(ext)) return err(422, "file_type", f.name);
    if (f.size > FILE_RULES.maxBytes) return err(422, "file_size", f.name);
    const buf = Buffer.from(await f.arrayBuffer());
    if (!signatureOk(ext, buf)) return err(422, "file_signature", f.name);
    accepted.push({ name: safeName(f.name), size: f.size, type: f.type, buf });
  }

  const now = new Date();
  const ref = `AR-${now.toISOString().slice(2, 10).replace(/-/g, "")}-${randomBytes(3).toString("hex").toUpperCase()}`;
  const record = {
    ref,
    receivedAt: now.toISOString(),
    site: data.site,
    contact: { company: data.company, name: data.name, email: data.email, phone: data.phone, country: data.country },
    request: {
      items: data.items,
      otherProducts: data.otherProducts,
      purpose: data.purpose,
      deliveryLocation: data.deliveryLocation,
      deliveryDate: data.deliveryDate,
      notes: data.notes,
    },
    files: accepted.map(({ name, size, type }) => ({ name, size, type })),
    consent: { kvkk: true, at: now.toISOString() },
    meta: { userAgent: req.headers.get("user-agent")?.slice(0, 300), referer: req.headers.get("referer") },
  };

  // 1) durable copy (file storage — replace with DB/CRM adapter in production)
  try {
    const dir = path.resolve(process.env.QUOTE_STORAGE_DIR ?? "./data/quotes", now.toISOString().slice(0, 7), ref);
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "request.json"), JSON.stringify(record, null, 2), "utf8");
    for (const f of accepted) await writeFile(path.join(dir, f.name), f.buf);
  } catch (e) {
    console.error("[quote] storage failed", e);
    return err(500, "storage");
  }

  // 2) CRM hand-off (signed webhook). Failure is logged, never lost: the stored copy remains.
  const hook = process.env.CRM_WEBHOOK_URL;
  if (hook) {
    const body = JSON.stringify(record);
    const sig = createHmac("sha256", process.env.CRM_WEBHOOK_SECRET ?? "").update(body).digest("hex");
    fetch(hook, { method: "POST", headers: { "content-type": "application/json", "x-ares-signature": sig }, body, signal: AbortSignal.timeout(8000) })
      .then((r) => !r.ok && console.error("[quote] webhook status", r.status))
      .catch((e) => console.error("[quote] webhook failed", e));
  }

  return NextResponse.json({ ok: true, ref });
}
