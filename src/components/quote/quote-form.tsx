"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileUp, Loader2, Paperclip, Plus, Trash2, X } from "lucide-react";
import { quoteStore, type QuoteItem } from "@/lib/quote-store";
import { FILE_RULES, PURPOSES, UNITS } from "@/lib/quote-schema";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

const T = {
  tr: {
    steps: ["Ürünler", "Teknik detay", "İletişim"],
    emptyTitle: "Teklif listeniz boş",
    emptyText: "Ürün sayfalarından ürün ekleyebilir ya da aşağıya listede olmayan ürünleri yazabilirsiniz.",
    browse: "Ürün kataloğu",
    qty: "Miktar", unit: "Birim", specs: "Teknik özellik / ölçü / kalınlık / yoğunluk", remove: "Kaldır",
    other: "Listede olmayan ürünler veya mevcut ürün kodu",
    otherPh: "Örn. 1260 °C sınıfı, 25 mm, 128 kg/m³ seramik elyaf battaniye — 40 rulo",
    purpose: "Talep türü",
    purposes: { new_project: "Yeni proje", maintenance: "Bakım / onarım", serial_production: "Seri üretim tedariki", export_distribution: "İthalat / distribütörlük", other: "Diğer" },
    delivery: "Teslim yeri (il / ülke)", deliveryPh: "Örn. Kocaeli, Gebze",
    date: "İstenen teslim tarihi", datePh: "Örn. Mart 2027 veya 4 hafta içinde",
    notes: "Uygulama ve çalışma koşulları", notesPh: "Ekipman, çalışma sıcaklığı, atmosfer, mevcut malzeme, şartname notları…",
    files: "Teknik şartname, çizim veya TDS", filesHint: `En fazla ${FILE_RULES.maxFiles} dosya, her biri 10 MB. PDF, DWG, DXF, XLSX, DOCX, JPG, PNG.`,
    company: "Firma adı", name: "Ad soyad", email: "E-posta", phone: "Telefon", country: "Ülke",
    consent: "Kişisel verilerimin teklif talebimin yanıtlanması amacıyla işlenmesine ilişkin", consentLink: "KVKK Aydınlatma Metni", consentEnd: "’ni okudum.",
    next: "Devam", back: "Geri", submit: "Teklif talebini gönder", sending: "Gönderiliyor…",
    successTitle: "Talebiniz alındı", successText: "Teknik ekibimiz talebinizi inceleyip size e-posta ile dönecek. Referans numaranız:",
    again: "Yeni talep oluştur",
    required: "Bu alan gerekli.",
    errors: { rate_limited: "Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.", file_type: "Dosya türü desteklenmiyor:", file_size: "Dosya 10 MB sınırını aşıyor:", file_signature: "Dosya içeriği uzantısıyla uyuşmuyor:", too_many_files: "En fazla 3 dosya ekleyebilirsiniz.", default: "Gönderim başarısız oldu. Lütfen tekrar deneyin veya e-posta ile ulaşın." },
    noItems: "En az bir ürün ekleyin veya ürününüzü yazın.",
  },
  en: {
    steps: ["Products", "Technical details", "Contact"],
    emptyTitle: "Your RFQ list is empty",
    emptyText: "Add products from the catalogue, or describe the products you need below.",
    browse: "Product catalogue",
    qty: "Quantity", unit: "Unit", specs: "Specification / size / thickness / density", remove: "Remove",
    other: "Other products or current product codes",
    otherPh: "e.g. 1260 °C grade ceramic fiber blanket, 25 mm, 128 kg/m³ — 40 rolls",
    purpose: "Request type",
    purposes: { new_project: "New project", maintenance: "Maintenance / repair", serial_production: "Serial production supply", export_distribution: "Import / distribution", other: "Other" },
    delivery: "Delivery destination (city / country)", deliveryPh: "e.g. Rotterdam, Netherlands",
    date: "Required delivery date", datePh: "e.g. March 2027 or within 6 weeks",
    notes: "Application and operating conditions", notesPh: "Equipment, operating temperature, atmosphere, current material, Incoterms…",
    files: "Specification, drawing or TDS", filesHint: `Up to ${FILE_RULES.maxFiles} files, 10 MB each. PDF, DWG, DXF, XLSX, DOCX, JPG, PNG.`,
    company: "Company", name: "Full name", email: "Email", phone: "Phone", country: "Country",
    consent: "I have read the", consentLink: "Privacy Notice", consentEnd: " and agree to my data being processed to answer this request.",
    next: "Continue", back: "Back", submit: "Send RFQ", sending: "Sending…",
    successTitle: "Request received", successText: "Our technical team will review your request and reply by email. Your reference:",
    again: "Start a new request",
    required: "Required.",
    errors: { rate_limited: "Too many attempts. Please try again in a few minutes.", file_type: "Unsupported file type:", file_size: "File exceeds 10 MB:", file_signature: "File content does not match its extension:", too_many_files: "Maximum 3 files.", default: "Sending failed. Please try again or email us." },
    noItems: "Add at least one product or describe what you need.",
  },
} as const;

