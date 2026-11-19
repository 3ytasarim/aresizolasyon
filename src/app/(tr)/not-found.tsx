import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="paper">
      <div className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-h1 font-semibold text-ink">Sayfa bulunamadı</h1>
        <p className="mt-4 max-w-xl text-lg text-ink-2">Aradığınız sayfa taşınmış veya henüz yayına alınmamış olabilir.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/urunler/">Ürün kataloğu</ButtonLink>
          <ButtonLink href="/teknik-rehber/" variant="ghost">Teknik rehber</ButtonLink>
        </div>
      </div>
    </section>
  );
}
