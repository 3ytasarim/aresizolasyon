/**
 * Industry / sector solutions. Keys match the /sektorler/{key}/ URLs in the client's guide plan.
 * Copy is intentionally factual: it describes what the buyer needs to specify, not performance claims.
 */
export type Sector = {
  key: string;
  enSlug: string;
  nameTr: string;
  nameEn: string;
  leadTr: string;
  leadEn: string;
  /** What the buyer typically specifies (rendered as a checklist). */
  specTr: string[];
  specEn: string[];
  categoryKeys: string[];
  featured?: boolean;
};

export const SECTORS: Sector[] = [
  {
    key: "yangin-kapisi-ureticileri",
    enSlug: "fire-door-manufacturers",
    nameTr: "Yangın Kapısı Üreticileri",
    nameEn: "Fire Door Manufacturers",
    leadTr:
      "Yangın kapısı kanadında kullanılan seramik yünü, kapının test edilmiş sistem tasarımının bir parçasıdır. Kalınlık, yoğunluk ve elyaf kimyası her üreticinin şartnamesine göre değişir; Ares tedariki bu şartnameye göre planlar.",
    leadEn:
      "Ceramic fiber inside a fire door leaf is part of the door's tested system. Thickness, density and fiber chemistry follow each manufacturer's own specification — we supply against that specification.",
    specTr: [
      "Mevcut ürün kodu veya teknik föy (TDS)",
      "Kalınlık, yoğunluk ve ölçü toleransı",
      "Elyaf kimyası (ASW/RCF, AES/LBP)",
      "Kapı modeli ve test/uygulama kapsamı",
      "Yıllık veya parti bazlı miktar, ambalaj tercihi",
      "SDS ve izlenebilirlik (parti/lot) beklentisi",
    ],
    specEn: [
      "Current product code or datasheet (TDS)",
      "Thickness, density and dimensional tolerance",
      "Fiber chemistry (ASW/RCF, AES/LBP)",
      "Door model and test / field-of-application scope",
      "Annual or batch quantity, packaging",
      "SDS and lot traceability requirements",
    ],
    categoryKeys: ["seramik-elyaf-urunleri"],
    featured: true,
  },
  {
    key: "endustriyel-firin-ureticileri",
    enSlug: "industrial-furnace-manufacturers",
    nameTr: "Endüstriyel Fırın Üreticileri",
    nameEn: "Industrial Furnace Manufacturers",
    leadTr:
      "Yeni fırın projelerinde sıcak yüzden dış gövdeye kadar her katman birlikte seçilir: elyaf modül ve battaniye, izolasyon plakaları, ankrajlar ve contalar. Tek teklif dosyasında tüm katmanları topluyoruz.",
    leadEn:
      "In new furnace projects every layer — from hot face to casing — is selected together: fiber modules and blanket, back-up boards, anchors and seals. We consolidate them in one quotation.",
    specTr: ["Kesit çizimi ve katman planı", "Çalışma ve pik sıcaklıkları, çevrim rejimi", "Atmosfer ve gaz akışı", "Montaj ve ankraj detayı", "Proje takvimi ve teslim yeri"],
    specEn: ["Lining cross-section and layer plan", "Operating and peak temperatures, cycling", "Atmosphere and gas flow", "Installation and anchoring detail", "Project schedule and delivery location"],
    categoryKeys: ["seramik-elyaf-urunleri", "yuksek-sicaklik-izolasyon-plakalari", "refrakter-ankraj-sistemleri", "teknik-izolasyon-ve-muhendislik-malzemeleri"],
    featured: true,
  },
  {
    key: "demir-celik-ve-isil-islem",
    enSlug: "steel-heat-treatment",
    nameTr: "Demir-Çelik ve Isıl İşlem",
    nameEn: "Steel & Heat Treatment",
    leadTr: "Tav ve ısıl işlem fırınlarında termal çevrim, bakım periyodu ve hızlı devreye alma önceliklidir. Refrakter ve elyaf katmanlarını bakım planınıza göre tedarik ediyoruz.",
    leadEn: "Reheating and heat-treatment furnaces are driven by thermal cycling, maintenance windows and fast restart. We supply refractory and fiber layers around your shutdown plan.",
    specTr: ["Fırın tipi ve bölge sıcaklıkları", "Duruş/bakım takvimi", "Mevcut malzeme referansları", "Mekanik ve kimyasal etkiler"],
    specEn: ["Furnace type and zone temperatures", "Shutdown / maintenance schedule", "Current material references", "Mechanical and chemical exposure"],
    categoryKeys: ["seramik-elyaf-urunleri", "refrakter-beton-ve-harclar", "refrakter-ve-izolasyon-tuglalari"],
    featured: true,
  },
  {
    key: "dokumhaneler",
    enSlug: "foundries",
    nameTr: "Dökümhaneler",
    nameEn: "Foundries",
    leadTr: "Ergitme ve bekletme fırınları, potalar ve döküm hatları için refrakter, izolasyon ve sarf malzemeleri: besleyiciler, filtreler, harçlar ve elyaf ürünleri.",
    leadEn: "Refractories, insulation and consumables for melting and holding furnaces, ladles and casting lines: feeders, filters, mortars and fiber products.",
    specTr: ["Metal türü (alüminyum, demir, çelik)", "Pota/fırın tipi ve kapasite", "Döküm sıcaklığı", "Tüketim periyodu ve stok planı"],
    specEn: ["Metal (aluminium, iron, steel)", "Ladle/furnace type and capacity", "Pouring temperature", "Consumption rate and stock plan"],
    categoryKeys: ["dokumhane-malzemeleri", "refrakter-beton-ve-harclar", "seramik-elyaf-urunleri"],
    featured: true,
  },
  {
    key: "cam-sanayi",
    enSlug: "glass-industry",
    nameTr: "Cam Sanayi",
    nameEn: "Glass Industry",
    leadTr: "Cam fırınlarında yüksek sıcaklık izolasyonu, teknik contalar ve bakım malzemeleri. Kampanya süresi ve sıcak tamir koşulları seçimi belirler.",
    leadEn: "High-temperature insulation, technical seals and maintenance materials for glass furnaces, where campaign life and hot-repair conditions drive selection.",
    specTr: ["Fırın bölgesi ve sıcaklık", "Kampanya/bakım planı", "Mevcut malzeme ve ölçüler"],
    specEn: ["Furnace zone and temperature", "Campaign / maintenance plan", "Current materials and dimensions"],
    categoryKeys: ["yuksek-sicaklik-izolasyon-plakalari", "teknik-izolasyon-ve-muhendislik-malzemeleri", "seramik-ve-cam-firin-malzemeleri"],
  },
  {
    key: "seramik-sanayi",
    enSlug: "ceramic-industry",
    nameTr: "Seramik Sanayi",
    nameEn: "Ceramic Industry",
    leadTr: "Fırın rulosu, fırın mobilyası, fırın arabası izolasyonu ve öğütme ürünleri. Ürün ölçüsü ve fırın tipi teklifin temelidir.",
    leadEn: "Kiln rollers, kiln furniture, kiln car insulation and grinding media — dimensions and kiln type are the basis of every quotation.",
    specTr: ["Fırın tipi ve pişirme sıcaklığı", "Rulo/raf ölçüleri", "Yük ve çevrim koşulları"],
    specEn: ["Kiln type and firing temperature", "Roller / shelf dimensions", "Load and cycling conditions"],
    categoryKeys: ["seramik-ve-cam-firin-malzemeleri", "refrakter-ve-izolasyon-tuglalari", "seramik-elyaf-urunleri"],
  },
  {
    key: "cimento-ve-enerji",
    enSlug: "cement-energy",
    nameTr: "Çimento ve Enerji Tesisleri",
    nameEn: "Cement & Energy Plants",
    leadTr: "Monolitik refrakter bakım planları, ankraj sistemleri ve yüksek sıcaklık sızdırmazlık ürünleri. Duruş penceresine uygun tedarik.",
    leadEn: "Monolithic refractory maintenance, anchoring systems and high-temperature sealing products, supplied to fit your outage window.",
    specTr: ["Ekipman ve bölge", "Duruş tarihi", "Metraj ve uygulama yöntemi"],
    specEn: ["Equipment and zone", "Outage date", "Quantities and installation method"],
    categoryKeys: ["refrakter-beton-ve-harclar", "refrakter-ankraj-sistemleri", "teknik-izolasyon-ve-muhendislik-malzemeleri"],
  },
  {
    key: "petrokimya",
    enSlug: "petrochemical",
    nameTr: "Petrokimya",
    nameEn: "Petrochemical",
    leadTr: "Proses ısıtıcılarında elyaf izolasyon, ankraj seçimi ve korozyon kontrolü. Proje şartnamesine ve üretici belgelerine göre tedarik.",
    leadEn: "Fiber insulation, anchor selection and corrosion control for process heaters, supplied to project specifications and manufacturer documentation.",
    specTr: ["Proje şartnamesi", "Atmosfer ve korozyon koşulları", "Ankraj alaşımı ve geometri"],
    specEn: ["Project specification", "Atmosphere and corrosion conditions", "Anchor alloy and geometry"],
    categoryKeys: ["seramik-elyaf-urunleri", "refrakter-ankraj-sistemleri"],
  },
  {
    key: "ihracat-distributor",
    enSlug: "importers-distributors",
    nameTr: "İthalatçı ve Distribütörler",
    nameEn: "Importers & Distributors",
    leadTr: "Seramik yünü ithalatçıları ve bölgesel distribütörler için ürün belgeleri, ambalaj, etiket ve sevkiyat dokümantasyonu.",
    leadEn: "Product documentation, packaging, labelling and shipping paperwork for ceramic fiber importers and regional distributors.",
    specTr: ["Hedef ülke ve mevzuat", "Ürün belgeleri (TDS/SDS)", "Konteyner/palet planı", "Teslim şekli (Incoterms)"],
    specEn: ["Destination country and regulations", "Product documents (TDS/SDS)", "Container / pallet plan", "Delivery terms (Incoterms)"],
    categoryKeys: ["seramik-elyaf-urunleri"],
  },
];
