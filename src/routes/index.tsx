import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import pfpImg from "@/assets/pfp.png";
import designStudioImg from "@/assets/ds.png";
import ecellTeamImg from "@/assets/ecell.png";
import projIrctc from "@/assets/proj-irctc.jpg";
import projAthira from "@/assets/athiraproject (2).png";
import projNoosphere from "@/assets/proj-noosphere.jpg";
import azerPreview from "@/assets/azer1.png";
import pmxPreview from "@/assets/pmx1.png";
import irctcPreview from "@/assets/IRCTC1.png";
import brandCafe from "@/assets/e2.png";
import brandCec from "@/assets/brand-cec.jpg";
import brandMerch from "@/assets/e4.png";
import brandSocial from "@/assets/e1.png";
import brandPoster from "@/assets/r1.png";
import eSummitPreview from "@/assets/3sliderpost.jpg";
import beyondTravel from "@/assets/beyond-travel.jpg";
import beyondSketch from "@/assets/beyond-sketch.jpg";
import beyondCampus from "@/assets/beyond-campus.jpg";
import beyondBooks from "@/assets/beyond-books.jpg";
import beyondCoffee from "@/assets/beyond-coffee.jpg";
import beyondEvents from "@/assets/beyond-events.jpg";
import aboutPortrait from "@/assets/about.png";
import {
  archiveCategories,
  archiveItems,
  type ArchiveFilter,
  type ArchiveItem,
} from "@/lib/archive";
import { editorialProjects } from "@/lib/projects";

const featuredEditorialProjects = editorialProjects.filter(
  (project) => project.slug !== "decode-the-fault",
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zoya Shaikh - Product Designer & Strategist" },
      {
        name: "description",
        content:
          "Portfolio of Zoya Shaikh - product design, strategy, brand identity and visual design. Civil Engineering at IIT Roorkee.",
      },
      { property: "og:title", content: "Zoya Shaikh - Product Designer & Strategist" },
      {
        property: "og:description",
        content:
          "Designing products, brands and experiences people remember. Selected work by Zoya Shaikh.",
      },
    ],
  }),
  component: Portfolio,
});

/* ------------------------------ helpers ------------------------------ */

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
  // Always apply revealed class to ensure images are visible regardless of IntersectionObserver
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

/* ------------------------------ page ------------------------------ */

function Portfolio() {
  return (
    <main className="bg-background text-foreground font-sans">
      <Nav />
      <Hero />
      <IdentityStrip />
      <ProductWork />
      <BrandWork />
      <EditorialWork />
      <About />
      <Experience />
      <Skills />
      <Footer />

    </main>
  );
}

