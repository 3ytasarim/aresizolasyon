import { ButtonLink } from "@/components/ui/button";
import { href } from "@/lib/i18n";

export default function NotFound() {
  return (
    <section className="paper">
      <div className="container-x flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-h1 font-semibold text-ink">Page not found</h1>
        <p className="mt-4 max-w-xl text-lg text-ink-2">The page may have moved or is not published yet.</p>
        <div className="mt-8"><ButtonLink href={href("en", "/products/")}>Product catalogue</ButtonLink></div>
      </div>
    </section>
  );
}