const input = "h-12 w-full rounded-xl border border-line bg-bg px-4 text-base text-ink sm:text-[0.95rem] placeholder:text-ink-3 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";
const label = "mb-1.5 block text-sm font-medium text-ink";

export function QuoteForm({ locale, catalogHref, privacyHref }: { locale: Locale; catalogHref: string; privacyHref: string }) {
  const t = T[locale];
  const store = quoteStore(locale);
  const items = store((s) => s.items);
  const update = store((s) => s.update);
  const remove = store((s) => s.remove);
  const hydrated = useSyncExternalStore((cb) => store.persist.onFinishHydration(cb), () => store.persist.hasHydrated(), () => false);

  const [step, setStep] = useState(0);
  const [startedAt] = useState(() => Date.now());
  const [other, setOther] = useState("");
  const [purpose, setPurpose] = useState<(typeof PURPOSES)[number] | "">("");
  const [delivery, setDelivery] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [contact, setContact] = useState({ company: "", name: "", email: "", phone: "", country: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<{ status: "idle" | "sending" | "done" | "error"; ref?: string; message?: string }>({ status: "idle" });
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step > 0) track({ event: "quote_step", step: step + 1 });
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0 && items.length === 0 && other.trim().length < 4) e.items = t.noItems;
    if (s === 1 && delivery.trim().length < 2) e.delivery = t.required;
    if (s === 2) {
      if (contact.company.trim().length < 2) e.company = t.required;
      if (contact.name.trim().length < 2) e.name = t.required;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) e.email = t.required;
      if (!consent) e.consent = t.required;
    }
    setErrors(e);
    if (Object.keys(e).length) {
      track({ event: "quote_error", reason: Object.keys(e).join(",") });
      requestAnimationFrame(() => document.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());
    }
    return !Object.keys(e).length;
  };

  const submit = async () => {
    if (!validate(2)) return;
    setState({ status: "sending" });
    const fd = new FormData();
    fd.set(
      "data",
      JSON.stringify({
        site: locale,
        items: items.map(({ key, name, category, quantity, unit, specs }) => ({ key, name, category, quantity, unit, specs })),
        otherProducts: other,
        purpose: purpose || undefined,
        deliveryLocation: delivery,
        deliveryDate: date,
        notes,
        ...contact,
        consent,
        startedAt,
      }),
    );
    files.forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/v1/quote/", { method: "POST", body: fd });
      const body = await res.json();
      if (!res.ok || !body.ok) {
        const code = body?.error?.code as keyof typeof t.errors | undefined;
        const msg = code && code in t.errors ? `${t.errors[code]} ${typeof body.error.details === "string" ? body.error.details : ""}` : t.errors.default;
        setState({ status: "error", message: msg });
        track({ event: "quote_error", reason: code ?? "unknown" });
        return;
      }
      track({ event: "quote_submit", items: items.length, has_files: files.length > 0 });
      store.getState().clear();
      setState({ status: "done", ref: body.ref });
    } catch {
      setState({ status: "error", message: t.errors.default });
    }
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const next = [...files];
    for (const f of Array.from(list)) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!(FILE_RULES.extensions as readonly string[]).includes(ext)) { setErrors({ files: `${t.errors.file_type} ${f.name}` }); continue; }
      if (f.size > FILE_RULES.maxBytes) { setErrors({ files: `${t.errors.file_size} ${f.name}` }); continue; }
      if (next.length < FILE_RULES.maxFiles) next.push(f);
    }
    setFiles(next);
  };

  if (state.status === "done") {
    return (
      <div className="card p-10 text-center" role="status">
        <CheckCircle2 aria-hidden className="mx-auto size-12 text-accent" strokeWidth={1.5} />
        <h2 className="mt-6 text-h3 font-semibold text-ink">{t.successTitle}</h2>
        <p className="mx-auto mt-3 max-w-md text-ink-2">{t.successText}</p>
        <p className="mt-4 font-mono text-lg font-semibold text-ink">{state.ref}</p>
        <button type="button" onClick={() => { setState({ status: "idle" }); setStep(0); }} className="mt-8 h-12 rounded-full border border-line px-6 text-sm font-medium text-ink hover:bg-sunken">
          {t.again}
        </button>
      </div>
    );
  }

  return (
    <div ref={topRef} id="form" className="scroll-mt-28">
      {/* Stepper */}
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Adımlar">
        {t.steps.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1 rounded-full transition-colors duration-500", i <= step ? "bg-accent" : "bg-line")} />
            <span className={cn("mt-2 block text-sm", i === step ? "font-semibold text-ink" : "text-ink-3")}>
              <span className="font-mono text-xs">0{i + 1}</span> {s}
            </span>
          </li>
        ))}
      </ol>

      <div className="card p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
            {step === 0 && (
              <fieldset>
                <legend className="sr-only">{t.steps[0]}</legend>
                {!hydrated ? (
                  <div className="h-28 animate-pulse rounded-xl bg-sunken" />
                ) : items.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-line-strong p-6 text-center">
                    <p className="font-medium text-ink">{t.emptyTitle}</p>
                    <p className="mt-1 text-sm text-ink-3">{t.emptyText}</p>
                    <Link href={catalogHref} className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-bg"><Plus aria-hidden className="size-4" />{t.browse}</Link>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {items.map((it: QuoteItem) => (
                      <li key={it.key} className="rounded-xl border border-line bg-bg p-4 sm:p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-ink-3">{it.category}</p>
                            <Link href={it.href} className="font-semibold text-ink hover:text-accent">{it.name}</Link>
                          </div>
                          <button type="button" onClick={() => remove(it.key)} className="grid size-10 shrink-0 place-items-center rounded-full text-ink-3 hover:bg-sunken hover:text-ink" aria-label={`${t.remove}: ${it.name}`}>
                            <Trash2 aria-hidden className="size-4" />
                          </button>
                        </div>
                        <div className="mt-4 grid gap-3 sm:grid-cols-[8rem_7rem_1fr]">
                          <label><span className={label}>{t.qty}</span><input className={input} inputMode="decimal" value={it.quantity} onChange={(e) => update(it.key, { quantity: e.target.value })} /></label>
                          <label><span className={label}>{t.unit}</span>
                            <select className={input} value={it.unit} onChange={(e) => update(it.key, { unit: e.target.value as QuoteItem["unit"] })}>
                              {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                            </select>
                          </label>
                          <label><span className={label}>{t.specs}</span><input className={input} value={it.specs} onChange={(e) => update(it.key, { specs: e.target.value })} /></label>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <label className="mt-6 block">
                  <span className={label}>{t.other}</span>
                  <textarea className={cn(input, "h-auto min-h-24 py-3")} value={other} onChange={(e) => setOther(e.target.value)} placeholder={t.otherPh} aria-invalid={!!errors.items} />
                </label>
                {errors.items && <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.items}</p>}
              </fieldset>
            )}

            {step === 1 && (
              <fieldset className="grid gap-5 sm:grid-cols-2">
                <legend className="sr-only">{t.steps[1]}</legend>
                <label className="sm:col-span-2">
                  <span className={label}>{t.purpose}</span>
                  <div className="flex flex-wrap gap-2">
                    {PURPOSES.map((p) => (
                      <button key={p} type="button" aria-pressed={purpose === p} onClick={() => setPurpose(p)} className={cn("min-h-10 rounded-full border px-4 text-sm", purpose === p ? "border-accent bg-accent-soft text-accent" : "border-line text-ink-2 hover:border-line-strong")}>
                        {t.purposes[p]}
                      </button>
                    ))}
                  </div>
                </label>
                <label>
                  <span className={label}>{t.delivery} *</span>
                  <input className={input} value={delivery} onChange={(e) => setDelivery(e.target.value)} placeholder={t.deliveryPh} aria-invalid={!!errors.delivery} autoComplete="address-level2" />
                  {errors.delivery && <span className="mt-1 block text-sm text-red-600 dark:text-red-400">{errors.delivery}</span>}
                </label>
                <label>
                  <span className={label}>{t.date}</span>
                  <input className={input} value={date} onChange={(e) => setDate(e.target.value)} placeholder={t.datePh} />
                </label>
                <label className="sm:col-span-2">
                  <span className={label}>{t.notes}</span>
                  <textarea className={cn(input, "h-auto min-h-28 py-3")} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={t.notesPh} />
                </label>
                <div className="sm:col-span-2">
                  <span className={label}>{t.files}</span>
                  <label
                    className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line-strong bg-bg px-6 py-8 text-center transition-colors hover:border-accent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
                  >
                    <FileUp aria-hidden className="size-6 text-accent" />
                    <span className="text-sm text-ink-2">{t.filesHint}</span>
                    <input type="file" multiple className="sr-only" accept={FILE_RULES.extensions.map((e) => `.${e}`).join(",")} onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                  </label>
                  {errors.files && <p className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.files}</p>}
                  {files.length > 0 && (
                    <ul className="mt-3 space-y-2">
                      {files.map((f, i) => (
                        <li key={f.name + i} className="flex items-center justify-between rounded-lg bg-sunken px-3 py-2 text-sm">
                          <span className="flex min-w-0 items-center gap-2 text-ink-2"><Paperclip aria-hidden className="size-4 shrink-0" /><span className="truncate">{f.name}</span><span className="shrink-0 text-ink-3">{(f.size / 1024 / 1024).toFixed(1)} MB</span></span>
                          <button type="button" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="grid size-8 place-items-center rounded-full hover:bg-elev" aria-label={`${t.remove}: ${f.name}`}><X aria-hidden className="size-4" /></button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className="grid gap-5 sm:grid-cols-2">
                <legend className="sr-only">{t.steps[2]}</legend>
                {(["company", "name", "email", "phone", "country"] as const).map((k) => (
                  <label key={k} className={k === "company" ? "sm:col-span-2" : undefined}>
                    <span className={label}>{t[k]}{["company", "name", "email"].includes(k) ? " *" : ""}</span>
                    <input
                      className={input}
                      type={k === "email" ? "email" : k === "phone" ? "tel" : "text"}
                      autoComplete={{ company: "organization", name: "name", email: "email", phone: "tel", country: "country-name" }[k]}
                      value={contact[k]}
                      onChange={(e) => setContact({ ...contact, [k]: e.target.value })}
                      aria-invalid={!!errors[k]}
                    />
                    {errors[k] && <span className="mt-1 block text-sm text-red-600 dark:text-red-400">{errors[k]}</span>}
                  </label>
                ))}
                {/* honeypot */}
                <label aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
                  Website <input tabIndex={-1} autoComplete="off" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} />
                </label>
                <label className="flex items-start gap-3 sm:col-span-2">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={!!errors.consent} className="mt-1 size-5 shrink-0 accent-[var(--accent)]" />
                  <span className="text-sm leading-relaxed text-ink-2">
                    {t.consent} <Link href={privacyHref} className="text-accent underline underline-offset-4" target="_blank">{t.consentLink}</Link>{t.consentEnd} *
                  </span>
                </label>
                {errors.consent && <p className="text-sm text-red-600 dark:text-red-400 sm:col-span-2">{errors.consent}</p>}
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {state.status === "error" && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300" role="alert">{state.message}</p>}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
          {step > 0 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-ink-2 hover:text-ink">
              <ArrowLeft aria-hidden className="size-4" /> {t.back}
            </button>
          ) : <span />}
          {step < 2 ? (
            <button type="button" onClick={() => validate(step) && setStep(step + 1)} className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-ink hover:bg-accent-hover">
              {t.next} <ArrowRight aria-hidden className="size-4" />
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={state.status === "sending"} className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 font-medium text-accent-ink hover:bg-accent-hover disabled:opacity-60">
              {state.status === "sending" ? <><Loader2 aria-hidden className="size-4 animate-spin" />{t.sending}</> : <>{t.submit} <ArrowRight aria-hidden className="size-4" /></>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
