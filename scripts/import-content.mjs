// Ares content importer
// content-source/md (generated from the client's .docx files by scripts/docx2md.py)
//   → src/content/generated/{categories,products,guides}.json
//
// Run:  python -I scripts/docx2md.py content-source/docx content-source/md
//       npm run content:import
//
// Only page copy is imported. Editorial notes ("Kaynaklar ve teknik teyit notları",
// "Editör kontrolü", SEO planning tables) are kept out of the published body; source
// links are preserved in a separate `sources` field for the editorial team.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.join(ROOT, "content-source", "md");
const OUT = path.join(ROOT, "src", "content", "generated");

/** Turkish-safe slugify (ı, İ, ş, ğ, ç, ö, ü). */
export function slugify(s) {
  const map = { ç: "c", ğ: "g", ı: "i", i̇: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };
  return s
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşüâîû]|i̇/g, (c) => map[c] ?? c)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " ve ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Source docs contain "isı/isıl/isıtıcı" (upper-case "Isı" lower-cased with a non-Turkish
// locale). Correct form is "ısı…". Applied to all imported text.
const fixTurkish = (t) => t.replace(/(^|[^\p{L}])isı/gu, "$1ısı");
const read = (p) => fixTurkish(fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n"));
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));

/** Split markdown-ish text into blocks. `hShift` re-bases heading levels so the page H1 stays unique. */
function toBlocks(lines, hShift) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    const h = line.match(/^(#{2,6})\s+(.*)$/);
    if (h) {
      const level = Math.min(4, Math.max(2, h[1].length + hShift));
      blocks.push({ type: "heading", level, text: h[2].trim(), id: slugify(h[2]).slice(0, 80) });
      i++; continue;
    }
    if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && (lines[i].startsWith("- ") || !lines[i].trim())) {
        if (lines[i].startsWith("- ")) items.push(lines[i].slice(2).trim());
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }
    if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        if (!/^\|(---\|)+$/.test(lines[i])) rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      blocks.push({ type: "table", rows });
      continue;
    }
    blocks.push({ type: "p", text: line.trim() });
    i++;
  }
  return blocks;
}

/** Pull FAQ pairs out of a block list starting at the "Sık sorulan sorular" heading. */
function extractFaq(blocks) {
  const start = blocks.findIndex((b) => b.type === "heading" && /sık sorulan sorular/i.test(b.text));
  if (start < 0) return { body: blocks, faq: [], after: [] };
  const faqLevel = blocks[start].level;
  let end = blocks.length;
  for (let j = start + 1; j < blocks.length; j++) {
    if (blocks[j].type === "heading" && blocks[j].level <= faqLevel) { end = j; break; }
  }
  const slice = blocks.slice(start + 1, end);
  const faq = [];
  for (let j = 0; j < slice.length; j++) {
    const b = slice[j];
    const isQ = (b.type === "heading" && b.level > faqLevel) || (b.type === "p" && /\?$/.test(b.text));
    if (isQ) faq.push({ q: b.text, a: [] });
    else if (faq.length && b.type === "p") faq[faq.length - 1].a.push(b.text);
  }
  return { body: blocks.slice(0, start), faq: faq.map((f) => ({ q: f.q, a: f.a.join("\n\n") })), after: blocks.slice(end) };
}

const field = (txt, label) => {
  const m = txt.match(new RegExp(`^${label}\\s+(.+)$`, "m"));
  return m ? m[1].trim() : "";
};
const tableField = (txt, label) => {
  const m = txt.match(new RegExp(`^\\| ${label} \\| (.*?) \\|$`, "m"));
  return m ? m[1].trim() : "";
};
const firstMatch = (txt, re) => {
  const m = txt.match(re);
  return m ? m[1].trim().replace(/\s+/g, " ") : "";
};
const splitList = (s) =>
  s ? s.split(/,\s*/).map((x) => x.trim().replace(/\.$/, "")).filter((x) => x.length > 2) : [];

// ─────────────────────────────── Categories & products ───────────────────────────────

