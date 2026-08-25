import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  getNextByKind,
  getProjectBySlug,
  type BrandProject,
  type EditorialProject,
  type ProductProject,
  type Project,
} from "@/lib/projects";
import extendedLogo from "@/assets/logo.png";
import heroSliderImg from "@/assets/3sliderpost.jpg";
import z1 from "@/assets/z1.png";
import z2 from "@/assets/z2.png";
import z3 from "@/assets/z3.png";
import ev1 from "@/assets/ev1.png";
import ev3 from "@/assets/ev3.png";
import ev4 from "@/assets/ev4.png";
import ev5 from "@/assets/ev5.png";
import ev6 from "@/assets/ev6.png";
import ev7 from "@/assets/ev7.png";
import ev8 from "@/assets/ev8.png";
import ev9 from "@/assets/ev9.png";
import ev10 from "@/assets/ev10.png";
import capostImg from "@/assets/capost.png";
import countdown100 from "@/assets/100dayss.png";
import countdown50 from "@/assets/50days.png";
import countdown1 from "@/assets/1day.png";
import diwaliGalleryImg from "@/assets/diwali.png";
import echoesImg from "@/assets/echoes.png";
import d11Img from "@/assets/d11.png";
import d12Img from "@/assets/d12.png";
import d13Img from "@/assets/d13.png";
import hnyImg from "@/assets/hny.png";
import d1Img from "@/assets/d1.png";
import d2Img from "@/assets/d2.png";
import d3Img from "@/assets/d3.png";
import iiImg from "@/assets/ii.png";
import idCard1Img from "@/assets/idcard1.png";
import idCard2Img from "@/assets/IDCARD2.png";
import participantId1Img from "@/assets/id1.png";
import participantId2Img from "@/assets/id2.png";
import participantId3Img from "@/assets/id3.png";
import participantId4Img from "@/assets/id4.png";
import mj5Img from "@/assets/mj5.png";
import abnImg from "@/assets/abn.png";
import tisImg from "@/assets/tis.png";
import soldOutImg from "@/assets/soldout.png";
import ticketsImg from "@/assets/tickets.png";
import stpImg from "@/assets/stp.png";
import bftImg from "@/assets/bft.png";
import wwbImg from "@/assets/wwb.png";
import ceeImg from "@/assets/cee.png";
import exImg from "@/assets/ex.png";
import ifImg from "@/assets/if.png";
import wImg from "@/assets/w.png";
import iImg from "@/assets/i.png";
import sp1 from "@/assets/sp1.png";
import sp2 from "@/assets/sp2.png";
import sp3 from "@/assets/sp3.png";
import shubhanshu from "@/assets/Shubhanshu Shukla.png";
import speakerTemplateImg from "@/assets/speakertemplate.png";
import amImg from "@/assets/am.png";
import rsImg from "@/assets/rs.png";
import arImg from "@/assets/ar.png";
import anupamImg from "@/assets/anupam.png";
import recruitmentTalk from "@/assets/recuritment talk.png";
import w1Img from "@/assets/w1.png";
import wc1Img from "@/assets/wc1.png";
import gImg from "@/assets/g.png";
import eovImg from "@/assets/eov.png";
import f1Img from "@/assets/f1.png";
import f2Img from "@/assets/f2.png";
import f3Img from "@/assets/f3.png";
import f4Img from "@/assets/f4.png";
import f5Img from "@/assets/f5.png";
import bImg from "@/assets/b.png";
import b1Img from "@/assets/b1.png";
import b2Img from "@/assets/b2.png";
import b3Img from "@/assets/b3.png";
import b4Img from "@/assets/b4.png";
import b5Img from "@/assets/b5.png";
import brochureImg from "@/assets/Brochure'26.png";
import standeeImg from "@/assets/Main.png";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project not found \u2014 Zoya Shaikh" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const { project } = loaderData;
    const title = `${project.title} \u2014 Zoya Shaikh`;
    const description = getProjectDescription(project);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});

function getProjectDescription(project: Project) {
  return normalizeLegacyText(project.kind === "editorial" ? project.description : project.summary);
}

function getProjectSubtitle(project: Project) {
  return normalizeLegacyText(project.kind === "editorial" ? project.subtitle : project.category);
}

function normalizeLegacyText(value: string) {
  return value
    .replace(/Ã‚Â·/g, "Â·")
    .replace(/Ã¢â€ â€™/g, "â†’")
    .replace(/Ã¢â‚¬â€œ/g, "â€“")
    .replace(/Ã¢â‚¬â€/g, "â€”")
    .replace(/Ã¢â‚¬â„¢/g, "â€™")
    .replace(/Ã¢â‚¬Å“/g, "â€œ")
    .replace(/Ã¢â‚¬/g, "â€");
}

function useReveal<T extends HTMLElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, shown };
}