function IdentityStrip() {
  return (
    <section className="border-y bg-background" style={{ borderColor: "#E5E3E0" }}>
      <div className="mx-auto w-full max-w-[1180px] px-6 py-6 md:px-8 md:py-6">
        <div className="grid grid-cols-1 gap-x-[48px] gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase text-[#77736F]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, letterSpacing: "0.14em" }}
            >
              Based in
            </p>
            <p
              className="mt-2 text-[14px] leading-[1.45] text-[#171717]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Roorkee, India
            </p>
          </div>
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase text-[#77736F]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, letterSpacing: "0.14em" }}
            >
              Studying
            </p>
            <p
              className="mt-2 whitespace-nowrap text-[14px] leading-[1.45] text-[#171717]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Civil Engineering · IIT Roorkee
            </p>
          </div>
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase text-[#77736F]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, letterSpacing: "0.14em" }}
            >
              Into
            </p>
            <p
              className="mt-2 text-[14px] leading-[1.45] text-[#171717]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Product · Brand · Visual Design
            </p>
          </div>
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase text-[#77736F]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 500, letterSpacing: "0.14em" }}
            >
              Currently
            </p>
            <p
              className="mt-2 max-w-[20ch] text-[14px] leading-[1.45] text-[#171717]"
              style={{ fontFamily: '"Instrument Sans", sans-serif', fontWeight: 400, letterSpacing: "-0.01em" }}
            >
              Design Head · E-Cell, IIT Roorkee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ nav ------------------------------ */

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4.5 md:px-10">
        <a href="#top" className="font-display text-[22px] leading-none">
          Zoya <span className="italic text-muted-foreground">Shaikh</span>
        </a>
        <nav className="hidden gap-9 text-[13px] text-muted-foreground md:flex">
          <a href="#work" className="nav-link"><span className="nav-link-text hover:text-foreground">Product</span></a>
          <a href="#brand" className="nav-link"><span className="nav-link-text hover:text-foreground">Brand</span></a>
          <a href="#editorial" className="nav-link"><span className="nav-link-text hover:text-foreground">Editorial</span></a>
          <a href="#about" className="nav-link"><span className="nav-link-text hover:text-foreground">About</span></a>
          <a href="#experience" className="nav-link"><span className="nav-link-text hover:text-foreground">Experience</span></a>
          <a href="#contact" className="nav-link"><span className="nav-link-text hover:text-foreground">Contact</span></a>

        </nav>
        <a
          href="/ZoyaShaikh_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 rounded-full border border-foreground/25 px-4 py-2 text-[12px] tracking-wide transition-colors hover:bg-foreground hover:text-background md:inline-flex"
        >
          Resume
        </a>
      </div>
    </header>
  );
}

/* ------------------------------ hero ------------------------------ */

function Hero() {
  const [heroReady, setHeroReady] = useState(false);
  const [portraitShift, setPortraitShift] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setReducedMotion(media.matches);
    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    const rafId = window.requestAnimationFrame(() => setHeroReady(true));

    return () => {
      media.removeEventListener("change", syncMotionPreference);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPortraitShift(0);
      return;
    }

    const onScroll = () => {
      const nextShift = Math.min(14, window.scrollY * 0.045);
      setPortraitShift(nextShift);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <section id="top" className="relative overflow-hidden pt-30 md:flex md:min-h-[82vh] md:flex-col md:pt-34">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 pb-4 md:min-h-0 md:flex-1 md:grid-cols-12 md:items-center md:gap-12 md:px-10 md:pb-5 lg:gap-14">
        {/* Left */}
        <div className="md:col-span-7 lg:col-span-7 md:pt-1">
          <Reveal>
            <p className="eyebrow">Portfolio &mdash; Vol. I &middot; 2026</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className={`hero-headline-motion font-display mt-6 max-w-[11.5ch] text-[38px] leading-[0.9] tracking-tight sm:text-[48px] md:text-[54px] lg:text-[62px] ${heroReady ? "is-ready" : ""}`}>
              Designing
              <br />
              products,
              <br />
              <span className="italic text-muted-foreground">brands</span> &amp;
              <br />
              experiences
              <br />
              people remember.
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className={`hero-copy-motion mt-6 max-w-[32rem] text-[14px] leading-[1.8] text-muted-foreground sm:text-[15px] ${heroReady ? "is-ready" : ""}`}>
              I&apos;m Zoya &mdash; a multidisciplinary designer exploring product design, strategy,
              and visual identity. I turn complex ideas into clear, thoughtful experiences
              &mdash; from digital products and interfaces to brands and campaigns.
            </p>
          </Reveal>
          <Reveal delay={380}>
            <div className="mt-8 flex flex-wrap items-center">
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-foreground px-5.5 py-3 text-[13px] tracking-wide text-background transition-transform duration-200 hover:-translate-y-[1px]"
              >
                Explore my work
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right â€” portrait */}
        <div
          className="relative flex items-start md:col-span-5 md:justify-center md:pl-2 md:pr-8 lg:col-span-5 lg:pl-4 lg:pr-12"
          style={{
            transform: reducedMotion ? "translateY(-22px)" : `translateY(${portraitShift - 22}px)`,
          }}
        >
          <Reveal delay={200} className="w-full">
            <div className={`hero-portrait-motion mx-auto w-full max-w-[236px] overflow-hidden rounded-[26px] sm:max-w-[252px] md:max-w-[258px] lg:max-w-[270px] ${heroReady ? "is-ready" : ""}`}>
              <img
                src={pfpImg}
                alt="Portrait of Zoya Shaikh"
                width={1024}
                height={1280}
                className="aspect-[4/5] h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>

      </div>

    </section>
  );
}

/* ------------------------------ manifesto ------------------------------ */

function Manifesto() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:pb-28 md:pt-30">
        <Reveal>
          <p className="eyebrow mb-10">A quiet belief</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display text-[44px] leading-[1.02] sm:text-[64px] md:text-[92px] lg:text-[112px]">
            The best products don&apos;t
            <br />
            <span className="italic text-muted-foreground">announce themselves.</span>
            <br />
            They quietly make the next
            <br />
            step feel obvious.
          </h2>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ product work ------------------------------ */

type Project = {
  slug: string;
  no: string;
  title: string;
  category: string;
  story: string;
  tags: string[];
  image?: string;
};

const products: Project[] = [
    {
      slug: "pmx",
      no: "01",
      title: "Creator Hub",
      category: "Product Strategy • Creator Systems",
      story:
        "Reimagining ShareChat and Moj to help emerging Tier-2 and Tier-3 creators build confidence, find their voice, grow with clarity, and turn their content into sustainable opportunities.",
      tags: ["Product Strategy", "UX Research", "Creator Systems", "AI Experience"],
      image: pmxPreview,
    },
  {
    slug: "azer-accessibility-platform",
    no: "02",
    title: "Azer",
    category: "UX Design • Accessibility Platform",
    story:
      "An AI-powered accessibility platform bringing communication, navigation, and assistive tools together to help people with hearing, visual, and mobility impairments navigate everyday life more independently.",
    tags: ["User Research", "Accessibility", "Interaction Design", "AI Assistance"],
    image: azerPreview,
  },
  {
    slug: "irctc-ai-copilot",
    no: "03",
    title: "IRCTC AI Copilot",
    category: "Product Design • AI Travel Experience",
    story:
      "A conversational planning layer for India's largest rail ecosystem, designed to simplify booking, changes, and decision-making at scale.",
    tags: ["Product Strategy", "AI UX", "Journey Mapping", "Conversation Design"],
    image: irctcPreview,
  },
];

function ProductWork() {
  return (
    <section id="work" className="border-t border-line bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-[88px] md:px-10 md:py-[96px]">
        <Reveal>
          <div className="max-w-[760px]">
            <p
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
              style={{ fontFamily: '"Inter Tight", "Inter", sans-serif', fontWeight: 500 }}
            >
              Section 01 - Selected Work
            </p>
            <h2
              className="font-display mt-3 max-w-[680px] text-[42px] leading-[0.94] tracking-tight text-foreground md:text-[56px] lg:text-[64px]"
            >
              A few products
              <br />
              I&apos;ve been building.
            </h2>
            <p
              className="mt-6 max-w-[520px] text-[15px] leading-[1.55] text-muted-foreground md:text-[16px]"
              style={{ fontFamily: '"Inter Tight", "Inter", sans-serif', fontWeight: 400 }}
            >
              Product strategy, UX research, AI-enabled experiences, and interaction design shaped around user needs and business goals.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 md:mt-14">
          {products.map((p, i) => (
            <ProjectRow key={p.no} project={p} reversed={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComingSoonPreview({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#fbfbfa] px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative flex h-[168px] w-[168px] items-center justify-center rounded-full border border-[#1d5fbf]/20 transition-all duration-500 ease-out group-hover:border-[#1d5fbf]/35">
          <svg
            viewBox="0 0 168 168"
            className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] transition-[animation-duration,opacity] duration-500 ease-out group-hover:opacity-100 group-hover:[animation-duration:12s]"
            aria-hidden="true"
          >
            <circle cx="84" cy="84" r="73.5" fill="none" stroke="rgba(29,95,191,0.14)" strokeWidth="1" />
            <circle cx="84" cy="10.5" r="3" fill="#1d5fbf" />
          </svg>
          <div className="px-6">
            <p
              className="text-[13px] uppercase tracking-[0.18em] text-[#1d5fbf]"
              style={{ fontFamily: '"Inter Tight", "Inter", sans-serif', fontWeight: 500 }}
            >
              Coming Soon
            </p>
            <p
              className="mt-3 text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground"
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

function ProjectRow({ project, reversed }: { project: Project; reversed: boolean }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group block cursor-pointer border-t border-[#E8E8E8]/80 py-12 transition-colors duration-200 first:border-t-0 first:pt-0 md:py-14 lg:py-16"
    >
      <article className="grid grid-cols-1 items-center gap-7 md:grid-cols-[minmax(0,52fr)_minmax(0,48fr)] md:gap-9 lg:gap-12">
        <Reveal className={reversed ? "md:order-2" : ""}>
          <div className="relative aspect-video w-full overflow-hidden rounded-[18px] border border-line/60 bg-paper-2 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
            {project.slug === "irctc-ai-copilot" ? (
              <ComingSoonPreview title="IRCTC AI Copilot" />
            ) : project.image ? (
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.015]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-8 text-center">
                <div>
                  <p className="eyebrow">{project.category}</p>
                  <p className="font-display mt-4 text-[30px] leading-[1] text-foreground md:text-[40px]">
                    {project.title}
                  </p>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={120} className={reversed ? "md:order-1" : ""}>
          <div className="flex items-baseline gap-4 text-muted-foreground">
            <span className="font-display text-[22px] leading-none text-muted-foreground/55 md:text-[24px]">
              {project.no}
            </span>
            <span className="eyebrow text-[10px] md:text-[11px]">{project.category}</span>
          </div>
          <h3 className="font-display mt-4 max-w-[11ch] text-[38px] leading-[1] tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-0.5 md:mt-3 md:text-[50px]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-[31rem] text-[14px] leading-[1.72] text-muted-foreground md:mt-5 md:text-[15px]">
            {project.story}
          </p>
          <Reveal delay={220} className="mt-6 md:mt-7">
            <ul className="flex flex-wrap gap-2.5">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-[#D8D8D8]/70 px-2.5 py-0.5 text-[10.5px] tracking-normal text-muted-foreground/90 transition-colors duration-300 group-hover:border-foreground/20"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="link-underline mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.14em] text-foreground/80 md:mt-7">
            <span className="link-underline-inner">View Project</span>
            <span aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5">→</span>
          </div>
        </Reveal>
      </article>
    </Link>
  );
}

/* ------------------------------ brand work ------------------------------ */

function BrandWork() {
  return (
    <section id="brand" className="scroll-mt-28 border-t border-line md:scroll-mt-32">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex items-end justify-between gap-8 md:gap-12">
          <Reveal>
            <div>
              <p className="eyebrow">Section 02 - Brand Identity</p>
              <h2 className="font-display mt-5 text-[50px] leading-[0.96] tracking-tight md:text-[80px] lg:text-[88px]">
                Brand Identity <span className="italic text-muted-foreground">&amp;</span>
                <br />
                Systems
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120} className="self-center lg:self-center lg:translate-y-2">
            <p className="hidden max-w-[27rem] text-[18px] leading-[1.7] text-muted-foreground md:block lg:max-w-[29rem] lg:text-[20px]">
              Building visual identities and systems that turn ideas into recognizable brands -
              from strategy and identity to campaigns, digital experiences, and event communication.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-16 md:mt-18">
          <Link to="/projects/$slug" params={{ slug: "e-summit-2026" }} className="group block">
            <article className="rounded-[28px] border border-line bg-background p-4 shadow-[0_12px_28px_rgba(20,15,10,0.03)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_16px_36px_rgba(20,15,10,0.055)] md:p-5">
              <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
                <div className="min-w-0 self-center">
                  <p className="eyebrow">CASE STUDY</p>
                  <h3 className="font-display mt-4 text-[39px] leading-[0.96] tracking-tight md:text-[58px]">
                    E-Summit 2026
                  </h3>
                  <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
                    BRAND SYSTEM · CAMPAIGN · DIGITAL · EVENT
                  </p>
                  <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-muted-foreground md:text-[16px]">
                    The visual identity for E-Summit 2026, IIT Roorkee&apos;s flagship entrepreneurship festival, built around the theme &lsquo;Transcending the Paradigm.&rsquo; The system was carried across campaigns, digital experiences, and the physical event.
                  </p>
                  <div className="link-underline mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.14em] text-foreground/80">
                    <span className="link-underline-inner">View Case Study</span>
                    <span aria-hidden>→</span>
                  </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                  <div className="w-full max-w-[870px] overflow-hidden rounded-[22px] border border-foreground/8 bg-paper-2">
                    <img
                      src={eSummitPreview}
                      alt="E-Summit 2026 brand identity"
                      loading="lazy"
                      className="block h-auto w-full object-contain object-center"
                    />
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ editorial & social ------------------------------ */

function EditorialWork() {
  return (
    <section id="editorial" className="border-t border-line bg-paper-2/40">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Section 03 - Editorial Campaigns</p>
            <h2 className="font-display mt-6 text-[40px] leading-[1] md:text-[64px]">
              Editorial Campaigns
            </h2>
            <p className="mt-8 max-w-[42rem] text-[15px] leading-relaxed text-muted-foreground">
              A collection of campaigns, editorials and social-first narratives designed
              to communicate ideas through sequential visual storytelling.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 space-y-32 md:mt-28 md:space-y-36">
          {featuredEditorialProjects.map((item, index) => {
            return (
              <Reveal key={item.slug} delay={index * 80}>
                <EditorialCard
                  item={{
                    slug: item.slug,
                    title: item.title,
                    image: item.cover ?? item.slides[0],
                    category: item.subtitle,
                    summary: item.description,
                    tags: item.tags,
                  }}
                  reversed={index % 2 === 1}
                />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function EditorialCard({
  item,
  reversed,
}: {
  item: {
    slug: string;
    title: string;
    image: string;
    category: string;
    summary: string;
    tags: string[];
  };
  reversed: boolean;
}) {
  return (
    <article className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-x-20 xl:gap-x-24">
      <div
        className={
          reversed
            ? "lg:order-2 lg:col-span-6 lg:flex lg:justify-end"
            : "lg:col-span-6 lg:flex lg:justify-start"
        }
      >
        <Link
          to="/projects/$slug"
          params={{ slug: item.slug }}
          className="group/image block w-full max-w-[520px] cursor-pointer"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-[24px] bg-paper shadow-[0_18px_50px_rgba(0,0,0,0.07)] transition-all duration-300 ease-out group-hover/image:-translate-y-[6px] group-hover/image:shadow-[0_26px_70px_rgba(0,0,0,0.12)]">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/image:scale-[1.02]"
            />
          </div>
        </Link>
      </div>

      <div
        className={
          reversed
            ? "lg:order-1 lg:col-span-6 lg:col-start-1"
            : "lg:col-span-6 lg:col-start-7"
        }
      >
        <div className="max-w-[31rem]">
          <p className="text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            {item.category}
          </p>
          <h3 className="font-display mt-4 text-[34px] leading-[1] md:text-[44px]">
            {item.title}
          </h3>
          <p className="mt-5 text-[15px] leading-[1.9] text-muted-foreground">
            {item.summary}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={`${item.slug}-${tag}`}
                className="rounded-full border border-black/12 bg-white px-[14px] py-[6px] text-[12px] text-muted-foreground transition-colors duration-[250ms] hover:bg-black hover:text-white"
              >
                {tag}
              </li>
            ))}
          </ul>

          <Link
            to="/projects/$slug"
            params={{ slug: item.slug }}
            className="group/link link-underline mt-8 inline-flex items-center gap-2 text-[13px] tracking-wide"
          >
            <span className="link-underline-inner">Open Campaign</span>
            <span
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover/link:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ archive ------------------------------ */

function ArchiveWork() {
  const [activeCategory, setActiveCategory] = useState<ArchiveFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleArchiveItems =
    activeCategory === "All"
      ? archiveItems
      : archiveItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeCategory]);

  return (
    <section id="archive" className="border-t border-line">
      <div className="mx-auto max-w-[1500px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="max-w-[46rem]">
            <p className="eyebrow">Archive</p>
            <h2 className="font-display mt-6 text-[40px] leading-[1] md:text-[64px]">
              A curated wall
              <br />
              <span className="italic text-muted-foreground">of smaller works.</span>
            </h2>
            <p className="mt-8 max-w-[38rem] text-[15px] leading-[1.9] text-muted-foreground">
              Experiments, posters, social creatives, branding fragments and editorial
              studies that sit outside the long-form case studies but still shape the
              practice.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap gap-3 md:mt-14">
            {archiveCategories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-[12px] tracking-[0.08em] transition-colors duration-300 ${
                    isActive
                      ? "border-foreground bg-foreground text-background"
                      : "border-foreground/15 bg-white text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-16 columns-1 gap-6 md:mt-20 md:columns-2 md:gap-8 xl:columns-3 xl:gap-10">
          {visibleArchiveItems.map((item, index) => (
            <Reveal key={item.id} delay={(index % 6) * 70} className="mb-6 break-inside-avoid md:mb-8 xl:mb-10">
              <ArchiveCard item={item} onOpen={() => setLightboxIndex(index)} />
            </Reveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && visibleArchiveItems[lightboxIndex] && (
        <ArchiveLightbox
          items={visibleArchiveItems}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((current) =>
              current === null
                ? 0
                : (current - 1 + visibleArchiveItems.length) % visibleArchiveItems.length,
            )
          }
          onNext={() =>
            setLightboxIndex((current) =>
              current === null ? 0 : (current + 1) % visibleArchiveItems.length,
            )
          }
        />
      )}
    </section>
  );
}

function ArchiveCard({
  item,
  onOpen,
}: {
  item: ArchiveItem;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/archive block w-full cursor-zoom-in text-left transition-transform duration-300 ease-out hover:-translate-y-[4px] hover:scale-[1.02]"
    >
      <span className="relative block overflow-hidden rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-shadow duration-300 group-hover/archive:shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="block h-auto w-full"
        />
        <span className="pointer-events-none absolute inset-x-4 bottom-4 flex translate-y-2 items-center justify-between gap-4 opacity-0 transition-all duration-300 ease-out group-hover/archive:translate-y-0 group-hover/archive:opacity-100">
          <span className="rounded-full bg-background/88 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-foreground shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            {item.category}
          </span>
          <span className="rounded-full bg-background/88 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground shadow-[0_10px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            {item.year}
          </span>
        </span>
      </span>

      <span className="mt-4 block">
        <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {item.category} · {item.year}
        </span>
        <span className="font-display mt-2 block text-[28px] leading-[1.02] md:text-[32px]">
          {item.title}
        </span>
      </span>
    </button>
  );
}

function ArchiveLightbox({
  items,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  items: ArchiveItem[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
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
      className="fixed inset-0 z-[100] bg-black/92 p-4 md:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div className="absolute left-4 top-4 max-w-[22rem] text-white md:left-6 md:top-6" onClick={(event) => event.stopPropagation()}>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
          {item.category} · {item.year}
        </p>
        <h3 className="font-display mt-3 text-[32px] leading-[0.98] md:text-[42px]">
          {item.title}
        </h3>
      </div>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/6 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black md:right-6 md:top-6"
      >
        Close ×
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/6 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black md:left-6"
      >
        ← Prev
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/6 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black md:right-6"
      >
        Next →
      </button>

      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-center px-12 md:px-24" onClick={(event) => event.stopPropagation()}>
        <img
          src={item.image}
          alt={item.title}
          className="max-h-[82vh] max-w-full object-contain"
        />
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4 px-4 text-white md:bottom-6" onClick={(event) => event.stopPropagation()}>
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {item.tags.map((tag) => (
            <li
              key={`${item.id}-${tag}`}
              className="rounded-full border border-white/18 bg-white/6 px-3 py-1.5 text-[11px] text-white/82 backdrop-blur-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------ about ------------------------------ */

const aboutFocusAreas = [
  "Product Design",
  "UI/UX",
  "Product Strategy",
  "Brand Identity",
  "Graphic Design",
  "Design Systems",
  "AI",
  "Data Analytics",
];

function About() {
  return (
    <section id="about" className="border-t border-line bg-paper-2/60">
      <div className="mx-auto max-w-[1480px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-20">
          <Reveal>
            <div className="max-w-[54rem]">
              <p className="eyebrow">Section 04 - About</p>
              <h2 className="mt-6 max-w-[11ch] font-display text-[48px] leading-[0.94] tracking-tight md:text-[68px] lg:text-[88px]">
                Designing with structure, curiosity and intent.
              </h2>
              <p className="mt-6 max-w-[46rem] text-[16px] leading-[1.95] text-muted-foreground md:text-[18px]">
                I&apos;m a multidisciplinary designer studying Civil Engineering at IIT Roorkee,
                working across product design, visual identity and creative direction. My
                engineering background shapes how I think about systems, while design helps me
                turn complex ideas into clear, thoughtful experiences.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:pt-1">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6 border-t border-line pt-5">
                <div className="space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    04 / About
                  </p>
                  <p className="font-display text-[20px] leading-none text-foreground/70 md:text-[26px]">
                    Zoya Shaikh
                  </p>
                </div>
                <p className="max-w-[16ch] text-right text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
                  Product / Brand / Visual
                </p>
              </div>
              <div className="flex justify-center lg:justify-start">
                <div className="aspect-[4/5] w-full max-w-[340px] md:max-w-[360px] lg:max-w-[380px]">
                  <img
                    src={aboutPortrait}
                    alt="Portrait of Zoya Shaikh"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-16 border-t border-line pt-10 md:mt-18">
            <div className="mb-8 max-w-[34rem]">
              <p className="eyebrow">The People Behind the Work</p>
              <p className="mt-3 text-[14px] leading-[1.75] text-muted-foreground md:text-[15px]">
                Some of my favourite work happens with good people around me.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:gap-7">
              <figure className="group flex flex-col border border-line/70 bg-white/80">
                <div>
                  <img
                    src={designStudioImg}
                    alt="Design Studio team"
                    loading="lazy"
                    className="h-auto w-full object-[unset] transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="flex items-start justify-between gap-4 border-t border-line/70 px-4 py-4 md:px-5">
                  <div>
                    <p className="eyebrow">Design Studio</p>
                    <p className="mt-1 text-[13px] leading-[1.6] text-foreground md:text-[14px]">
                      Designing, collaborating &amp; making things together.
                    </p>
                  </div>
                </figcaption>
              </figure>

              <figure className="group flex flex-col border border-line/70 bg-white/80">
                <div>
                  <img
                    src={ecellTeamImg}
                    alt="E-Cell IIT Roorkee team"
                    loading="lazy"
                    className="h-auto w-full object-[unset] transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="flex items-start justify-between gap-4 border-t border-line/70 px-4 py-4 md:px-5">
                  <div>
                    <p className="eyebrow">E-Cell · IIT Roorkee</p>
                    <p className="mt-1 text-[13px] leading-[1.6] text-foreground md:text-[14px]">
                      Leading, creating &amp; having fun with a team that builds together.
                    </p>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-16 border-t border-line pt-10 md:mt-18">
            <div className="grid gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-start lg:gap-16">
              <div>
                <p className="eyebrow">How I Think</p>
                <h3 className="mt-5 max-w-[12ch] font-display text-[38px] leading-[1.02] tracking-tight md:text-[54px]">
                  I like turning
                  <br />
                  complex problems into
                  <br />
                  things that feel
                  <br />
                  simple.
                </h3>
              </div>
              <div className="max-w-[38rem] self-end text-[15px] leading-[1.95] text-muted-foreground md:text-[16px]">
                My engineering background taught me to look for systems, constraints and the
                logic underneath a problem. Design taught me to look at the same problem through
                the eyes of the person experiencing it. I like working between those two
                perspectives - understanding how something works, then shaping it into something
                that feels clear, intuitive and considered.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-16 border-t border-line pt-10 md:mt-18">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
              <div>
                <p className="eyebrow">Beyond Design</p>
                <h3 className="mt-5 max-w-[14ch] font-display text-[32px] leading-[1.02] md:text-[44px]">
                  Currently
                  <br />
                  curious about
                  <br />
                  systems, AI,
                  <br />
                  startups, and what
                  <br />
                  makes people choose
                  <br />
                  one product over another.
                </h3>
              </div>
              <div className="max-w-[38rem] self-end text-[15px] leading-[1.9] text-muted-foreground md:text-[16px]">
                I&apos;m interested in the space where design meets technology, business and human
                behaviour. I like understanding what happens beneath a product - the systems that
                power it, the data behind decisions, the people it&apos;s built for, and the market
                it exists in. Lately, that curiosity has taken me deeper into AI, startups and
                emerging technology, and into how products can use all of these pieces to become
                more useful, intuitive and meaningful.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-16 border-t border-line pt-8 md:mt-18">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="eyebrow">What I Work Across</p>
              </div>
              <p className="text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
                03
              </p>
            </div>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {aboutFocusAreas.map((area, index) => (
                <li key={area}>
                  <a
                    href="#"
                    className="group grid min-h-[72px] grid-cols-[2.5rem_minmax(0,1fr)_1.5rem] items-center gap-x-4 px-0 py-5 transition-colors duration-200 hover:bg-foreground/[0.03] md:min-h-[84px] md:gap-x-6 md:py-6"
                  >
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[20px] leading-none text-foreground md:text-[24px]">
                      {area}
                    </span>
                    <span className="justify-self-end text-right text-[12px] uppercase tracking-[0.16em] text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------ experience ------------------------------ */

const experience = [
  {
    year: "2026 - PRESENT",
    role: "Design Head",
    org: "E-Cell, IIT Roorkee",
    note: "Leading a multidisciplinary design team across product/UI, visual identity, branding, event design, campaigns, merchandise, web and social. I work across both strategy and execution, building cohesive visual systems that carry consistently across digital and physical touchpoints.",
  },
  {
    year: "Jan 2026 - Apr 2026",
    role: "Product Designer Intern",
    org: "Athira",
    note: "Worked across product design, UI/UX and product experiences, designing interfaces and flows with a focus on usability, clarity and visual consistency.",
  },
  {
    year: "FEB 2025 - PRESENT",
    role: "Designer",
    org: "Design Studio, IIT Roorkee",
    note: "Worked across multidisciplinary design projects spanning product/UI, branding, graphic and visual design, merchandise, social media and campaigns-translating ideas into clear, cohesive visual experiences.",
  },
];

function Experience() {
  return (
    <section id="experience">
      <div className="mx-auto max-w-[1440px] px-6 pb-24 pt-10 md:px-10 md:pb-32 md:pt-14">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Section 05 - Experience</p>
            <h2 className="font-display mt-6 text-[40px] leading-[1] md:text-[56px]">
              Experience
            </h2>
            <p className="mt-6 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
              A selection of roles and design experiences that have shaped how I approach products, visual systems, and creative leadership.
            </p>
          </Reveal>

          <div className="md:col-span-8">
            <ul>
              {experience.map((e, i) => (
                <Reveal key={e.role} delay={i * 80}>
                  <li className="group grid grid-cols-12 gap-6 border-t border-line py-10 transition-colors duration-300 last:border-b md:gap-8 md:py-12 hover:border-foreground/20">
                    <div className="col-span-12 md:col-span-3">
                      <p className="eyebrow">{e.year}</p>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <div className="flex flex-wrap items-baseline gap-3">
                        <h3 className="font-display text-[24px] leading-tight transition-all duration-300 group-hover:translate-x-1 md:text-[30px]">
                          {e.role}
                        </h3>
                        <span className="text-[14px] italic text-muted-foreground transition-opacity duration-300 group-hover:opacity-80">
                          - {e.org}
                        </span>
                      </div>
                      <p className="mt-4 max-w-xl text-[14px] leading-[1.85] text-muted-foreground transition-opacity duration-300 group-hover:opacity-90">
                        {e.note}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ skills ------------------------------ */

const skills = [
  "Product Design",
  "Product Strategy",
  "Product Management",
  "UX Research",
  "Wireframing",
  "Brand Identity",
  "Graphic Design",
  "Data Analytics",
  "AI",
  "Figma",
  "Illustrator",
  "Photoshop",
  "Canva",
];

function Skills() {
  return (
    <section className="border-t border-line bg-paper-2/60">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Section 06 - Toolkit</p>
            <h2 className="font-display mt-6 text-[36px] leading-[1] md:text-[44px]">
              A short list
              <br />
              <span className="italic text-muted-foreground">of what I work with.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="md:col-span-8">
            <ul className="flex flex-wrap gap-2.5">
              {skills.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-foreground/15 px-4 py-2 text-[13px] text-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ beyond ------------------------------ */

function Beyond() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="eyebrow">Section 08 - Beyond the screen</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display mt-6 max-w-3xl text-[40px] leading-[1.02] md:text-[64px]">
            A quieter life,
            <br />
            <span className="italic text-muted-foreground">between the projects.</span>
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-12 gap-4 md:mt-28 md:gap-6">
          <Reveal className="col-span-8 md:col-span-5">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img src={beyondSketch} alt="Sketchbook" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="eyebrow mt-4">Sketchbooks</p>
          </Reveal>

          <div className="col-span-4 flex flex-col gap-4 md:col-span-3 md:gap-6">
            <Reveal delay={80}>
              <div className="aspect-square w-full overflow-hidden">
                <img src={beyondCoffee} alt="Morning coffee" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="eyebrow mt-3">Slow mornings</p>
            </Reveal>
            <Reveal delay={160}>
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img src={beyondBooks} alt="Books" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <p className="eyebrow mt-3">Reading</p>
            </Reveal>
          </div>

          <Reveal delay={120} className="col-span-12 md:col-span-4">
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img src={beyondTravel} alt="Mountains" loading="lazy" className="h-full w-full object-cover grayscale" />
            </div>
            <p className="eyebrow mt-4">Weekends away</p>
          </Reveal>

          <Reveal className="col-span-7 md:col-span-7">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img src={beyondCampus} alt="Campus" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="eyebrow mt-4">Roorkee, at dusk</p>
          </Reveal>
          <Reveal delay={120} className="col-span-5 md:col-span-5">
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img src={beyondEvents} alt="Events" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="eyebrow mt-4">Rooms full of ideas</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ footer ------------------------------ */

function Footer() {
  return (
    <footer id="contact" className="bg-[#0d0b09] text-[#f5f0e6]">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-24">
        <Reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f5f0e6]/50">
            Section 07 - Get in touch
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display mt-8 max-w-4xl text-[48px] leading-[0.98] tracking-tight sm:text-[72px] md:text-[88px] lg:text-[104px]">
            Let&apos;s build
            <br />
            something
            <br />
            meaningful.
          </h2>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[#f5f0e6]/60">
            Open to internships, collaborations and thoughtful product conversations.
          </p>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-14 border-t border-[#f5f0e6]/15 pt-10 md:mt-24 md:grid-cols-12 md:gap-12 md:pt-12">
          <Reveal className="md:col-span-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f5f0e6]/50">
              Primary contact
            </p>
            <a
              href="mailto:zoyashaikh6978@gmail.com"
              className="font-display mt-5 block text-[26px] leading-tight md:text-[36px]"
            >
              <span className="link-underline-inner">zoyashaikh6978@gmail.com</span>
            </a>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[#f5f0e6]/60">
              Currently open to internships across Product Management, Product Design, UI/UX, Product Strategy, Brand Design and related technology roles.
            </p>
            <dl className="mt-8 space-y-4 text-[14px] leading-relaxed text-[#f5f0e6]/60">
              <div>
                <dt className="text-[#f5f0e6]/40">Based in</dt>
                <dd className="mt-1 text-[#f5f0e6]/80">Roorkee, India</dd>
              </div>
              <div>
                <dt className="text-[#f5f0e6]/40">Response time</dt>
                <dd className="mt-1 text-[#f5f0e6]/80">Usually within 24 hours</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="md:col-span-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#f5f0e6]/50">
              Links
            </p>
            <ul className="mt-5 space-y-4 text-[16px]">
              {[
                ["LinkedIn", "https://www.linkedin.com/in/zoyashaikh-iitr"],
                ["Resume (PDF)", "/ZoyaShaikh_Resume.pdf"],
                ["Email", "mailto:zoyashaikh6978@gmail.com"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target={label === "LinkedIn" || href === "/ZoyaShaikh_Resume.pdf" ? "_blank" : undefined}
                    rel={label === "LinkedIn" || href === "/ZoyaShaikh_Resume.pdf" ? "noopener noreferrer" : undefined}
                    className="group inline-flex items-center gap-3 text-[#f5f0e6]/85 transition-colors duration-[250ms] hover:text-[#f5f0e6]"
                  >
                    <span className="link-underline-inner">{label}</span>
                    <span
                      aria-hidden
                      className="translate-x-0 opacity-60 transition-all duration-[250ms] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-[#f5f0e6]/15 pt-6 text-[12px] text-[#f5f0e6]/50">
          <div className="space-y-1">
            <p>© 2026 Zoya Shaikh</p>
            <p>Designed and developed with Figma + VS Code.</p>
          </div>
          <div className="space-y-1 text-left md:text-right">
            <p>Built with curiosity.</p>
            <p>Always learning.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}