function parseCatalogDoc(file, kind) {
  const txt = read(file);
  const lines = txt.split("\n");
  const base = path.basename(file, ".md");
  const [, num, fileSlug] = base.match(/^(\d+)_(.+)$/);
  const nameEn = (lines[0].split("•")[1] || "").trim();
  const nameTr = (txt.match(/^# (.+)$/m) || [])[1].trim();
  const suggestedUrl = field(txt, "Önerilen URL");
  const urlSlug = (suggestedUrl.match(/\.com\/([^/]+)\/?$/) || [])[1] || fileSlug;

  const startIdx = lines.findIndex((l) => /^## Web sayfası için özgün metin/.test(l));
  const endIdx = lines.findIndex((l) => /^## Önerilen iç bağlantılar/.test(l));
  let bodyLines = lines.slice(startIdx + 1, endIdx < 0 ? undefined : endIdx);
  // drop the duplicated "## {name} | Teknik Ürün ve Satın Alma Rehberi" heading (page H1 replaces it)
  const firstH = bodyLines.findIndex((l) => l.startsWith("## "));
  if (firstH >= 0 && bodyLines[firstH].includes("|")) bodyLines.splice(firstH, 1);
  const blocks = toBlocks(bodyLines, -1);
  const { body, faq, after } = extractFaq(blocks);

  const linkLines = endIdx >= 0 ? lines.slice(endIdx).filter((l) => l.startsWith("- ")) : [];
  const parentLink = linkLines.find((l) => /Ana kategori:/.test(l));
  const parentSlug = parentLink ? (parentLink.match(/\/([^/]+)\/\s*$/) || [])[1] : null;
  const relatedSlugs = linkLines
    .filter((l) => /İlgili ürün:/.test(l))
    .map((l) => (l.match(/\/([^/]+)\/\s*$/) || [])[1])
    .filter(Boolean);
  const sources = lines
    .filter((l) => /^- .+https?:\/\//.test(l))
    .map((l) => { const m = l.slice(2).match(/^(.*?):\s*(https?:\/\/\S+)$/); return m ? { title: m[1].trim(), url: m[2] } : null; })
    .filter(Boolean);

  const flat = body.filter((b) => b.type === "p").map((b) => b.text).join(" ");
  const definition = kind === "product"
    ? firstMatch(flat, new RegExp(`^${nameTr.replace(/[()]/g, ".")},\\s*(.+?\\.)\\s`, "i"))
    : "";

  const record = {
    id: Number(num),
    kind,
    key: fileSlug,
    slug: urlSlug,
    nameTr,
    nameEn,
    seoTitle: field(txt, "SEO title"),
    metaDescription: field(txt, "Meta description"),
    keywords: field(txt, "Anahtar terimler").split(/[;,]\s*/).filter(Boolean),
    audience: field(txt, "Hedef kullanıcı"),
    definition,
    summary: body.find((b) => b.type === "p")?.text ?? "",
    blocks: body,
    faq,
    closing: after,
    sources,
    status: "draft",
  };

  if (kind === "product") {
    record.parentKey = parentSlug;
    record.relatedKeys = relatedSlugs;
    record.facts = {
      useAreas: firstMatch(flat, /Tipik değerlendirme alanları arasında (.+?) sayılabilir/),
      selectionParams: splitList(firstMatch(flat, /şu başlıklar aranmalıdır: (.+?)\.\s/)),
      quoteParams: splitList(firstMatch(flat, /netleştirilmesi gereken bilgiler şunlardır: (.+?)\.\s/)),
      advantage: firstMatch(flat, /beklenen önemli avantaj şudur: (.+?)\.\s/),
      limitation: firstMatch(flat, /Uygulamadaki sınırlama ise (.+?)\.\s/),
      targetGroups: splitList(firstMatch(flat, /ilişkili hedef gruplar arasında (.+?) bulunabilir/)),
      alternatives: firstMatch(flat, /yerine hangi malzemeler düşünülebilir\?\s*(.+?\.)/),
    };
  } else {
    record.childNames = splitList(firstMatch(flat, /alt başlıklar planlanmaktadır: (.+?)\.\s/));
  }
  return record;
}

// ─────────────────────────────── Guides ───────────────────────────────

const SECTOR_FROM_URL = /\/sektorler\/([^/]+)\//;

function parseGuide(file) {
  const txt = read(file);
  const lines = txt.split("\n");
  const base = path.basename(file, ".md");
  const [, code, fileSlug] = base.match(/^([RS]-[\d-]+)_(.+)$/);
  const title = (txt.match(/^# (.+)$/m) || [])[1].trim();
  const meta = lines.find((l) => l.includes("•") && l.includes(code)) || "";
  const [categoryName, , audience] = meta.split("•").map((s) => s.trim());
  const url = tableField(txt, "Önerilen URL");
  const slug = (url.match(/\/([^/]+)\/$/) || [])[1] || fileSlug;
  const sectorKey = (url.match(SECTOR_FROM_URL) || [])[1] || null;

  const start = lines.findIndex((l) => /^### YAYINA HAZIRLANACAK ANA METİN/.test(l));
  const end = lines.findIndex((l) => /^### İç bağlantı ve sayfa ilişkileri/.test(l));
  let bodyLines = lines.slice(start + 1, end < 0 ? undefined : end);
  const h = bodyLines.findIndex((l) => l.startsWith("## "));
  if (h >= 0) bodyLines.splice(h, 1);
  const { body, faq, after } = extractFaq(toBlocks(bodyLines, -1));

  const srcStart = lines.findIndex((l) => /^### Kaynaklar ve teknik editör kontrolü/.test(l));
  const sources = srcStart < 0 ? [] : lines.slice(srcStart)
    .map((l) => l.match(/^(.+?)\s+—\s+(.+?)\s+—\s+(https?:\/\/\S+)$/))
    .filter(Boolean)
    .map((m) => ({ title: `${m[1]} — ${m[2]}`, url: m[3] }));

  const plain = body.filter((b) => b.type === "p").map((b) => b.text).join(" ");
  return {
    code,
    kind: code.startsWith("S-") ? "sector" : "technical",
    slug,
    title,
    seoTitle: tableField(txt, "SEO Title") || title,
    metaDescription: tableField(txt, "Meta açıklama"),
    intent: tableField(txt, "Arama niyeti"),
    audience: audience || tableField(txt, "Öncelikli müşteri"),
    categoryName: categoryName || tableField(txt, "Bağlanacak ana kategori"),
    sectorKey,
    sectorName: code.startsWith("S-") ? audience : null,
    summary: body.find((b) => b.type === "p")?.text ?? "",
    blocks: [...body, ...after],
    faq,
    sources,
    wordCount: plain.split(/\s+/).length,
    readingMinutes: Math.max(3, Math.round(plain.split(/\s+/).length / 200)),
    status: "draft",
  };
}

// ─────────────────────────────── Relations ───────────────────────────────

function scoreProductForGuide(product, guide) {
  const stem = product.nameTr.toLocaleLowerCase("tr-TR").replace(/\(.*?\)/g, "").trim();
  const words = stem.split(/\s+/).filter((w) => w.length > 3);
  const title = guide.title.toLocaleLowerCase("tr-TR");
  const body = guide.blocks.filter((b) => b.type === "p").map((b) => b.text).join(" ").toLocaleLowerCase("tr-TR");
  let s = 0;
  if (title.includes(stem)) s += 12;
  // the distinctive word of the product name (e.g. "battaniye", "modül", "harç")
  const last = words[words.length - 1];
  if (last && title.includes(last.slice(0, Math.max(5, last.length - 2)))) s += 6;
  const occ = body.split(stem).length - 1;
  s += Math.min(occ, 6);
  return s;
}

function main() {
  const catFiles = walk(path.join(SRC, "ARES_Kategori_49"));
  const categories = catFiles.filter((f) => f.includes("01_Ana_Kategoriler")).sort().map((f) => parseCatalogDoc(f, "category"));
  const products = catFiles.filter((f) => f.includes("02_Alt_Urun_Gruplari")).sort().map((f) => parseCatalogDoc(f, "product"));

  // Category keys: the docx file slug. Their link targets in product docs use the same slug.
  for (const p of products) {
    const cat = categories.find((c) => c.key === p.parentKey);
    if (!cat) throw new Error(`Category not found for ${p.key}: ${p.parentKey}`);
    p.categoryKey = cat.key;
    delete p.parentKey;
  }
  for (const c of categories) c.productKeys = products.filter((p) => p.categoryKey === c.key).map((p) => p.key);

  const guideFiles = walk(SRC).filter((f) => /ARES_Rehber_0\d/.test(f) && f.endsWith(".md")).sort();
  const guides = guideFiles.map(parseGuide);
  for (const g of guides) {
    const cat = categories.find((c) => c.nameTr.toLocaleLowerCase("tr-TR") === g.categoryName.toLocaleLowerCase("tr-TR"));
    if (!cat) throw new Error(`Guide ${g.code}: unknown category "${g.categoryName}"`);
    g.categoryKey = cat.key;
    g.productKeys = products
      .filter((p) => p.categoryKey === cat.key)
      .map((p) => ({ k: p.key, s: scoreProductForGuide(p, g) }))
      .filter((x) => x.s >= 4)
      .sort((a, b) => b.s - a.s)
      .slice(0, 3)
      .map((x) => x.k);
  }

  // Duplicate slug guard (URLs must be unique per namespace)
  const seen = new Map();
  for (const g of guides) {
    const k = `${g.sectorKey || "tr"}/${g.slug}`;
    if (seen.has(k)) throw new Error(`Duplicate guide slug ${k}: ${seen.get(k)} & ${g.code}`);
    seen.set(k, g.code);
  }
  const rootSlugs = [...categories, ...products].map((x) => x.slug);
  const dup = rootSlugs.filter((s, i) => rootSlugs.indexOf(s) !== i);
  if (dup.length) throw new Error(`Duplicate catalog slugs: ${dup.join(", ")}`);

  // Turkish character check on every slug
  const bad = [...rootSlugs, ...guides.map((g) => g.slug)].filter((s) => !/^[a-z0-9-]+$/.test(s));
  if (bad.length) throw new Error(`Non-ASCII slugs: ${bad.join(", ")}`);

  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, "categories.json"), JSON.stringify(categories, null, 1));
  fs.writeFileSync(path.join(OUT, "products.json"), JSON.stringify(products, null, 1));
  fs.writeFileSync(path.join(OUT, "guides.json"), JSON.stringify(guides, null, 1));

  const unlinked = guides.filter((g) => !g.productKeys.length).length;
  const emptyFacts = products.filter((p) => !p.facts.selectionParams.length || !p.definition).map((p) => p.key);
  console.log(`categories ${categories.length}, products ${products.length}, guides ${guides.length} (technical ${guides.filter((g) => g.kind === "technical").length}, sector ${guides.filter((g) => g.kind === "sector").length})`);
  console.log(`guides without product match: ${unlinked}`);
  console.log(`products with missing extracted facts: ${emptyFacts.join(", ") || "none"}`);
}

main();
