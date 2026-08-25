import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getBrand } from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug_/system/$card")({
  loader: ({ params }) => {
    const brand = getBrand(params.slug);
    if (!brand) throw notFound();
    const card = brand.system.find((c) => c.key === params.card);
    if (!card) throw notFound();
    return { brand, card };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found - Zoya Shaikh" }] };
    const title = `${loaderData.card.label} - ${loaderData.brand.title}`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.card.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.card.blurb },
      ],
    };
  },
  component: ApplicationPage,
});

function ApplicationPage() {
  const { brand, card } = Route.useLoaderData();
  const [lb, setLb] = useState<string | null>(null);

  return (
    <main className="bg-background text-foreground font-sans">
      <header className="fixed inset-x-0 top-0 z-50 bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
          <Link to="/" className="font-display text-[22px] leading-none">
            Zoya <span className="italic text-muted-foreground">Shaikh</span>
          </Link>
          <Link
            to="/projects/$slug"
            params={{ slug: brand.slug }}
            className="link-underline text-[13px] text-muted-foreground"
          >
            <span className="link-underline-inner hover:text-foreground">
              ← Back to {brand.title}
            </span>
          </Link>
        </div>
      </header>

      <nav className="mx-auto max-w-[1440px] px-6 pt-32 text-[12px] uppercase tracking-[0.16em] text-muted-foreground md:px-10 md:pt-40">
        <ol className="flex flex-wrap gap-3">
          <li><Link to="/" className="hover:text-foreground">Home</Link></li>
          <li aria-hidden>/</li>
          <li>
            <Link to="/projects/$slug" params={{ slug: brand.slug }} className="hover:text-foreground">
              {brand.title}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-foreground">{card.label}</li>
        </ol>
      </nav>

      <section>
        <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 md:pt-16">
          <p className="eyebrow">Brand Applications</p>
          <h1 className="font-display mt-8 max-w-4xl text-[44px] leading-[1] tracking-tight sm:text-[64px] md:text-[92px]">
            {card.label}
          </h1>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
            {card.blurb}
          </p>
        </div>
      </section>

      <section className="mt-20 border-t border-line md:mt-28">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
            {brand.systemDetail.logo.map((src: string, i: number) => (
              <button
                key={`${src}-${i}`}
                onClick={() => setLb(src)}
                className={`group overflow-hidden bg-paper-2 ${
                  i % 5 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                }`}
              >
                <img
                  src={src}
                  alt={`${card.label} - ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>
          <p className="mt-10 text-[13px] text-muted-foreground">
            Restore the original E-Summit image sets from the compiled build output rather than inventing new ones.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-[#0d0b09] py-16 text-[#f5f0e6] md:py-20">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 md:px-10">
          <Link
            to="/projects/$slug"
            params={{ slug: brand.slug }}
            className="link-underline text-[13px] text-[#f5f0e6]/70"
          >
            <span className="link-underline-inner">← Back to {brand.title}</span>
          </Link>
          <span className="text-[13px] text-[#f5f0e6]/60">© Zoya Shaikh</span>
        </div>
      </section>

      {lb && <Lightbox src={lb} alt={card.label} onClose={() => setLb(null)} />}
    </main>
  );
}

function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 md:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full border border-white/40 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
      >
        Close ×
      </button>
    </div>
  );
}
