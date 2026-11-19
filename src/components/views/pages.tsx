import Link from "next/link";
import { ClipboardList, FileCheck2, Globe2, Mail, MapPin, Phone, Ruler, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { QuoteForm } from "@/components/quote/quote-form";
import { FinalCta } from "@/components/views/home";
import { otherSiteHref } from "@/components/layout/site-chrome";
import { COMPANY } from "@/content/company";
import { stats } from "@/lib/content";
import { dict, href, routes, type Locale } from "@/lib/i18n";
import { breadcrumbLd, graph } from "@/lib/seo";

function PageHero({ locale, title, lead, eyebrow, crumb, path }: { locale: Locale; title: string; lead: string; eyebrow: string; crumb: string; path: string }) {
  const t = dict[locale];
  return (
    <section className="paper border-b border-line">
      <JsonLd data={graph(breadcrumbLd(locale, [{ name: t.home, path: "/" }, { name: crumb, path }]))} />
      <div className="container-x py-12 lg:py-16">
        <Breadcrumbs items={[{ name: t.home, href: href(locale, "/") }, { name: crumb, href: href(locale, path) }]} />
        <div className="mt-8 max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-4 text-h1 font-semibold text-ink">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2">{lead}</p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────── Quote ─────────────────────────────

export function QuoteView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const r = routes[locale];
  const tr = locale === "tr";
  return (
    <>
      <PageHero
        locale={locale}
        path={r.quote}
        crumb={t.quoteList}
        eyebrow={tr ? "B2B teklif talebi" : "B2B request for quotation"}
        title={tr ? "Teklif listeniz" : "Your RFQ list"}
        lead={tr
          ? "Ürünlerinizi, miktarları ve teknik detayları tek formda iletin. Şartname veya çizim ekleyebilirsiniz; talebiniz teknik kontrolden sonra yazılı teklifle yanıtlanır."
          : "Send products, quantities and technical details in one form. Attach your specification or drawing; we reply with a written quotation after technical review."}
      />
      <section className="py-12 lg:py-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <QuoteForm locale={locale} catalogHref={href(locale, r.products)} privacyHref={href(locale, r.privacy)} />
          </div>
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-5">
              <div className="rounded-2xl bg-graphite p-7 text-on-graphite">
                <p className="font-semibold">{tr ? "Teklifinizi hızlandıran bilgiler" : "What speeds up your quotation"}</p>
                <ul className="mt-5 space-y-4 text-sm text-on-graphite-2">
                  {(tr
                    ? [[FileCheck2, "Mevcut ürün kodu veya üretici teknik föyü (TDS)"], [Ruler, "Ölçü, kalınlık, yoğunluk ve toleranslar"], [ClipboardList, "Yıllık veya proje bazlı miktar"], [MapPin, "Teslim yeri ve istenen tarih"]]
                    : [[FileCheck2, "Current product code or manufacturer datasheet (TDS)"], [Ruler, "Dimensions, thickness, density and tolerances"], [ClipboardList, "Annual or project quantity"], [Globe2, "Destination and Incoterms"]]
                  ).map(([Icon, text]) => {
                    const I = Icon as typeof FileCheck2;
                    return <li key={text as string} className="flex gap-3"><I aria-hidden className="mt-0.5 size-4 shrink-0 text-bronze" />{text as string}</li>;
                  })}
                </ul>
              </div>
              <div className="rounded-2xl border border-line p-6 text-sm leading-relaxed text-ink-3">
                <ShieldCheck aria-hidden className="mb-3 size-5 text-accent" />
                {tr
                  ? "Bilgileriniz yalnızca teklif talebinizi yanıtlamak için kullanılır ve üçüncü kişilerle pazarlama amacıyla paylaşılmaz."
                  : "Your details are used only to answer your request and are never shared for marketing."}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

// ───────────────────────────── About ─────────────────────────────

export function AboutView({ locale }: { locale: Locale }) {
  const r = routes[locale];
  const tr = locale === "tr";
  const principles = tr
    ? [
        ["Önce uygulama koşulu", "Ürün adından önce çalışma sıcaklığını, ekipmanı, montaj şeklini ve mevcut malzemeyi sorarız."],
        ["Belgeye dayalı teklif", "Teknik veriler üretici TDS/SDS belgeleriyle eşleştirilir; doğrulanmamış değer, stok veya sertifika iddiası kullanılmaz."],
        ["Aynı referansla tekrar", "Onaylanan ürün tanımı, sonraki partilerde de korunur; farklı sınıf yazılı teyit olmadan sevk edilmez."],
        ["Türkiye ve ihracat", "Aynı ürün portföyü ve referansları Türkiye ve global sitede tutarlı biçimde kullanılır."],
      ]
    : [
        ["Operating conditions first", "Before product names, we ask about temperature, equipment, installation and current materials."],
        ["Document-based quotations", "Technical values are matched to manufacturer TDS/SDS; no unverified values, stock or certification claims."],
        ["Repeatable references", "An approved product definition is kept for repeat batches; no grade change without written confirmation."],
        ["Türkiye & export", "One product portfolio and consistent references across the Turkish and global sites."],
      ];
  return (
    <>
      <PageHero
        locale={locale}
        path={r.about}
        crumb={dict[locale].nav.about}
        eyebrow={tr ? "Kurumsal" : "Company"}
        title={tr ? "Seramik yünü odağında teknik tedarik" : "Technical supply with a ceramic fiber focus"}
        lead={tr
          ? "Ares İzolasyon; seramik yünü başta olmak üzere refrakter ve yüksek sıcaklık izolasyon malzemelerinde, sanayi kuruluşlarının teknik ihtiyacını doğru ürün ve belgeyle eşleştirmek için kuruldu."
          : "Ares supplies ceramic fiber, refractory and high-temperature insulation materials to industrial manufacturers, matching each technical requirement with the right product and documentation."}
      />
      <section className="py-16 lg:py-20">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {principles.map(([title, text], i) => (
            <div key={title} className="card p-8">
              <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
              <h2 className="mt-4 text-h3 font-semibold text-ink">{title}</h2>
              <p className="mt-3 leading-relaxed text-ink-2">{text}</p>
            </div>
          ))}
        </div>
        <div className="container-x mt-12">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {[[stats.categories, tr ? "ana kategori" : "categories"], [stats.products, tr ? "ürün grubu" : "product groups"], [stats.sectors, tr ? "hedef sektör" : "industries"], [2, tr ? "pazar: Türkiye + global" : "markets: Türkiye + global"]].map(([n, l]) => (
              <div key={l as string} className="bg-elev p-7">
                <dt className="sr-only">{l}</dt>
                <dd className="font-[family-name:var(--font-display)] text-4xl font-semibold text-ink">{n}</dd>
                <dd className="mt-1 text-sm text-ink-3">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <FinalCta locale={locale} title={tr ? "Birlikte çalışalım" : "Let's work together"} lead={tr ? "Ürün ve şartnamenizi paylaşın, teknik ekibimiz dönüş yapsın." : "Share your product needs and specification; our technical team will get back to you."} />
    </>
  );
}

// ───────────────────────────── Contact ─────────────────────────────

export function ContactView({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const r = routes[locale];
  const tr = locale === "tr";
  const rows = [
    COMPANY.email && { icon: Mail, label: tr ? "E-posta" : "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    COMPANY.phone && { icon: Phone, label: tr ? "Telefon" : "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, "")}` },
    COMPANY.address[locale] && { icon: MapPin, label: tr ? "Adres" : "Address", value: COMPANY.address[locale], href: COMPANY.mapsUrl || undefined },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href?: string }[];
  return (
    <>
      <PageHero
        locale={locale}
        path={r.contact}
        crumb={t.nav.contact}
        eyebrow={t.nav.contact}
        title={tr ? "Teknik ekibimize ulaşın" : "Talk to our technical team"}
        lead={tr ? "Teklif talepleri için en hızlı yol teklif formudur: ürün, miktar ve teknik dosyanızı tek seferde iletirsiniz." : "The fastest route is the RFQ form: send products, quantities and technical files in one go."}
      />
      <section className="py-16 lg:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-graphite p-8 text-on-graphite lg:p-10">
            <h2 className="text-h3 font-semibold">{tr ? "Teklif ve teknik soru" : "Quotations & technical questions"}</h2>
            <p className="mt-3 leading-relaxed text-on-graphite-2">{tr ? "Şartname, çizim veya TDS ekleyerek teklif isteyin." : "Request a quotation with your specification, drawing or TDS attached."}</p>
            <ButtonLink href={href(locale, r.quote)} className="mt-7">{t.requestQuote}</ButtonLink>
          </div>
          <div className="card p-8 lg:p-10">
            <h2 className="text-h3 font-semibold text-ink">{tr ? "İletişim bilgileri" : "Contact details"}</h2>
            {rows.length ? (
              <ul className="mt-6 space-y-5">
                {rows.map(({ icon: Icon, label, value, href: h }) => (
                  <li key={label} className="flex gap-4">
                    <Icon aria-hidden className="mt-0.5 size-5 text-accent" />
                    <div><p className="text-sm text-ink-3">{label}</p>{h ? <a href={h} className="font-medium text-ink hover:text-accent">{value}</a> : <p className="font-medium text-ink">{value}</p>}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-xl border border-dashed border-line-strong p-4 text-sm text-ink-3">
                {tr ? "Adres, telefon ve e-posta bilgileri firma onayıyla eklenecek." : "Address, phone and email will be added after company confirmation."}
              </p>
            )}
            <p className="mt-8 text-sm text-ink-3">
              {tr ? "Uluslararası talepler için: " : "Turkish market: "}
              <Link className="text-accent underline underline-offset-4" href={otherSiteHref(locale)}>{tr ? "Global site (EN)" : "aresizolasyon.com"}</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

// ───────────────────────────── Privacy (draft) ─────────────────────────────

export function PrivacyView({ locale }: { locale: Locale }) {
  const r = routes[locale];
  const tr = locale === "tr";
  const sections = tr
    ? [
        ["Veri sorumlusu", "Ares İzolasyon (unvan, adres ve MERSİS bilgisi firma tarafından eklenecektir)."],
        ["İşlenen veriler", "Teklif formunda paylaştığınız firma adı, ad soyad, e-posta, telefon, ülke; talep edilen ürün, miktar, teslim yeri ve yüklediğiniz teknik dosyalar."],
        ["İşleme amacı ve hukuki sebep", "Teklif talebinizin değerlendirilmesi ve yanıtlanması; bir sözleşmenin kurulmasına ilişkin ön görüşme (KVKK m.5/2-c) ve açık rızanız."],
        ["Aktarım", "Veriler, talebin yürütülmesi için kullanılan barındırma ve CRM hizmet sağlayıcıları dışında üçüncü kişilere aktarılmaz."],
        ["Saklama süresi", "Teklif süreci ve ilgili mevzuatın öngördüğü süre boyunca saklanır, sonra silinir veya anonim hale getirilir."],
        ["Çerezler", "Zorunlu tercihler (tema, teklif listesi) cihazınızda saklanır. Analiz çerezleri yalnızca onayınızla yüklenir; tercihinizi tarayıcı verilerini silerek değiştirebilirsiniz."],
        ["Haklarınız", "KVKK m.11 kapsamındaki başvurularınızı firma iletişim adresine iletebilirsiniz."],
      ]
    : [
        ["Controller", "Ares (legal name, address and registration details to be provided by the company)."],
        ["Data we process", "Company, name, email, phone, country, requested products, quantities, destination and any technical files you upload."],
        ["Purpose and legal basis", "To assess and answer your request for quotation (pre-contractual steps, GDPR Art. 6(1)(b)) and your consent."],
        ["Sharing", "Only with hosting and CRM processors used to handle your request."],
        ["Retention", "For the duration of the quotation process and statutory periods, then deleted or anonymised."],
        ["Cookies", "Strictly necessary preferences (theme, RFQ list) are stored on your device. Analytics load only with your consent."],
        ["Your rights", "You may request access, rectification or erasure via the company contact address."],
      ];
  return (
    <>
      <PageHero
        locale={locale}
        path={r.privacy}
        crumb={tr ? "KVKK ve Gizlilik" : "Privacy"}
        eyebrow={tr ? "Yasal" : "Legal"}
        title={tr ? "KVKK Aydınlatma Metni ve Gizlilik" : "Privacy Notice"}
        lead={tr ? "Taslak metin — yayından önce hukuk danışmanı onayı gereklidir." : "Draft — requires legal review before publication."}
      />
      <section className="py-14">
        <div className="container-x max-w-3xl space-y-8">
          {sections.map(([h, p]) => (
            <div key={h}>
              <h2 className="text-lg font-semibold text-ink">{h}</h2>
              <p className="mt-2 leading-relaxed text-ink-2">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
