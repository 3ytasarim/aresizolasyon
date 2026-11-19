/**
 * Global site (aresrefractory.com) catalogue copy.
 * Names come from the client's category documents. Short definitions are faithful English
 * renderings of the Turkish product definitions — no specs, stock or certification claims.
 * Full English long-form pages are written separately for English search intent (client brief §4).
 */
export const EN_CATEGORY: Record<string, { slug: string; intro: string }> = {
  "seramik-elyaf-urunleri": {
    slug: "ceramic-fiber",
    intro:
      "Blankets, boards, modules, paper, felt, bulk fiber and textiles for high-temperature insulation. Ceramic fiber covers several fiber chemistries (ASW/RCF, AES/LBP, PCW), so we match product form and chemistry to your operating conditions and specification before quoting.",
  },
  "refrakter-beton-ve-harclar": {
    slug: "refractory-castables-mortars",
    intro:
      "Castables, monolithics, repair and installation mortars for furnace, kiln and ladle linings. Selection depends on service temperature, mechanical load, chemistry and the manufacturer's installation and dry-out instructions.",
  },
  "refrakter-ve-izolasyon-tuglalari": {
    slug: "refractory-insulating-bricks",
    intro:
      "Insulating firebricks, insulation bricks, moler bricks and bricklaying mortars for hot-face and back-up linings. We source against your drawing, lining design and required documentation.",
  },
  "yuksek-sicaklik-izolasyon-plakalari": {
    slug: "high-temperature-insulation-boards",
    intro:
      "Calcium silicate, microporous, vermiculite and technical insulation boards for back-up insulation and equipment barriers, supplied in standard formats or cut to size.",
  },
  "refrakter-ankraj-sistemleri": {
    slug: "refractory-anchoring-systems",
    intro:
      "Stainless refractory anchors, brick supports, ceramic fiber fixings, pins and fasteners. Alloy, geometry and spacing are defined by the lining design and service conditions.",
  },
  "refrakter-yardimci-malzemeler": {
    slug: "refractory-auxiliary-materials",
    intro:
      "Steel fibers, polypropylene fibers, rock wool, adhesives and auxiliary products used alongside refractory and insulation systems.",
  },
  "teknik-izolasyon-ve-muhendislik-malzemeleri": {
    slug: "technical-insulation-engineered-materials",
    intro:
      "Millboard, high-temperature gaskets, engineered specialty boards and gas filters for sealing, separation and process equipment.",
  },
  "seramik-ve-cam-firin-malzemeleri": {
    slug: "ceramic-glass-kiln-materials",
    intro:
      "Kiln rollers, cordierite, mullite and silicon carbide kiln furniture and alumina grinding media for ceramic and glass production.",
  },
  "dokumhane-malzemeleri": {
    slug: "foundry-materials",
    intro: "Insulating feeders, foundry filters and mica-based products for aluminium and ferrous foundries.",
  },
};

/**
 * Short Turkish category intros for cards and category heroes. The long-form category docs all
 * open with the same template sentence, which reads as duplicated copy in a grid.
 */
export const TR_CATEGORY_INTRO: Record<string, string> = {
  "seramik-elyaf-urunleri":
    "Battaniye, plaka, modül, kağıt, keçe, dökme elyaf ve tekstil ürünleri. Elyaf kimyası (ASW/RCF, AES/LBP, PCW), ürün formu ve çalışma koşulu birlikte değerlendirilerek teklif hazırlanır.",
  "refrakter-beton-ve-harclar":
    "Dökülebilir ve monolitik refrakterler, tamir ve uygulama harçları. Seçimi servis sıcaklığı, mekanik yük, kimyasal ortam ile üreticinin uygulama ve kurutma talimatı belirler.",
  "refrakter-ve-izolasyon-tuglalari":
    "İzole ateş tuğlaları, izolasyon ve moler tuğlaları ile tuğla harçları. Sıcak yüz ve arka astar katmanları çizime ve astar tasarımına göre tedarik edilir.",
  "yuksek-sicaklik-izolasyon-plakalari":
    "Kalsiyum silikat, mikroporoz, vermikülit ve teknik izolasyon levhaları. Arka izolasyon ve ekipman bariyerleri için standart ebatta veya ölçüye kesilmiş.",
  "refrakter-ankraj-sistemleri":
    "Paslanmaz refrakter ankrajlar, tuğla tutucular, seramik elyaf tutucular, pim ve sabitleyiciler. Alaşım, geometri ve aralık astar tasarımına göre belirlenir.",
  "refrakter-yardimci-malzemeler":
    "Çelik ve polipropilen fiber, kaya yünü, yapıştırıcılar ve yardımcı ürünler — refrakter ve izolasyon sistemlerini tamamlayan malzemeler.",
  "teknik-izolasyon-ve-muhendislik-malzemeleri":
    "Millboard, yüksek sıcaklık contaları, özel mühendislik plakaları ve gaz filtreleri; sızdırmazlık, ayırma ve proses ekipmanı için.",
  "seramik-ve-cam-firin-malzemeleri":
    "Fırın ruloları, kordiyerit, müllit ve silisyum karbür fırın malzemeleri ile alümina öğütme ürünleri; seramik ve cam üretimi için.",
  "dokumhane-malzemeleri":
    "İzole besleyiciler, döküm filtreleri ve mika bazlı ürünler; alüminyum ve demir esaslı döküm hatları için.",
};

