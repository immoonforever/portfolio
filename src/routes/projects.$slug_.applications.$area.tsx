import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  getBrand,
  getNextByKind,
  getProjectBySlug,
  productProjects,
  type BrandProject,
  type EditorialProject,
  type ProductProject,
  type Project,
} from "@/lib/projects";

export const Route = createFileRoute("/projects/$slug_/applications/$area")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found - Zoya Shaikh" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} - Zoya Shaikh`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  return (
    <main className="bg-background text-foreground font-sans">
      <ProjectTopBar />
      {project.kind === "product" ? (
        <ProductTemplate project={project} />
      ) : project.kind === "brand" ? (
        <BrandTemplate project={project} />
      ) : (
        <EditorialTemplate project={project} />
      )}
    </main>
  );
}

/* ============================================================
 * Shared chrome
 * ============================================================ */

function ProjectTopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="font-display text-[22px] leading-none">
          Zoya <span className="italic text-muted-foreground">Shaikh</span>
        </Link>
        <Link to="/" className="link-underline text-[13px] text-muted-foreground">
          <span className="link-underline-inner hover:text-foreground">← Back to work</span>
        </Link>
      </div>
    </header>
  );
}

function Breadcrumb({ crumbs }: { crumbs: { label: string; to?: string }[] }) {
  return (
    <nav className="mx-auto max-w-[1440px] px-6 pt-32 text-[12px] uppercase tracking-[0.16em] text-muted-foreground md:px-10 md:pt-40">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-3">
            {c.to ? (
              <Link to={c.to} className="hover:text-foreground">{c.label}</Link>
            ) : (
              <span className="text-foreground">{c.label}</span>
            )}
            {i < crumbs.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function NextCta({ next, label }: { next: Project; label: string }) {
  return (
    <section className="border-t border-line bg-[#0d0b09] text-[#f5f0e6]">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f5f0e6]/50">
          {label} →
        </p>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="mt-8 block"
        >
          <h3 className="font-display text-[44px] leading-[1] md:text-[80px]">
            <span className="link-underline-inner">{next.title}</span>
          </h3>
          <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-[#f5f0e6]/50">
            {next.category}
          </p>
        </Link>
        <div className="mt-16 flex items-center justify-between text-[13px] text-[#f5f0e6]/60">
          <Link to="/" className="link-underline">
            <span className="link-underline-inner">← Back to portfolio</span>
          </Link>
          <span>© Zoya Shaikh</span>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * PRODUCT template - Breadcrumb, Hero, At-a-Glance, Overview, PDF, Next
 * ============================================================ */

function ProductTemplate({ project }: { project: ProductProject }) {
  const next = getNextByKind(project.slug);

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Product" },
          { label: project.title },
        ]}
      />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 md:pt-16">
          <p className="eyebrow">{project.category}</p>
          <h1 className="font-display mt-8 max-w-4xl text-[44px] leading-[1] tracking-tight sm:text-[64px] md:text-[92px]">
            {project.title}
          </h1>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
            {project.summary}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-foreground/15 px-3 py-1.5 text-[11px] tracking-wide text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto mt-16 max-w-[1440px] px-6 md:mt-24 md:px-10">
          <button
            type="button"
            onClick={() => window.open(project.hero, "_blank", "noopener")}
            className="relative aspect-[16/10] w-full overflow-hidden bg-paper-2"
          >
            <img
              src={project.hero}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-[1.01]"
            />
          </button>
        </div>
      </section>

      {/* At a Glance */}
      <section className="mt-20 border-t border-line md:mt-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-10 text-[13px] md:grid-cols-5 md:px-10">
          {[
            { label: "Role", value: project.role },
            { label: "Timeline", value: project.timeline },
            { label: "Team", value: project.team },
            { label: "Tools", value: project.tools.join(", ") },
            { label: "Deliverable", value: project.deliverable },
          ].map((c) => (
            <div key={c.label}>
              <span className="eyebrow block">{c.label}</span>
              <span className="mt-2 block text-foreground">{c.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Overview */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-4">
            <p className="eyebrow">Overview</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-[26px] leading-[1.25] md:text-[36px]">
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Embedded PDF */}
      <section className="border-t border-line bg-paper-2/40">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Case study</p>
              <h2 className="font-display mt-6 text-[32px] leading-[1.05] md:text-[44px]">
                The full deck.
              </h2>
            </div>
          </div>
          <div className="mt-10">
            <PdfViewer src={project.pdfUrl} title={`${project.title} case study`} />
          </div>
        </div>
      </section>

      <NextCta next={next} label="Next Project" />
    </>
  );
}

function PdfViewer({ src, title }: { src?: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFs(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFs = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`relative w-full overflow-hidden border border-line bg-paper ${
        isFs ? "h-screen" : "aspect-[4/3] md:aspect-[16/10]"
      }`}
    >
      {src ? (
        <iframe
          src={`${src}#toolbar=0&navpanes=0&statusbar=0&view=FitH`}
          title={title}
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full items-center justify-center px-8 text-center">
          <div className="max-w-md">
            <p className="eyebrow">PDF coming soon</p>
            <p className="font-display mt-6 text-[24px] leading-[1.2] md:text-[32px]">
              Drop the case-study PDF here to embed it.
            </p>
            <p className="mt-4 text-[13px] text-muted-foreground">
              Place a file at{" "}
              <code className="rounded bg-foreground/5 px-1.5 py-0.5 text-[12px]">
                public{src ?? "/decks/…"}
              </code>{" "}
              - the viewer picks it up automatically.
            </p>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={toggleFs}
        className="absolute right-4 top-4 rounded-full border border-foreground/25 bg-background/80 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-foreground backdrop-blur-md transition-colors hover:bg-foreground hover:text-background"
      >
        {isFs ? "Exit fullscreen" : "Fullscreen"}
      </button>
    </div>
  );
}

/* ============================================================
 * BRAND template - E-Summit landing
 * ============================================================ */

function BrandTemplate({ project }: { project: BrandProject }) {
  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Brand" },
          { label: project.title },
        ]}
      />

      {/* Hero */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 md:pt-16">
          <p className="eyebrow">{project.category}</p>
          <h1 className="font-display mt-8 max-w-4xl text-[44px] leading-[1] tracking-tight sm:text-[64px] md:text-[104px]">
            {project.title}
          </h1>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
            {project.summary}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-[1440px] px-6 md:mt-24 md:px-10">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-2">
            <img src={project.hero} alt={project.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Meta */}
      <section className="mt-20 border-t border-line md:mt-32">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-8 px-6 py-10 text-[13px] md:grid-cols-3 md:px-10">
          <div><span className="eyebrow block">Role</span><span className="mt-2 block text-foreground">{project.role}</span></div>
          <div><span className="eyebrow block">Timeline</span><span className="mt-2 block text-foreground">{project.timeline}</span></div>
          <div><span className="eyebrow block">Discipline</span><span className="mt-2 block text-foreground">{project.category}</span></div>
        </div>
      </section>

      {/* Overview */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-4">
            <p className="eyebrow">Overview</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-[26px] leading-[1.25] md:text-[36px]">
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Brand System */}
      <section className="border-t border-line bg-paper-2/40">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Brand System</p>
              <h2 className="font-display mt-6 text-[32px] leading-[1.05] md:text-[52px]">
                The parts, and how they hold together.
              </h2>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
            {project.system.map((card) => (
              <Link
                key={card.key}
                to="/projects/$slug/system/$card"
                params={{ slug: project.slug, card: card.key }}
                className="group block bg-paper transition-transform hover:-translate-y-[2px]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={card.cover}
                    alt={card.label}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6">
                  <p className="eyebrow">{card.label}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                    {card.blurb}
                  </p>
                  <span className="link-underline-inner mt-6 inline-block text-[12px] uppercase tracking-[0.16em]">
                    Open →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Applications */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow">Brand Applications</p>
              <h2 className="font-display mt-6 text-[32px] leading-[1.05] md:text-[52px]">
                Where it lives.
              </h2>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:mt-20 md:grid-cols-3 md:gap-8">
            {project.applications.map((app) => (
              <Link
                key={app.key}
                to="/projects/$slug/applications/$area"
                params={{ slug: project.slug, area: app.key }}
                className="group block bg-paper transition-transform hover:-translate-y-[2px]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={app.cover}
                    alt={app.label}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6">
                  <p className="font-display text-[24px] leading-tight md:text-[28px]">
                    {app.label}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                    {app.blurb}
                  </p>
                  <span className="link-underline-inner mt-6 inline-block text-[12px] uppercase tracking-[0.16em]">
                    Open →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reflection */}
      <section className="border-t border-line bg-paper-2/40">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-4">
            <p className="eyebrow">Reflection</p>
          </div>
          <div className="md:col-span-8 max-w-2xl">
            <p className="font-display text-[26px] leading-[1.25] md:text-[36px]">
              {project.reflection}
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-[#0d0b09] py-16 text-[#f5f0e6] md:py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Link to="/" className="link-underline text-[13px] text-[#f5f0e6]/70">
            <span className="link-underline-inner">← Back to portfolio</span>
          </Link>
        </div>
      </section>
    </>
  );
}

/* ============================================================
 * EDITORIAL template - Instagram-style single-frame carousel
 * ============================================================ */

function EditorialTemplate({ project }: { project: EditorialProject }) {
  const next = getNextByKind(project.slug);

  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Editorial" },
          { label: project.title },
        ]}
      />

      <section>
        <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 md:pt-16">
          <p className="eyebrow">{project.category}</p>
          <h1 className="font-display mt-8 max-w-4xl text-[44px] leading-[1] tracking-tight sm:text-[64px] md:text-[92px]">
            {project.title}
          </h1>
          <p className="mt-8 max-w-2xl text-[16px] leading-relaxed text-muted-foreground md:text-[18px]">
            {project.summary}
          </p>
        </div>
      </section>

      <InstaCarousel frames={project.carousel} title={project.title} />

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
          <div className="md:col-span-4">
            <p className="eyebrow">Overview</p>
          </div>
          <div className="md:col-span-8">
            <p className="font-display text-[26px] leading-[1.25] md:text-[36px]">
              {project.overview}
            </p>
          </div>
        </div>
      </section>

      <NextCta next={next} label="Next Campaign" />
    </>
  );
}

function InstaCarousel({ frames, title }: { frames: string[]; title: string }) {
  const [i, setI] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const startX = useRef<number | null>(null);
  const total = frames.length;

  const go = useCallback(
    (dir: number) => {
      setI((prev) => (prev + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX.current = null;
  };

  return (
    <section className="border-t border-line bg-paper-2/40">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex items-end justify-between gap-6">
          <p className="eyebrow">Carousel</p>
          <p className="eyebrow tabular-nums">
            {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div
            className="relative aspect-[4/5] w-full max-w-[560px] cursor-grab select-none overflow-hidden bg-paper shadow-[0_40px_80px_-40px_rgba(20,15,10,0.35)] active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onClick={() => setLightbox(true)}
          >
            {frames.map((src, idx) => (
              <img
                key={`${src}-${idx}`}
                src={src}
                alt={`${title} - slide ${idx + 1}`}
                draggable={false}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(-1)}
            className="rounded-full border border-foreground/25 px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-background"
            aria-label="Previous slide"
          >
            ← Prev
          </button>
          <div className="flex items-center gap-1.5">
            {frames.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  idx === i ? "w-6 bg-foreground" : "w-1.5 bg-foreground/25"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            className="rounded-full border border-foreground/25 px-5 py-2.5 text-[12px] uppercase tracking-[0.16em] transition-colors hover:bg-foreground hover:text-background"
            aria-label="Next slide"
          >
            Next →
          </button>
        </div>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          Swipe, arrow keys, or click a dot. Click the image for fullscreen.
        </p>
      </div>

      {lightbox && (
        <Lightbox src={frames[i]} alt={`${title} - slide ${i + 1}`} onClose={() => setLightbox(false)} />
      )}
    </section>
  );
}

export function Lightbox({
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

/* ============================================================
 * Not-found
 * ============================================================ */

function ProjectNotFound() {
  const { slug } = Route.useParams();
  return (
    <main className="bg-background text-foreground font-sans">
      <ProjectTopBar />
      <div className="mx-auto max-w-[1440px] px-6 py-40 md:px-10 md:py-56">
        <p className="eyebrow">404 - Project</p>
        <h1 className="font-display mt-6 text-[48px] leading-[1] md:text-[80px]">
          No project called <span className="italic text-muted-foreground">{slug}</span>.
        </h1>
        <Link to="/" className="link-underline mt-12 inline-flex items-center gap-2 text-[14px]">
          <span className="link-underline-inner">← Back to portfolio</span>
        </Link>
      </div>
    </main>
  );
}

// silence unused import in some builds
void productProjects;
void useNavigate;
void getBrand;