function Reveal({
  children,
  delay = 0,
  as: As = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "span" | "p" | "h1" | "h2" | "h3";
  className?: string;
}) {
  const { ref } = useReveal<HTMLDivElement>();
  const Cmp = As as any;
  // Always apply revealed class to ensure all content, including images, is visible
  return (
    <Cmp
      ref={ref}
      className={`reveal revealed ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Cmp>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const [lb, setLb] = useState<string | null>(null);

  return (
    <>
      <main className="bg-background font-sans text-foreground">
        {project.kind === "product" ? (
          <ProductTemplate project={project} />
        ) : project.kind === "brand" ? (
          <BrandTemplate project={project} openLightbox={setLb} />
        ) : (
          <EditorialTemplate project={project} />
        )}
      </main>
      {lb && <Lightbox src={lb} alt="Content campaign image" onClose={() => setLb(null)} />}
    </>
  );
}

function ComingSoonCaseStudy({ title }: { title: string }) {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-[1120px] items-center justify-center rounded-[8px] bg-paper py-20 md:mt-10 md:py-28">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative flex h-[168px] w-[168px] items-center justify-center rounded-full border border-[#1d5fbf]/18 transition-all duration-500 ease-out hover:border-[#1d5fbf]/30">
          <svg
            viewBox="0 0 168 168"
            className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] transition-[animation-duration,opacity] duration-500 ease-out hover:opacity-100 hover:[animation-duration:12s]"
            aria-hidden="true"
          >
            <circle cx="84" cy="84" r="73.5" fill="none" stroke="rgba(29,95,191,0.14)" strokeWidth="1" />
            <circle cx="84" cy="10.5" r="3" fill="#1d5fbf" />
          </svg>
          <div className="px-6">
            <p
              className="text-[12px] uppercase leading-[1.35] tracking-[0.18em] text-[#1d5fbf]"
              style={{ fontFamily: '"Inter Tight", "Inter", sans-serif', fontWeight: 500 }}
            >
              Coming
              <br />
              Soon
            </p>
            <p
              className="mt-3 text-[9px] uppercase tracking-[0.16em] text-muted-foreground"
              style={{ fontFamily: '"Inter Tight", "Inter", sans-serif', fontWeight: 400 }}
            >
              {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({ crumbs }: { crumbs: { label: string; to?: "/" }[] }) {
  return (
    <nav className="mx-auto max-w-[1440px] px-6 pt-32 text-[12px] uppercase tracking-[0.16em] text-muted-foreground md:px-10 md:pt-40">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {crumbs.map((crumb, index) => (
          <li key={`${crumb.label}-${index}`} className="flex items-center gap-3">
            {crumb.to ? (
              <Link to={crumb.to} className="hover:text-foreground">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground">{crumb.label}</span>
            )}
            {index < crumbs.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function NextCta({ next, label }: { next: Project; label: string }) {
  return (
    <section className="border-t border-line bg-[#0d0b09] text-[#f5f0e6]">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-18">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f5f0e6]/50">
          {label} {"\u2192"}
        </p>
        <Link
          to="/projects/$slug"
          params={{ slug: next.slug }}
          className="mt-6 block rounded-[10px] transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#f5f0e6]/45"
        >
          <h3 className="font-display text-[42px] leading-[0.98] md:text-[72px]">
            <span className="link-underline-inner">{next.title}</span>
          </h3>
          <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-[#f5f0e6]/58">
            {getProjectSubtitle(next)}
          </p>
        </Link>
        <div className="mt-8 flex items-center justify-between text-[13px] text-[#f5f0e6]/60 md:mt-10">
          <Link to="/" className="link-underline">
            <span className="link-underline-inner">{"\u2190"} Back to portfolio</span>
          </Link>
          <span>{"\u00A9"} Zoya Shaikh</span>
        </div>
      </div>
    </section>
  );
}

function ProductTemplate({ project }: { project: ProductProject }) {
  const next = getNextByKind(project.slug);
  const skills = (project.skills ?? project.tags).map(normalizeLegacyText);
const hasCaseStudy = Boolean(project.caseStudyImage) || Boolean(project.caseStudyPlaceholder);
  const overview = hasCaseStudy ? normalizeLegacyText(project.overview) : "Overview coming soon.";
  const factItems = [
    { label: "Role", value: normalizeLegacyText(project.role).replace(/,\s*/g, " · ") },
    { label: "Timeline", value: normalizeLegacyText(project.timeline).replace(/Â·/g, "·").replace(/\s*·\s*/g, " · ") },
    { label: "Team", value: normalizeLegacyText(project.team) },
    { label: "Tools", value: project.tools.map(normalizeLegacyText).join(" · ") },
    { label: "Deliverables", value: normalizeLegacyText(project.deliverable).replace(/,\s*/g, " · ") },
  ];

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1500px] px-6 pb-8 pt-20 md:px-[76px] md:pb-10 md:pt-24">
          <Link
            to="/"
            className="link-underline inline-flex items-center gap-2 text-[14px] text-muted-foreground"
            style={{ fontFamily: '"DM Sans", "Inter Tight", sans-serif', fontWeight: 400 }}
          >
            <span className="link-underline-inner">{"\u2190"} Back to work</span>
          </Link>
          <p
            className="mt-5 text-[12px] uppercase tracking-[0.16em] text-muted-foreground"
            style={{ fontFamily: '"DM Sans", "Inter Tight", sans-serif', fontWeight: 400 }}
          >
            {normalizeLegacyText(project.category)}
          </p>
          <h1 className="font-display mt-3 max-w-[11ch] text-[38px] leading-[1.02] tracking-tight sm:text-[44px] md:text-[52px]">
            {project.title}
          </h1>
          <p
            className="mt-3 max-w-[640px] text-[15px] leading-[1.55] text-muted-foreground md:text-[16px]"
            style={{ fontFamily: '"DM Sans", "Inter Tight", sans-serif', fontWeight: 400 }}
          >
            {normalizeLegacyText(project.summary)}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {skills.map((tag) => (
              <li
                key={tag}
                className="rounded-[999px] border border-foreground/12 px-[14px] py-[7px] text-[10.5px] text-muted-foreground"
                style={{ fontFamily: '"DM Sans", "Inter Tight", sans-serif', fontWeight: 400 }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-6 px-6 py-10 md:grid-cols-12 md:px-[76px] md:py-12">
          <div className="md:col-span-3">
            <p
              className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground"
              style={{ fontFamily: '"DM Sans", "Inter Tight", sans-serif', fontWeight: 500 }}
            >
              Overview
            </p>
          </div>
          <div className="md:col-span-8 md:col-start-4">
            <p
              className="max-w-[760px] text-[15px] leading-[1.72] text-muted-foreground md:text-[16px]"
              style={{ fontFamily: '"DM Sans", "Inter Tight", sans-serif', fontWeight: 400 }}
            >
              {overview}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="mx-auto w-full max-w-[1180px] px-6 py-6 md:px-8 md:py-7">
          <p
            className="mb-4 text-[10px] uppercase text-[#77736F]"
            style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, letterSpacing: "0.14em" }}
          >
            Project Details
          </p>

          <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {factItems.slice(0, 4).map((cell) => (
              <div key={cell.label} className="min-w-0">
                <p
                  className="text-[10px] uppercase text-[#77736F]"
                  style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, letterSpacing: "0.14em" }}
                >
                  {cell.label}
                </p>
                <p
                  className={`mt-2 text-[13px] leading-[1.5] text-[#171717] ${
                    cell.label === "Timeline" ? "whitespace-pre-line" : ""
                  }`}
                  style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 400, letterSpacing: "-0.01em" }}
                >
                  {cell.label === "Team"
                    ? cell.value.replace("Team of 4", "4")
                    : cell.label === "Timeline"
                      ? cell.value.replace(/\s*·\s*/g, " · ")
                      : cell.value.replace(/\n/g, ", ").replace(/\s*·\s*/g, " · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

<section>
        <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-10 md:py-12">
          {project.caseStudyPlaceholder ? (
            <CaseStudyPlaceholder title={project.title} />
          ) : (
            <>
              <div className="mx-auto max-w-[1120px]">
                <p className="eyebrow">Case Study</p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  Scroll to explore {"\u2193"}
                </p>
              </div>

              {project.caseStudyImage ? (
                project.slug === "irctc-ai-copilot" ? (
                  <ComingSoonCaseStudy title="IRCTC AI COPILOT" />
                ) : (
                  <img
                    src={project.caseStudyImage}
                    alt={`${project.title} case study`}
                    loading="eager"
                    decoding="async"
                    className="mx-auto mt-8 block h-auto w-full max-w-[1120px] rounded-[8px] md:mt-9"
                  />
                )
              ) : (
                <div className="mx-auto mt-8 max-w-[1120px] border-y border-line py-12 md:mt-9 md:py-14">
                  <h2 className="font-display text-[32px] leading-[1.04] md:text-[44px]">
                    Case Study Coming Soon
                  </h2>
                  <p className="mt-5 max-w-[34rem] text-[16px] leading-[1.9] text-muted-foreground md:text-[18px]">
                    This project is currently being documented. A detailed case study will be
                    published soon.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <NextCta next={next} label="Next Project" />
    </>
  );
}

type SocialMediaGroup = {
  heading: string;
  description: string;
  posts: { src: string; alt: string }[];
  intro?: ReactNode;
  stages?: { number: string; title: string; subtitle?: string; description: string }[];
};

function SocialMediaGrid({
  heading,
  description,
  posts,
  intro,
  stages,
  delay = 0,
  openLightbox,
}: SocialMediaGroup & {
  delay?: number;
  openLightbox: (src: string) => void;
}) {
  return (
    <Reveal delay={delay}>
      <section>
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{heading}</p>
            <p className="mt-3 text-[15px] leading-[1.8] text-muted-foreground md:text-[16px]">
              {description}
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {posts.length} posts
          </p>
        </div>

        {intro ? <div className="mt-8 max-w-3xl">{intro}</div> : null}

        {stages ? (
          <div className="mt-10 grid gap-8">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Feather</span>
              <span aria-hidden>→</span>
              <span>Wings</span>
              <span aria-hidden>→</span>
              <span>Phoenix</span>
            </div>
            <div className="grid items-end gap-5 md:grid-cols-3">
              {stages.map((stage, index) => (
                <div key={stage.number} className="space-y-2">
                  <p className="eyebrow">{stage.number}</p>
                  <p className="font-display text-[22px] leading-[1] tracking-tight md:text-[28px]">
                    {stage.title}
                  </p>
                  {stage.subtitle ? (
                    <p className="text-[13px] uppercase tracking-[0.14em] text-foreground/80">
                      {stage.subtitle}
                    </p>
                  ) : null}
                  <p className="max-w-sm text-[14px] leading-[1.7] text-muted-foreground">
                    {stage.description}
                  </p>
                  {index < stages.length - 1 && (
                    <p className="pt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {"\u2192"}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
              {posts.map((post, index) => (
                <button
                  key={`${heading}-${post.alt}-${index}`}
                  type="button"
                  onClick={() => openLightbox(post.src)}
                  className={`group overflow-hidden rounded-[20px] bg-white text-left ring-1 ring-black/6 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30 ${
                    index === posts.length - 1 ? "shadow-md" : "shadow-sm"
                  }`}
                >
                  <img
                    src={post.src}
                    alt={post.alt}
                    loading="lazy"
                    className="block h-auto w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post, index) => (
              <button
                key={`${heading}-${post.alt}-${index}`}
                type="button"
                onClick={() => openLightbox(post.src)}
                className="group overflow-hidden rounded-[20px] bg-white text-left shadow-sm ring-1 ring-black/6 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30"
              >
                <img
                  src={post.src}
                  alt={post.alt}
                  loading="lazy"
                  className="block h-auto w-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </section>
    </Reveal>
  );
}

type GalleryImage = {
  src: string;
  alt: string;
  className?: string;
};

function MediaGridSection({
  title,
  subtitle,
  images,
  openLightbox,
}: {
  title: string;
  subtitle: string;
  images: GalleryImage[];
  openLightbox: (src: string) => void;
}) {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="grid items-start gap-4">
            <p className="eyebrow">{title}</p>
            <h2 className="font-display text-[36px] leading-[1] md:text-[48px]">{title}</h2>
            <p className="max-w-2xl text-muted-foreground">{subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {images.map((image, index) => (
              <button
                key={`${title}-${image.alt}-${index}`}
                type="button"
                onClick={() => openLightbox(image.src)}
                className={`group block w-full overflow-hidden rounded-[20px] bg-white text-left shadow-sm ring-1 ring-black/6 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30 ${image.className ?? ""}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" className="block h-auto w-full object-contain" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GallerySection({ openLightbox }: { openLightbox: (src: string) => void }) {
  const galleryImages: GalleryImage[] = [
    { src: soldOutImg, alt: "Sold out creative" },
    { src: ticketsImg, alt: "Tickets creative" },
    { src: capostImg, alt: "Campus ambassador creative" },
    { src: exImg, alt: "Event creative" },
    { src: ifImg, alt: "Festival creative" },
    { src: wImg, alt: "Workshop creative" },
    { src: iImg, alt: "Gallery creative" },
    { src: diwaliGalleryImg, alt: "Diwali creative" },
    { src: echoesImg, alt: "Echoes creative" },
    { src: recruitmentTalk, alt: "Workshop promotion post" },
    { src: hnyImg, alt: "Happy New Year creative" },
  ];

  return (
    <MediaGridSection
      title="GALLERY"
      subtitle="Selected campaign and event creatives from E-Summit 2026."
      images={galleryImages}
      openLightbox={openLightbox}
    />
  );
}

function BeyondTheGridSection({ openLightbox }: { openLightbox: (src: string) => void }) {
  const images: GalleryImage[] = [
    { src: f1Img, alt: "If Startups Were F1 Teams" },
    { src: f2Img, alt: "McLaren - Reinvention" },
    { src: f3Img, alt: "Ferrari - Legacy" },
    { src: f4Img, alt: "Mercedes-AMG Petronas - Efficiency" },
    { src: f5Img, alt: "Red Bull Racing - Hyper-Growth" },
  ];

  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="grid items-start gap-4">
            <p className="eyebrow">BEYOND THE GRID</p>
            <h2 className="font-display text-[36px] leading-[1] md:text-[48px]">
              When Startups Think Like F1 Teams
            </h2>
            <p className="max-w-3xl text-muted-foreground">
              Extending E-Summit &apos;26&apos;s “Transcending the Paradigm” narrative beyond
              conventional startup stories - this editorial series draws parallels between iconic
              F1 teams and the mindsets that drive ambitious startups: reinvention, legacy,
              precision, and relentless growth.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div
            className="mt-10 flex gap-5 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            style={{
              touchAction: "pan-y",
              scrollSnapType: "x proximity",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {images.map((image, index) => (
              <button
                key={`beyond-the-grid-${image.alt}-${index}`}
                type="button"
                onClick={() => openLightbox(image.src)}
                className="group block w-[min(88vw,26rem)] shrink-0 snap-start overflow-hidden rounded-[20px] bg-white text-left shadow-sm ring-1 ring-black/6 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30 md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="block h-auto w-full object-contain"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SocialMediaSection({ openLightbox }: { openLightbox: (src: string) => void }) {
  const eventPromotionPosts: GalleryImage[] = [
    { src: d11Img, alt: "E-Summit 2026 event promotion post 1" },
    { src: d12Img, alt: "E-Summit 2026 event promotion post 2" },
    { src: d13Img, alt: "E-Summit 2026 event promotion post 3" },
  ];
  const [activeEventPromotionIndex, setActiveEventPromotionIndex] = useState(0);
  const eventPromotionCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollToEventPromotionIndex = (index: number) => {
    const el = eventPromotionCarouselRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(eventPromotionPosts.length - 1, index));
    const item = el.children[clamped] as HTMLElement | undefined;
    item?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActiveEventPromotionIndex(clamped);
  };

  useEffect(() => {
    const el = eventPromotionCarouselRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let minDistance = Number.POSITIVE_INFINITY;
      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const distance = Math.abs(childCenter - center);
        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });
      setActiveEventPromotionIndex(closest);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="grid items-start gap-4">
            <p className="eyebrow">SOCIAL MEDIA</p>
            <h2 className="font-display text-[36px] leading-[1] md:text-[48px]">Event Promotion</h2>
            <p className="max-w-2xl text-muted-foreground">
              Extending the E-Summit 2026 identity into a campaign that reveals the story of the Phoenix - one stage at a time.
            </p>
          </div>
        </Reveal>

        <div className="mt-10">
          <SocialMediaGrid
            heading="01 - COUNTDOWN CAMPAIGN"
            description="A Phoenix, revealed in stages."
            intro={
              <div className="max-w-[40rem] space-y-4">
                <p className="text-[15px] leading-[1.8] text-muted-foreground md:text-[16px]">
                  For the countdown to E-Summit 2026, we wanted the central visual to feel like something was emerging rather than simply being revealed.
                </p>
                <p className="text-[15px] leading-[1.8] text-muted-foreground md:text-[16px]">
                  The previous edition, &ldquo;Synergy of Genesis&rdquo;, explored the idea of creation and convergence through the Tesseract. &ldquo;Transcending the Paradigm&rdquo; takes that story forward - asking what can emerge when we move beyond what has already been created.
                </p>
                <p className="text-[15px] leading-[1.8] text-muted-foreground md:text-[16px]">
                  The Phoenix became the answer: unexpected, powerful and majestic, rising from the visual world established before it. Its symbolism also naturally resonated with entrepreneurship - the courage to reinvent, rise from setbacks and create something new.
                </p>
                <p className="text-[15px] leading-[1.8] text-muted-foreground md:text-[16px]">
                  Rather than revealing the Phoenix all at once, the countdown was designed as a gradual emergence: feather → wings → Phoenix. Each post revealed another part of the form, building anticipation until the complete Phoenix appeared.
                </p>
              </div>
            }
            stages={[
              {
                number: "01",
                title: "THE FEATHER",
                subtitle: "The first sign of something emerging.",
                description:
                  "The countdown begins with a single feather - a subtle first glimpse of the Phoenix without revealing what is coming.",
              },
              {
                number: "02",
                title: "THE WINGS",
                subtitle: "The idea begins to take shape.",
                description:
                  "The second reveal expands the visual language, introducing the wings and creating a stronger sense of scale, movement and anticipation.",
              },
              {
                number: "03",
                title: "THE PHOENIX",
                subtitle: "What was emerging finally reveals itself.",
                description:
                  "The final reveal brings the Phoenix together in its complete form, transforming the countdown into the visual expression of &ldquo;Transcending the Paradigm&rdquo; - something unexpected and majestic emerging beyond the world that came before it.",
              },
            ]}
            posts={[
              { src: countdown100, alt: "Countdown Campaign - The Feather" },
              { src: countdown50, alt: "Countdown Campaign - The Wings" },
              { src: countdown1, alt: "Countdown Campaign - The Phoenix" },
            ]}
            delay={120}
            openLightbox={openLightbox}
          />
          <div className="mt-16">
            <div className="space-y-16">
              <SocialMediaGrid
                heading="SPECIAL EVENTS"
                description="Beyond the core competitions - a lineup of on-ground experiences, live music, comedy, cultural showcases, and immersive events designed to bring the E-Summit experience to life."
                posts={[
                  { src: abnImg, alt: "Special event post 1" },
                  { src: tisImg, alt: "Special event post 2" },
                  { src: sp1, alt: "Special event post 3" },
                  { src: sp2, alt: "Special event post 4" },
                  { src: sp3, alt: "Special event post 5" },
                ]}
                delay={300}
                openLightbox={openLightbox}
              />

              <SocialMediaGrid
                heading="SPEAKER SESSIONS"
                description="Voices shaping ideas, industries, and the future - from entrepreneurs and industry leaders to zonal speakers bringing perspectives from across the country."
                posts={[
                  { src: shubhanshu, alt: "Speaker post 1" },
                  { src: speakerTemplateImg, alt: "Speaker template" },
                  { src: amImg, alt: "Speaker post 3" },
                  { src: rsImg, alt: "Speaker post 4" },
                  { src: arImg, alt: "Speaker post 5" },
                  { src: anupamImg, alt: "Speaker post 6" },
                ]}
                delay={360}
                openLightbox={openLightbox}
              />

              <SocialMediaGrid
                heading="PANEL DISCUSSIONS"
                description="Perspectives that spark dialogue - from women in entrepreneurship and young founders shaping tomorrow to industry leaders building the cities and businesses of the future."
                posts={[
                  { src: stpImg, alt: "Panel discussion post 1" },
                  { src: bftImg, alt: "Panel discussion post 2" },
                  { src: wwbImg, alt: "Panel discussion post 3" },
                  { src: ceeImg, alt: "Panel discussion post 4" },
                  { src: eovImg, alt: "Panel discussion post 5" },
                ]}
                delay={420}
                openLightbox={openLightbox}
              />

              <SocialMediaGrid
                heading="ZONALS"
                description="Bringing E-Summit to cities across the country, with each zonal campaign crafted exclusively around the character, culture, and visual identity of its region."
                posts={[
                  { src: z1, alt: "Zonal campaign post 1" },
                  { src: z2, alt: "Zonal campaign post 2" },
                  { src: z3, alt: "Zonal campaign post 3" },
                ]}
                delay={480}
                openLightbox={openLightbox}
              />

              <Reveal delay={600}>
                <section>
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                      <p className="eyebrow">EVENT CREATIVES</p>
                      <p className="mt-3 text-[15px] leading-[1.8] text-muted-foreground md:text-[16px]">
                        Core event creatives presented as a campaign series.
                      </p>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      10 posts
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {[
                      { src: ev1, alt: "MIND THE PRODUCT" },
                      { src: ev3, alt: "IPL AUCTION" },
                      { src: ev4, alt: "Event campaign post 4" },
                      { src: ev5, alt: "Event campaign post 5" },
                      { src: ev6, alt: "Event campaign post 6" },
                      { src: ev7, alt: "Event campaign post 7" },
                      { src: ev8, alt: "Event campaign post 8" },
                      { src: ev9, alt: "Event campaign post 9" },
                      { src: ev10, alt: "Event campaign post 10" },
                    ].map((post, index) => (
                      <button
                        key={`event-campaign-${post.alt}-${index}`}
                        type="button"
                        onClick={() => openLightbox(post.src)}
                        className="group overflow-hidden rounded-[20px] bg-white text-left shadow-sm ring-1 ring-black/6 transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30"
                      >
                        <img
                          src={post.src}
                          alt={post.alt}
                          loading="lazy"
                          className="block h-auto w-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                </section>
              </Reveal>

              <Reveal delay={660}>
                <div>
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                      <p className="eyebrow">EVENT ITINERARY</p>
                      <p className="mt-3 text-[15px] leading-[1.8] text-muted-foreground md:text-[16px]">
                        A day-wise visual guide to the E-Summit experience, bringing together key events, workshops, sessions, and activities across the summit.
                      </p>
                    </div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {eventPromotionPosts.length} posts
                    </p>
                  </div>

                  <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => scrollToEventPromotionIndex(activeEventPromotionIndex - 1)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-background transition hover:bg-foreground hover:text-background"
                        aria-label="Previous event promotion post"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollToEventPromotionIndex(activeEventPromotionIndex + 1)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-background transition hover:bg-foreground hover:text-background"
                        aria-label="Next event promotion post"
                      >
                        →
                      </button>
                    </div>

                    <div
                      ref={eventPromotionCarouselRef}
                      className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
                    >
                      {eventPromotionPosts.map((post) => (
                        <button
                          key={post.alt}
                          type="button"
                          onClick={() => openLightbox(post.src)}
                          className="group shrink-0 snap-start overflow-hidden rounded-[22px] border border-line bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
                          style={{ width: "min(72vw, 420px)" }}
                        >
                          <img
                            src={post.src}
                            alt={post.alt}
                            loading="lazy"
                            className="block h-auto w-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>

              <SocialMediaGrid
                heading="WORKSHOP PROMOTION"
                description="Learn from the people building what’s next - from startup masterclasses and business consulting to technology, analytics, and hands-on industry sessions."
                posts={[
                  { src: w1Img, alt: "Workshop promotion post 1" },
                  { src: wc1Img, alt: "Workshop promotion post 2" },
                  { src: gImg, alt: "Workshop promotion post 3" },
                ]}
                delay={720}
                openLightbox={openLightbox}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PrintablesSection({ openLightbox }: { openLightbox: (src: string) => void }) {
  const brochureSrc = brochureImg;
  const printApplications: GalleryImage[] = [
    { src: idCard1Img, alt: "ID card" },
    { src: idCard2Img, alt: "Badge" },
    { src: standeeImg, alt: "Standee" },
  ];
  const participantCards: GalleryImage[] = [
    { src: participantId1Img, alt: "Participant ID card 1" },
    { src: participantId2Img, alt: "Participant ID card 2" },
    { src: participantId3Img, alt: "Participant ID card 3" },
    { src: participantId4Img, alt: "Participant ID card 4" },
  ];

  return (
    <section className="border-t border-line py-20 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="grid items-start gap-3">
            <p className="eyebrow">EDITORIAL DESIGN</p>
            <h2 className="font-display text-[36px] leading-[1] md:text-[48px]">
              Event Brochure & Print System
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              A cohesive print identity designed for E-Summit 2026, extending the brand across
              brochures and event collateral while maintaining consistency throughout the
              physical experience.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 flex justify-center">
            <div className="relative w-full max-w-[85vw]">
              <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground backdrop-blur">
                <span className="block text-foreground">Page 1 / 18</span>
                <span className="mt-0.5 block">Editorial Design</span>
              </div>
              <div className="h-[90vh] overflow-y-auto rounded-[16px] border border-line bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <div className="px-4 py-4 md:px-6 md:py-6">
                  <img
                    src={brochureSrc}
                    alt="E-Summit 2026 brochure"
                    loading="lazy"
                    className="block h-auto w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-12 border-t border-line/70 pt-8">
            <div className="grid items-start gap-3">
              <p className="eyebrow">PRINT APPLICATIONS</p>
              <p className="max-w-2xl text-muted-foreground">
                Supporting print assets that extend the same editorial system across the physical
                event experience.
              </p>
            </div>
            <div className="mt-6 max-w-3xl">
              <p className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                ID Cards
              </p>
              <p className="mt-3 text-[13px] leading-[1.75] text-muted-foreground md:text-[14px]">
                Three ID card concepts designed for the E-Summit 2026 organizing team, exploring
                different visual directions while maintaining a cohesive extension of the event&apos;s
                brand identity.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {printApplications.map((image, index) => (
                <button
                  key={`print-app-${image.alt}-${index}`}
                  type="button"
                  onClick={() => openLightbox(image.src)}
                  className="group block overflow-hidden rounded-[18px] border border-line bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden bg-white">
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="block h-full w-full object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-10 border-t border-line/70 pt-8">
              <div className="max-w-3xl">
                <p className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  PARTICIPANT ID CARDS
                </p>
                <p className="mt-3 text-[13px] leading-[1.75] text-muted-foreground md:text-[14px]">
                  Four participant pass variants designed for E-Summit 2026, using a unified
                  visual system with color-coded access levels while maintaining a consistent brand
                  identity.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {participantCards.map((image, index) => (
                  <button
                    key={`participant-id-${image.alt}-${index}`}
                    type="button"
                    onClick={() => openLightbox(image.src)}
                    className="group block overflow-hidden rounded-[18px] border border-line bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  >
                    <div className="aspect-[4/5] w-full overflow-hidden bg-white">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="block h-full w-full object-contain"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-10 border-t border-line/70 pt-8">
              <div className="grid items-start gap-3">
                <p className="eyebrow">BANNERS</p>
                <p className="max-w-2xl text-muted-foreground">
                  Large-format event banner designed for E-Summit 2026, extending the visual
                  identity across on-ground branding and creating a consistent physical event
                  experience.
                </p>
              </div>
                <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {[
                    { src: b1Img, alt: "Banner creative 1" },
                    { src: b2Img, alt: "Banner creative 2" },
                    { src: b3Img, alt: "Banner creative 3" },
                    { src: b4Img, alt: "Banner creative 4" },
                    {
                      src: b5Img,
                      alt: "Banner creative 5",
                      imageClassName: "object-center",
                      cardClassName: "lg:col-span-2 lg:mx-auto lg:max-w-[calc(50%-0.625rem)]",
                    },
                  ].map((image, index) => (
                  <button
                    key={`banner-${image.alt}-${index}`}
                    type="button"
                    onClick={() => openLightbox(image.src)}
                    className={`group block w-full overflow-hidden rounded-[18px] border border-line bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30 ${image.cardClassName ?? ""}`}
                  >
                    <div className="w-full overflow-hidden bg-white">
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        decoding="async"
                        className={`block h-auto w-full object-contain ${image.imageClassName ?? ""}`}
                      />
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => openLightbox(bImg)}
                  className="group block w-full overflow-hidden rounded-[18px] border border-line bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30"
                >
                  <div className="w-full overflow-hidden bg-white">
                    <img
                      src={bImg}
                      alt="Banner creative"
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full object-contain"
                    />
                  </div>
                </button>
              </div>
            </div>
            <div className="mt-10 border-t border-line/70 pt-8">
              <div className="grid items-start gap-3">
                <p className="eyebrow">DROPDOWNS</p>
                <p className="max-w-2xl text-muted-foreground">
                  Custom dropdown and wayfinding assets designed to extend the E-Summit 2026
                  visual identity across the physical event environment.
                </p>
              </div>
              <div className="mt-8 overflow-x-auto pb-2">
                <div className="mx-auto flex min-w-max justify-center gap-5 md:min-w-0 md:max-w-[72%] md:gap-6">
                  {[
                  { src: d1Img, alt: "Dropdown 01", label: "Dropdown 01" },
                  { src: d2Img, alt: "Dropdown 02", label: "Dropdown 02" },
                    { src: d3Img, alt: "Dropdown 03", label: "Dropdown 03" },
                  ].map((image, index) => (
                    <button
                      key={`dropdown-${image.alt}-${index}`}
                      type="button"
                      onClick={() => openLightbox(image.src)}
                      className="group flex w-[220px] shrink-0 flex-col items-start gap-3 text-left focus:outline-none focus:ring-2 focus:ring-foreground/30 md:w-[240px] lg:w-[260px]"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        loading="lazy"
                        className="block h-auto w-full object-contain"
                      />
                      <p className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                        {image.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-10 border-t border-line/70 pt-8">
              <div className="grid items-start gap-3">
                <p className="eyebrow">INVITATION</p>
                <p className="max-w-2xl text-muted-foreground">
                  An event invitation designed to carry the E-Summit 2026 visual identity into
                  formal event communication.
                </p>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => openLightbox(iiImg)}
                  className="group block max-w-[640px] overflow-hidden rounded-[18px] border border-line bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-foreground/30"
                >
                  <div className="px-4 py-4 md:px-6 md:py-6">
                    <img
                      src={iiImg}
                      alt="Invitation design"
                      loading="lazy"
                      className="block h-auto w-full object-contain"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseStudyPlaceholder({ title }: { title: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto mt-8 max-w-[1120px] md:mt-10">
      <div
        ref={ref}
        className={`reveal ${shown ? "revealed" : ""} flex flex-col items-center px-2 py-24 text-center md:py-36`}
      >
        <p className="eyebrow">Case Study</p>
        <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
          In preparation
        </p>

        <svg
          aria-hidden="true"
          viewBox="0 0 220 220"
          className="mt-20 h-[160px] w-[160px] text-muted-foreground md:h-[220px] md:w-[220px]"
        >
          <circle
            cx="110"
            cy="110"
            r="96"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
          <circle
            cx="110"
            cy="110"
            r="68"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <circle
            cx="110"
            cy="110"
            r="68"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
          <line
            x1="110"
            y1="12"
            x2="110"
            y2="208"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
          <line
            x1="12"
            y1="110"
            x2="208"
            y2="110"
            stroke="currentColor"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
          <circle cx="110" cy="110" r="6" fill="currentColor" fillOpacity="0.55" />
        </svg>

        <h2 className="font-display mt-16 max-w-[26rem] text-[32px] leading-[1.06] tracking-tight md:text-[46px]">
          This case study is currently being refined.
        </h2>
        <p className="mt-7 max-w-[34rem] text-[16px] leading-[1.9] text-muted-foreground md:text-[18px]">
          I&apos;m polishing the research, storytelling, and presentation to ensure it reflects
          the same quality as the final product.
        </p>
        <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
          Expected update: <span className="text-foreground">Soon</span>
        </p>

        <Link
          to="/"
          className="group mt-14 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-4 text-[13px] tracking-wide text-background transition-transform duration-300 hover:-translate-y-[1px]"
        >
          <span aria-hidden>{"\u2190"}</span>
          Back to Work
        </Link>
      </div>
    </div>
  );
}

function BrandTemplate({
  project,
  openLightbox,
}: {
  project: BrandProject;
  openLightbox: (src: string) => void;
}) {
  return (
    <>
      <Breadcrumb
        crumbs={[
          { label: "Home", to: "/" },
          { label: "Brand" },
          { label: project.title },
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 md:pt-14">
          <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10 lg:gap-14">
            <Reveal className="md:col-span-5">
              <p className="eyebrow">FLAGSHIP CASE STUDY</p>
              <h1 className="mt-5 max-w-[9ch] font-display text-[54px] leading-[0.92] tracking-tight sm:text-[72px] md:text-[88px] lg:text-[108px]">
                E-Summit
                <br />
                2026
              </h1>
              <p className="mt-5 max-w-[30rem] text-[15px] leading-[1.72] text-muted-foreground md:text-[16px]">
                Designing the visual identity for IIT Roorkee&apos;s flagship entrepreneurship festival - built around the idea of transcending conventional boundaries and shaping what comes next.
              </p>
              <a
                href="#brand-identity"
                className="mt-7 inline-flex items-center gap-3 rounded-full border border-foreground/20 bg-foreground px-6 py-3.5 text-[13px] font-medium tracking-wide text-background transition-transform hover:-translate-y-[1px] hover:bg-foreground/90"
              >
                Explore Brand System <span aria-hidden>→</span>
              </a>
            </Reveal>

            <Reveal delay={120} className="md:col-span-7">
              <div className="flex justify-center md:justify-end">
                <div className="w-full max-w-[920px] overflow-hidden rounded-[28px] border border-foreground/10 bg-white shadow-[0_20px_50px_-36px_rgba(20,15,10,0.28)]">
                  <img
                    src={heroSliderImg}
                    alt="E-Summit 2026 flagship case study hero"
                    loading="eager"
                    className="block h-auto w-full object-contain object-center"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="brand-identity" className="border-t border-line py-16 md:py-20">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-14 md:px-10">
          <Reveal className="grid gap-7 md:gap-8">
            <div>
              <span className="eyebrow block">Role</span>
              <p className="mt-2 text-foreground">{project.role}</p>
            </div>
            <div>
              <span className="eyebrow block">Timeline</span>
              <p className="mt-2 text-foreground">{project.timeline}</p>
            </div>
            <div>
              <span className="eyebrow block">Team</span>
              <p className="mt-2 text-foreground">{project.team}</p>
            </div>
            <div>
              <span className="eyebrow block">Deliverables</span>
              <p className="mt-2 text-foreground">{project.deliverables.join(", ")}</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-[38rem] whitespace-pre-line text-[15px] leading-[1.75] text-muted-foreground md:text-[16px]">
              {project.overview}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-black/5 py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Reveal>
            <p className="eyebrow">Brand Foundation</p>
            <p className="mt-6 max-w-[44rem] text-[16px] leading-[1.8] text-muted-foreground md:text-[17px]">
              {project.systemDetail.story}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-[780px]">
              <div>
                <p className="eyebrow">BRAND IDENTITY</p>
                <h2 className="font-display mt-5 text-[36px] leading-[1] md:text-[48px]">
                  Transcending the Paradigm
                </h2>
                <div className="mt-5 max-w-[38rem] space-y-5 text-[15px] leading-[1.75] text-muted-foreground md:text-[16px]">
                  <p>
                    &ldquo;Transcending the Paradigm&rdquo; is the central idea behind E-Summit 2026 - a continuation of the journey that began with the previous edition&apos;s theme, &ldquo;Synergy of Genesis&rdquo;. Where Synergy of Genesis explored the power of bringing ideas, people and possibilities together to create something new, Transcending the Paradigm takes the next step: moving beyond the frameworks that already exist.
                  </p>
                  <p>
                    The theme represents questioning conventions, challenging familiar ways of thinking and creating what comes next. The visual identity translates this idea through movement, transformation, directional forms, technological cues and an evolving colour system.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 md:mt-12">
              <p className="eyebrow">LOGO</p>
              <div className="mt-5 w-full bg-white px-6 py-6 md:px-10 md:py-8">
                <div className="mx-auto flex min-h-[240px] max-w-[1120px] items-center justify-center md:min-h-[280px]">
                  <img
                    src={extendedLogo}
                    alt="E-Summit '26 extended logo"
                    className="h-auto w-full max-w-[860px] object-contain"
                  />
                </div>
              </div>
              <div className="mt-6 max-w-[42rem]">
                <p className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                  LOGO STORY
                </p>
                <div className="mt-4 space-y-4 text-[15px] leading-[1.72] text-muted-foreground md:text-[16px]">
                  <p>
                    The identity combines a bold circular form with directional negative-space cuts, creating a sense of movement, transition and forward momentum. The upward arrow integrated into the E-Summit wordmark reinforces the idea of progression - moving beyond existing boundaries rather than simply moving forward within them.
                  </p>
                  <p>
                    Together, these elements create a mark that reflects the spirit of Transcending the Paradigm: breaking familiar structures and opening a path toward what comes next.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-12">
              <p className="eyebrow">COLOUR PALETTE</p>
              <p className="mt-5 max-w-[38rem] text-[15px] leading-[1.75] text-muted-foreground md:text-[16px]">
                The colour system balances depth, energy and experimentation. Deep navy tones establish the identity&apos;s foundation, while electric and bright blues introduce movement and technological energy. Violet acts as a secondary accent, expanding the palette beyond a single visual language and reinforcing the idea of possibility. Together, the system allows the identity to shift between bold event communication and more restrained digital applications.
              </p>
              <div className="mt-8 border-t border-line/60 pt-6">
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                  <div className="space-y-4">
                    <div className="h-44 border border-line/60 bg-[#050A18] md:h-52" />
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Foundation</p>
                      <p className="font-medium leading-snug">Midnight / Deep Navy</p>
                      <p className="text-sm text-muted-foreground">#050A18 · #0B1738</p>
                      <p className="text-sm leading-[1.65] text-muted-foreground">
                        The grounding layer of the identity, creating depth and contrast.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid h-44 grid-cols-2 border border-line/60 md:h-52">
                      <div className="bg-[#0C3A93]" />
                      <div className="bg-[#0070D0]" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Primary</p>
                      <p className="font-medium leading-snug">Deep / Electric Blue</p>
                      <p className="text-sm text-muted-foreground">#0C3A93 · #0070D0</p>
                      <p className="text-sm leading-[1.65] text-muted-foreground">
                        The dominant expression of energy, technology and forward movement.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid h-44 grid-cols-2 border border-line/60 md:h-52">
                      <div className="bg-[#6F45FF]" />
                      <div className="bg-[#7C63FF]" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Accent</p>
                      <p className="font-medium leading-snug">Violet</p>
                      <p className="text-sm text-muted-foreground">#6F45FF · #7C63FF</p>
                      <p className="text-sm leading-[1.65] text-muted-foreground">
                        A secondary accent representing experimentation, possibility and the space beyond the familiar.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid h-44 grid-cols-2 border border-line/60 md:h-52">
                      <div className="bg-[#1D5FFF]" />
                      <div className="bg-[#9BCBFF]" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Support</p>
                      <p className="font-medium leading-snug">Light Blue</p>
                      <p className="text-sm text-muted-foreground">#1D5FFF · #9BCBFF</p>
                      <p className="text-sm leading-[1.65] text-muted-foreground">
                        Used to create contrast, openness and visual hierarchy.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid h-44 grid-cols-2 border border-line/60 md:h-52">
                      <div className="bg-[#F5F8FF]" />
                      <div className="bg-[#FFFFFF]" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Neutral</p>
                      <p className="font-medium leading-snug">White / Near-White</p>
                      <p className="text-sm text-muted-foreground">#F5F8FF · #FFFFFF</p>
                      <p className="text-sm leading-[1.65] text-muted-foreground">
                        Provides clarity, breathing room and contrast across applications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-14 border-t border-line/60 pt-8">
              <p className="eyebrow">TYPOGRAPHY</p>
              <div className="mt-6 max-w-[1040px] space-y-4">
                <p className="font-display text-[40px] leading-[0.98] md:text-[54px]">E-SUMMIT '26</p>
                <p className="font-display text-[28px] leading-[1] md:text-[38px]">
                  TRANSCENDING THE PARADIGM
                </p>
                <p className="text-base text-muted-foreground">Ideas. Innovation. Impact.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={480}>
            <div className="mt-16 border-t border-line/60 pt-8">
              <p className="eyebrow">VISUAL LANGUAGE</p>
              <ul className="mt-6 max-w-[1040px] list-inside list-disc space-y-2 text-muted-foreground">
                <li><strong>FORWARD MOTION</strong>: Directional lines, arrows and sweeping forms communicate progress.</li>
                <li><strong>TRANSFORMATION</strong>: Evolving forms, gradients, particles and light represent change.</li>
                <li><strong>DIGITAL ENERGY</strong>: Electric blue gradients, glowing elements and futuristic compositions create a technology-forward atmosphere.</li>
                <li><strong>CONTRAST</strong>: Deep dark backgrounds against bright blue and white typography create strong visual hierarchy.</li>
                <li><strong>GEOMETRIC STRUCTURE</strong>: Circles, grids, lines and structured layouts reinforce the idea of systems, technology and innovation.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-10">
              <p className="eyebrow">THE IDEA BEHIND THE IDENTITY</p>
              <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.72] text-muted-foreground md:text-[16px]">
                The system translates the theme into a brand language built on momentum, contrast and transformation - allowing the same core idea to feel coherent across campaign posts, website screens, keynote backdrops and physical event graphics.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <SocialMediaSection openLightbox={openLightbox} />

      <BeyondTheGridSection openLightbox={openLightbox} />

      <GallerySection openLightbox={openLightbox} />

      <section className="border-t border-line bg-black/5 py-24 md:py-28">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <Reveal>
            <div className="max-w-[52rem]">
              <p className="eyebrow">REFLECTION</p>
              <h2 className="mt-5 font-display text-[36px] leading-[1.02] md:text-[50px]">
                From a theme to a visual system.
              </h2>
              <div className="mt-8 max-w-[42rem] space-y-5 text-[15px] leading-[1.8] text-muted-foreground md:text-[16px]">
                <p>
                  Building E-Summit 2026 taught me that an event identity is more than a collection of visuals - it is a system that gives every touchpoint a shared direction.
                </p>
                <p>
                  The idea of &ldquo;Transcending the Paradigm&rdquo; became the foundation for everything from the Phoenix motif and motion-led graphics to the colour and typography system.
                </p>
                <p>
                  Designing the identity alongside a live event also meant balancing creative expression with consistency, scalability, and fast execution across social media, web and physical experiences.
                </p>
                <p>
                  Most importantly, the project showed me how a strong visual story can turn a theme into an identity that people can recognise, experience and carry forward.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <PrintablesSection openLightbox={openLightbox} />

      <section className="border-t border-line bg-[#0d0b09] py-16 text-[#f5f0e6] md:py-20">
        <div className="mx-auto flex max-w-[1440px] justify-center px-6 md:px-10">
          <Link to="/" className="link-underline text-[13px] text-[#f5f0e6]/70">
            <span className="link-underline-inner">← Back to portfolio</span>
          </Link>
        </div>
      </section>
    </>
  );
}
function EditorialProjectLayout({
  project,
  next,
}: {
  project: EditorialProject;
  next: Project;
}) {
  return (
    <>
      <EditorialHero project={project} />
      <EditorialCarousel project={project} />
      <EditorialOverview project={project} />
      <EditorialTakeaways project={project} />
      <NextCta next={next} label="Next Campaign" />
    </>
  );
}

function EditorialHero({ project }: { project: EditorialProject }) {
  return (
    <section>
      <div className="mx-auto max-w-[1440px] px-6 pt-10 md:px-10 md:pt-16">
        <Link
          to="/"
          className="link-underline inline-flex items-center gap-2 text-[13px] text-muted-foreground"
        >
          <span className="link-underline-inner">{"\u2190"} Back</span>
        </Link>
        <p className="eyebrow mt-8">{project.subtitle}</p>
        <h1 className="font-display mt-8 max-w-4xl text-[44px] leading-[1] tracking-tight sm:text-[64px] md:text-[92px]">
          {project.title}
        </h1>
        <p className="mt-8 max-w-[42rem] text-[16px] leading-[1.9] text-muted-foreground md:text-[18px]">
          {project.description}
        </p>
        <EditorialTags tags={project.tags} />
      </div>
    </section>
  );
}

function EditorialTags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-7 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-foreground/15 px-3 py-1.5 text-[11px] tracking-wide text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function EditorialCarousel({ project }: { project: EditorialProject }) {
  const { slides: frames, title } = project;
  const [isDragging, setIsDragging] = useState(false);
  const [currentStart, setCurrentStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragStartScrollLeft = useRef(0);
  const total = frames.length;
  const slideAspectRatio = project.slideAspectRatio ?? 4 / 5;

  const scrollToIndex = (start: number) => {
    const el = galleryRef.current;
    if (!el) return;
    const maxStart = Math.max(0, total - visibleCount);
    const clamped = Math.max(0, Math.min(maxStart, start));
    const target = el.children[clamped] as HTMLElement | undefined;
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setCurrentStart(clamped);
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      setVisibleCount(width >= 1024 ? 3 : width >= 768 ? 2 : 1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const maxStart = Math.max(0, total - visibleCount);
    if (currentStart > maxStart) scrollToIndex(maxStart);
  }, [currentStart, total, visibleCount]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const updateCurrentStart = () => {
      const first = el.children[0] as HTMLElement | undefined;
      const second = el.children[1] as HTMLElement | undefined;
      if (!first) return;
      const step = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
      const rawIndex = Math.round(el.scrollLeft / Math.max(step, 1));
      const maxStart = Math.max(0, total - visibleCount);
      setCurrentStart(Math.max(0, Math.min(maxStart, rawIndex)));
    };

    updateCurrentStart();
    el.addEventListener("scroll", updateCurrentStart, { passive: true });
    window.addEventListener("resize", updateCurrentStart);
    return () => {
      el.removeEventListener("scroll", updateCurrentStart);
      window.removeEventListener("resize", updateCurrentStart);
    };
  }, [total, visibleCount]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") scrollToIndex(currentStart + 1);
      if (event.key === "ArrowLeft") scrollToIndex(currentStart - 1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentStart, total, visibleCount]);

  const currentSlide = Math.min(total, currentStart + 1);
  const visibleEnd = Math.min(total, currentStart + visibleCount);

  return (
    <section className="pt-2 md:pt-3">
      <div className="mx-auto w-[95%] max-w-[1500px]">
        <div
          ref={galleryRef}
          className={`flex items-stretch gap-0 overflow-x-auto overscroll-x-contain scroll-smooth ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
          style={{
            touchAction: "pan-y",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          onPointerDown={(event) => {
            const el = galleryRef.current;
            if (!el) return;
            setIsDragging(true);
            dragStartX.current = event.clientX;
            dragStartScrollLeft.current = el.scrollLeft;
            event.currentTarget.setPointerCapture?.(event.pointerId);
          }}
          onPointerMove={(event) => {
            const el = galleryRef.current;
            if (!el || dragStartX.current == null) return;
            const deltaX = event.clientX - dragStartX.current;
            el.scrollLeft = dragStartScrollLeft.current - deltaX;
          }}
          onPointerUp={() => {
            dragStartX.current = null;
            setIsDragging(false);
          }}
          onPointerCancel={() => {
            dragStartX.current = null;
            setIsDragging(false);
          }}
        >
          {frames.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="snap-start shrink-0 basis-full md:basis-1/2 lg:basis-1/3"
              style={{ aspectRatio: slideAspectRatio }}
            >
              <img
                src={src}
                alt={`${title} slide ${index + 1}`}
                draggable={false}
                className="block h-auto w-full object-contain transition-transform duration-[250ms] ease-out hover:scale-[1.01]"
              />
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col items-center gap-2.5">
          <p className="eyebrow whitespace-nowrap tabular-nums">
            {String(currentSlide).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div className="flex items-center gap-2">
            {frames.map((_, index) => {
              const isVisible = index >= currentStart && index < visibleEnd;

              return (
                <button
                  key={`editorial-dot-${title}-${index}`}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => scrollToIndex(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    isVisible ? "bg-foreground" : "bg-foreground/18 hover:bg-foreground/40"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialOverview({ project }: { project: EditorialProject }) {
  const role = project.role;
  const tools = project.tools;

  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-3">
          <p className="eyebrow">Project Details</p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="eyebrow">{project.subtitle}</p>
          <h2 className="font-display mt-5 text-[34px] leading-[1] md:text-[48px]">
            {project.title}
          </h2>
          <p className="max-w-[38rem] text-[16px] leading-[1.9] text-muted-foreground md:text-[18px]">
            {project.description}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8 text-[13px] md:grid-cols-4">
            <div>
              <span className="eyebrow block">Year</span>
              <span className="mt-2 block text-foreground">{project.year}</span>
            </div>
            <div>
              <span className="eyebrow block">Format</span>
              <span className="mt-2 block text-foreground">{project.format}</span>
            </div>
            <div>
              <span className="eyebrow block">Role</span>
              <span className="mt-2 block whitespace-pre-line text-foreground">{role.join("\n")}</span>
            </div>
            <div>
              <span className="eyebrow block">Tools</span>
              <span className="mt-2 block whitespace-pre-line text-foreground">{tools.join("\n")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditorialTakeaways({ project }: { project: EditorialProject }) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-3">
          <p className="eyebrow">Key Takeaways</p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <p className="max-w-[38rem] text-[16px] leading-[1.9] text-muted-foreground md:text-[18px]">
            {project.keyTakeaways}
          </p>
        </div>
      </div>
    </section>
  );
}

function EditorialTemplate({ project }: { project: EditorialProject }) {
  const next = getNextByKind(project.slug);
  return <EditorialProjectLayout project={project} next={next} />;
}

export function Lightbox({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  meta,
}: {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  meta?: string;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev?.();
      if (event.key === "ArrowRight") onNext?.();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 md:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {onPrev && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
        >
          {"\u2190"} Prev
        </button>
      )}

      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        onClick={(event) => event.stopPropagation()}
      />

      {onNext && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
        >
          Next {"\u2192"}
        </button>
      )}

      {meta && (
        <div className="absolute left-1/2 top-6 -translate-x-1/2 text-[11px] uppercase tracking-[0.16em] text-white/70">
          {meta}
        </div>
      )}

      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 rounded-full border border-white/40 bg-black/40 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black"
      >
        Close {"\u00D7"}
      </button>
    </div>
  );
}

function ProjectNotFound() {
  const { slug } = Route.useParams();

  return (
    <main className="bg-background font-sans text-foreground">
      <ProjectTopBar />
      <div className="mx-auto max-w-[1440px] px-6 py-40 md:px-10 md:py-56">
        <p className="eyebrow">404 {"\u2014"} Project</p>
        <h1 className="font-display mt-6 text-[48px] leading-[1] md:text-[80px]">
          No project called <span className="italic text-muted-foreground">{slug}</span>.
        </h1>
        <Link to="/" className="link-underline mt-12 inline-flex items-center gap-2 text-[14px]">
          <span className="link-underline-inner">{"\u2190"} Back to portfolio</span>
        </Link>
      </div>
    </main>
  );
}