export const EN_PRODUCT: Record<string, { slug: string; definition: string; useAreas: string }> = {
  "seramik-elyaf-battaniye": { slug: "ceramic-fiber-blanket", definition: "A flexible, needled fiber insulation layer supplied in rolls.", useAreas: "Furnace doors, casing insulation and tested infill details of certain fire door designs" },
  "seramik-elyaf-plaka": { slug: "ceramic-fiber-board", definition: "A rigid, self-supporting panel made by combining fibers with a binder.", useAreas: "Equipment panels away from burners, furnace casings, insulated door parts" },
  "seramik-elyaf-modul": { slug: "ceramic-fiber-module", definition: "A modular lining element made from folded or compressed fiber blanket.", useAreas: "Walls and roofs of heat-treatment and industrial furnaces" },
  "seramik-elyaf-kagit": { slug: "ceramic-fiber-paper", definition: "A thin, cuttable sheet of fiber used as a technical interface material.", useAreas: "Heater assemblies, flange interfaces, expansion gaps" },
  "seramik-elyaf-kece": { slug: "ceramic-fiber-felt", definition: "A felt-form ceramic fiber material valued for flexibility and thickness stability.", useAreas: "Door perimeters, equipment separators and kiln sealing details" },
  "dokme-seramik-elyaf": { slug: "bulk-ceramic-fiber", definition: "Loose fiber, binder-free or processed depending on product type.", useAreas: "Manufacture of shaped insulation parts and filling hard-to-reach cavities" },
  "islak-seramik-elyaf-battaniye": { slug: "wet-ceramic-fiber-blanket", definition: "A pre-wetted or binder-treated ceramic fiber blanket that can be shaped before it sets.", useAreas: "Curved door sections and surface forming work" },
  "seramik-elyaf-tekstil-urunleri": { slug: "ceramic-fiber-textiles", definition: "Woven rope, tape and cloth for high-temperature sealing and packing.", useAreas: "Furnace doors, bellows, expansion and sealing joints" },
  "dokulebilir-refrakterler": { slug: "refractory-castables", definition: "Monolithic refractories mixed and cast or placed according to the manufacturer's instructions.", useAreas: "Furnace hearths, boilers and metallurgical equipment linings" },
  "refrakter-tamir-harclari": { slug: "refractory-repair-mortars", definition: "Mortars and repair masses selected for local repair of damaged refractory areas.", useAreas: "Local wear at furnace corners and joints" },
  "monolitik-refrakterler": { slug: "monolithic-refractories", definition: "Refractories formed in place by casting, gunning or similar methods instead of jointed brickwork.", useAreas: "Furnace roofs, ducts and high-temperature surfaces" },
  "refrakter-uygulama-harclari": { slug: "refractory-installation-mortars", definition: "System-compatible mortars for setting refractory bricks and lining pieces.", useAreas: "Brick furnace linings, chimney and service-zone joints" },
  "izole-ates-tuglalari": { slug: "insulating-firebricks", definition: "Lightweight refractory bricks focused on reducing heat loss.", useAreas: "Ceramic kilns and intermediate lining layers" },
  "izolasyon-tuglalari": { slug: "insulation-bricks", definition: "A family of insulation bricks of different compositions designed for low heat transfer.", useAreas: "Secondary furnace linings, boiler casings and chimneys" },
  "moler-tuglalar": { slug: "moler-insulation-bricks", definition: "Lightweight moler-based insulation bricks.", useAreas: "Outer furnace layers, dryers and thermal insulation details" },
  "tugla-uygulama-harclari": { slug: "bricklaying-refractory-mortars", definition: "Heat-resistant mortars for laying refractory bricks and filling joints.", useAreas: "Firebrick laying, repair and new furnace linings" },
  "kalsiyum-silikat-plakalar": { slug: "calcium-silicate-boards", definition: "Rigid calcium silicate insulation boards for industrial high-temperature use.", useAreas: "Furnace back-up insulation, equipment barriers and casing panels" },
  "mikroporoz-izolasyon-plakalari": { slug: "microporous-insulation-boards", definition: "Specialised microporous insulation in board or panel form, targeting very low heat transfer.", useAreas: "Furnace shells, process equipment and compact hot-spot management" },
  "vermikulit-plakalar": { slug: "vermiculite-boards", definition: "Exfoliated vermiculite boards combining temperature resistance and rigidity.", useAreas: "Heating appliance bodies, fireplaces and process furnace partitions" },
  "teknik-izolasyon-levhalari": { slug: "technical-insulation-boards", definition: "A family of industrial insulation boards with different chemical and mechanical properties.", useAreas: "Furnace casings, equipment separators and mounting panels" },
  "paslanmaz-refrakter-ankrajlar": { slug: "stainless-steel-refractory-anchors", definition: "Alloy anchors that carry refractory linings under high-temperature conditions.", useAreas: "Castable-lined boiler and furnace panels" },
  "tugla-tutucular": { slug: "brick-anchors-supports", definition: "Metal supports designed to hold brick or block linings to the furnace shell.", useAreas: "Suspended brick systems and furnace roof connections" },
  "seramik-elyaf-tutucular": { slug: "ceramic-fiber-fixings", definition: "Holder and fixing sets that attach fiber modules and linings to the shell.", useAreas: "Folded ceramic fiber modules and wall/roof systems" },
  "pim-ve-sabitleyiciler": { slug: "pins-fasteners", definition: "Pins and fasteners that secure insulation layers and metal parts in high-temperature linings.", useAreas: "Casing insulation, door insulation and protective sheet fixings" },
  "celik-fiber": { slug: "steel-fibers", definition: "Metal fibers used as reinforcement in selected monolithic refractory mixes.", useAreas: "Castable masses and mechanically loaded applications" },
  "polipropilen-fiber": { slug: "polypropylene-fibers", definition: "Organic fibers that ease drying and steam release in some refractory castables.", useAreas: "Manufacturer-approved castable additive recipes" },
  "kaya-yunu": { slug: "rock-wool", definition: "Basalt/stone-based mineral fiber for thermal and acoustic insulation.", useAreas: "Industrial casings, acoustic panels and protective layers" },
  "yapistiricilar-ve-yardimci-urunler": { slug: "adhesives-auxiliary-products", definition: "Auxiliary chemicals for bonding or protecting surfaces in high-temperature insulation work.", useAreas: "Fixing ceramic fiber surfaces and board connections" },
  "millboard": { slug: "millboard", definition: "Dense technical board used as a high-temperature interlayer, gasket or protective sheet.", useAreas: "Industrial gaskets, furnace interfaces and equipment separators" },
  "yuksek-sicaklik-contalari": { slug: "high-temperature-gaskets", definition: "Gaskets that control joint gaps in high-temperature equipment.", useAreas: "Furnace doors, burner flanges and service hatches" },
  "ozel-muhendislik-plakalari": { slug: "engineered-specialty-boards", definition: "Technical boards formulated for specific mechanical, thermal or electrical duties.", useAreas: "Hot support elements of process machinery and special equipment insulation" },
  "gaz-filtreleri": { slug: "gas-filters", definition: "Filter elements selected for particle separation in high-temperature gas lines.", useAreas: "Industrial process filtration and hot gas cleaning lines" },
  "firin-rulolari": { slug: "kiln-rollers", definition: "Rotating cylindrical technical ceramic or alloy elements that convey ware through the kiln.", useAreas: "Roller kilns for ceramic tiles and some heat-treatment furnaces" },
  "kordiyerit-urunler": { slug: "cordierite-products", definition: "Cordierite technical ceramics chosen for low thermal expansion in kiln furniture.", useAreas: "Kiln shelves, setters and firing supports" },
  "mullit-urunler": { slug: "mullite-products", definition: "High-temperature technical ceramic components based on the mullite phase.", useAreas: "Supports and lining components in ceramic and glass kilns" },
  "silisyum-karbur-sic-firin-malzemeleri": { slug: "silicon-carbide-kiln-components", definition: "Silicon carbide technical ceramic kiln components for high temperatures.", useAreas: "Kiln shelves, beams and heat-exposed supports" },
  "alumina-ogutme-urunleri": { slug: "alumina-grinding-media", definition: "Wear-resistant alumina grinding balls and grinding media.", useAreas: "Ceramic raw material preparation and mills" },
  "izole-besleyiciler": { slug: "insulating-feeders", definition: "Insulating feeder components that feed a casting during solidification.", useAreas: "Feeder heads and hot spots in casting moulds" },
  "dokum-filtreleri": { slug: "foundry-filters", definition: "Filter elements placed in the metal flow to retain specific inclusions.", useAreas: "Aluminium and iron casting lines" },
  "mika-bazli-urunler": { slug: "mica-based-products", definition: "Sheets and shaped parts that use the thermal and electrical properties of mica.", useAreas: "Industrial electric heaters, furnaces and technical insulation details" },
};
