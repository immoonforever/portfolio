import projIrctc from "@/assets/proj-irctc.jpg";
import projEsummit from "@/assets/proj-esummit.jpg";
import projNoosphere from "@/assets/proj-noosphere.jpg";
import brandCafe from "@/assets/e2.png";
import brandCec from "@/assets/brand-cec.jpg";
import brandMerch from "@/assets/e4.png";
import brandSocial from "@/assets/e1.png";
import brandPoster from "@/assets/r1.png";
import p1 from "@/assets/p1.png";
import p2 from "@/assets/p2.png";
import p3 from "@/assets/p3.png";
import p4 from "@/assets/p4.png";
import p5 from "@/assets/p5.png";
import p6 from "@/assets/p6.png";
import p7 from "@/assets/p7.png";
import p8 from "@/assets/p8.png";
import lahorizeeracover from "@/assets/lahorizeeracover.png";
import lj1 from "@/assets/lj1.png";
import lj2 from "@/assets/lj2.png";
import lj3 from "@/assets/lj3.png";
import q1 from "@/assets/q1.png";
import q2 from "@/assets/q2.png";
import q3 from "@/assets/q3.png";
import q4 from "@/assets/q4.png";
import q5 from "@/assets/q5.png";
import q6 from "@/assets/q6.png";
import q7 from "@/assets/q7.png";
import s1 from "@/assets/s1.png";
import s2 from "@/assets/s2.png";
import s3 from "@/assets/s3.png";
import s4 from "@/assets/s4.png";
import s5 from "@/assets/s5.png";
import s6 from "@/assets/s6.png";
import s7 from "@/assets/s7.png";
import s8 from "@/assets/s8.png";
import s9 from "@/assets/s9.png";
import s10 from "@/assets/s10.png";
import azerCaseStudy from "@/assets/AZERR.png";
import irctcCaseStudy from "@/assets/irctcdeck.png";
import pmxCaseStudy from "@/assets/pmxx.png";

export type ProjectKind = "product" | "brand" | "editorial";

export type ProjectBase = {
  slug: string;
  title: string;
  kind: ProjectKind;
  category: string;
  summary: string;
  hero: string;
  tags: string[];
};

export type ProductLearning = {
  title: string;
  note: string;
};

export type ProductProject = ProjectBase & {
  kind: "product";
  role: string;
  timeline: string;
  team: string;
  tools: string[];
  deliverable: string;
  overview: string;
  skills?: string[];
  caseStudyImage?: string;
  caseStudyPlaceholder?: boolean;
};

export type BrandSystemCard = {
  key: "story" | "logo" | "typography" | "colors" | "graphic-language";
  label: string;
  blurb: string;
  cover: string;
};

export type BrandApplication = {
  key: "digital-promotion" | "website" | "event-experience";
  label: string;
  blurb: string;
  cover: string;
  images: string[];
};

export type BrandColor = { name: string; hex: string };

export type CampaignSubsection = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  images: string[];
};

export type ProjectGoal = {
  icon: string;
  title: string;
  description: string;
};

export type DesignProcessStep = {
  phase: string;
  title: string;
  description: string;
  duration: string;
};

export type ImpactMetric = {
  value: string;
  label: string;
  description: string;
};

export type BrandProject = ProjectBase & {
  kind: "brand";
  role: string;
  timeline: string;
  team: string;
  deliverables: string[];
  overview: string;
  system: BrandSystemCard[];
  systemDetail: {
    story: string;
    logo: string[];
    typography: { display: string; text: string; note: string };
    colors: BrandColor[];
    graphicLanguage: { blurb: string; images: string[] };
  };
  applications: BrandApplication[];
  reflection: string[];
  goals?: ProjectGoal[];
  socialMediaCampaigns?: {
    description: string;
    subsections: CampaignSubsection[];
  };
  websiteSection?: { description: string; images: string[]; highlights: string[] };
  merchandiseSection?: { description: string; images: string[] };
  offlineBrandingSection?: { description: string; images: string[] };
  designProcess?: DesignProcessStep[];
  impact?: ImpactMetric[];
};

export type EditorialProject = {
  slug: string;
  kind: "editorial";
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  cover?: string;
  slides: string[];
  slideAspectRatio?: number;
  year: string;
  format: string;
  role: string[];
  tools: string[];
  keyTakeaways: string;
};

export type Project = ProductProject | BrandProject | EditorialProject;

const irctc: ProductProject = {
  slug: "irctc-ai-copilot",
  kind: "product",
  title: "IRCTC AI Copilot",
  category: "PRODUCT DESIGN · AI TRAVEL ASSISTANT",
  summary:
    "A conversational AI copilot for India's railway ecosystem, designed to reduce uncertainty across travel planning, booking, PNR support, changes, and refunds through clearer, more confident decision-making.",
  hero: projIrctc,
  tags: ["Product Strategy", "AI UX", "Conversation Design", "Journey Mapping"],
  role: "Product Strategy, Product Design",
  timeline: "1 Week · 2026",
  team: "Solo",
  tools: ["Figma", "FigJam", "Google Sources"],
  deliverable: "Case study deck + north-star prototype",
  overview:
    "IRCTC AI Copilot explores how GenAI can simplify the fragmented decisions involved in railway travel. The concept reframes IRCTC from a transactional booking system into an intelligent decision-support layer that helps passengers plan, compare options, understand trade-offs, and navigate changes with greater confidence.\n\nThe case study identifies the moments where railway travel becomes difficult and uncertain, then translates those pain points into a focused AI copilot experience. The proposed solution prioritizes practical, high-value interactions rather than adding AI for its own sake.",
  skills: ["Product Strategy", "AI UX", "Conversation Design", "Journey Mapping"],
  caseStudyImage: irctcCaseStudy,
};

const pmx: ProductProject = {
  slug: "pmx",
  kind: "product",
  title: "Creator Hub",
  category: "PRODUCT STRATEGY · CREATOR PLATFORM",
  summary:
    "A product strategy concept for ShareChat and Moj, designed to help emerging regional creators grow with more clarity, confidence, and sustainable opportunities.",
  hero: projNoosphere,
  tags: ["Product Strategy", "UX Research", "Creator Systems", "AI Experience"],
  role: "Product Strategy, UX Research, Product Design",
  timeline: "10 Days · 2026",
  team: "Team of 4",
  tools: ["Figma", "FigJam"],
  deliverable: "Product Strategy Research, Case Study Deck, Interactive Prototype",
  overview:
    "Creator Hub is a product strategy concept built during PMX, Product Management Expedition by E-Cell IIT Guwahati. The solution reimagines how ShareChat and Moj can better support aspiring regional creators by reducing uncertainty, improving discoverability, and providing intelligent guidance throughout their growth journey. Instead of optimizing only for content consumption, the platform focuses on helping creators succeed from their very first upload.",
  skills: ["Product Strategy", "UX Research", "Creator Systems", "AI Experience"],
  caseStudyImage: pmxCaseStudy,
};

const azer: ProductProject = {
  slug: "azer-accessibility-platform",
  kind: "product",
  title: "AZER",
  category: "UX DESIGN · ACCESSIBILITY PLATFORM",
  summary:
    "An AI-powered accessibility platform that brings together communication, navigation, and assistive tools to help people with hearing, visual, and mobility impairments navigate everyday life more independently.",
  hero: projNoosphere,
  tags: ["User Research", "Accessibility", "Interaction Design", "AI Assistance"],
  role: "Product Design, UX Research, Accessibility Design, Interaction Design",
  timeline: "2 Days · 2025",
  team: "Solo Project",
  tools: ["Figma", "FigJam", "Adobe Illustrator"],
  deliverable: "Research Report, UX Case Study, High-Fidelity Prototype, Accessibility Design System",
  overview:
    "AZER is an AI-powered accessibility platform designed to reduce communication, navigation, and mobility barriers for people with disabilities. Built through extensive user research and accessibility-first design, it combines assistive communication, navigation support, emergency assistance, and personalized accessibility tools into one unified experience.",
  caseStudyImage: azerCaseStudy,
};

export const productProjects: ProductProject[] = [azer, pmx, irctc];

const esummit: BrandProject = {
  slug: "e-summit-2026",
  kind: "brand",
  title: "E-Summit 2026",
  category: "Brand Identity · Event System",
  summary:
    "Designing the visual identity for IIT Roorkee's flagship entrepreneurship festival - built around the idea of transcending conventional boundaries and shaping what comes next.",
  hero: projEsummit,
  tags: ["Brand Identity", "Event System", "Visual Design"],
  role: "Design Lead",
  timeline: "14 weeks · 2025–26",
  team: "E-Cell IIT Roorkee design team, event leads and media collaborators",
  deliverables: [
    "Brand strategy",
    "Identity system",
    "Social campaign assets",
    "Website direction",
    "Event graphics",
  ],
  overview:
    "E-Summit 2026 is IIT Roorkee's flagship entrepreneurship festival, bringing together students, founders, innovators and ideas around the future of entrepreneurship. The identity was built around this year's theme, \"Transcending the Paradigm\" - a visual and conceptual shift from established ways of thinking toward new possibilities.\n\nThe system was designed to work across social campaigns, digital experiences, the event website and physical event environments while maintaining one recognizable visual language.",
  system: [
    {
      key: "story",
      label: "Brand Story",
      blurb: "The narrative the identity needed to hold together across every touchpoint.",
      cover: projEsummit,
    },
    {
      key: "logo",
      label: "Logo",
      blurb: "Primary mark, supporting lockups and the rules that keep them consistent.",
      cover: projEsummit,
    },
    {
      key: "typography",
      label: "Typography",
      blurb: "An editorial type system for campaigns, screens and on-ground collateral.",
      cover: brandPoster,
    },
    {
      key: "colors",
      label: "Colour Palette",
      blurb: "A colour system built on dark foundations, electric blues and a violet accent that expands the identity's range.",
      cover: brandCafe,
    },
    {
      key: "graphic-language",
      label: "Graphic Language",
      blurb: "The motifs, grids and compositional logic that made the system scalable.",
      cover: projEsummit,
    },
  ],
    systemDetail: {
      story:
        "E-Summit 2026 is IIT Roorkee's flagship entrepreneurship festival, bringing together founders, innovators, students and industry leaders around ideas that challenge the conventional. The identity was built to express this ambition through a visual system that could scale across digital campaigns, the event website, social media and the physical festival experience.",
      logo: [projEsummit],
    typography: {
      display: "Instrument Serif",
      text: "Inter Tight",
      note: "A high-contrast display serif paired with a neutral contemporary sans gave the system the right balance of authority and warmth.",
    },
    colors: [
      { name: "Ink", hex: "#111111" },
      { name: "Paper", hex: "#F7F3EC" },
      { name: "Terracotta", hex: "#B0553C" },
      { name: "Moss", hex: "#3D4A34" },
      { name: "Bone", hex: "#E7E0D2" },
    ],
    graphicLanguage: {
      blurb:
        "A quiet grid, sharp cropping logic and a repeatable family of editorial motifs gave the identity enough structure to scale across dozens of applications without becoming noisy.",
      images: [brandPoster, brandSocial, brandMerch],
    },
  },
  applications: [
    {
      key: "digital-promotion",
      label: "Digital Promotion",
      blurb: "Campaign posts, recruitment creatives, speaker drops and social-first storytelling assets.",
      cover: brandSocial,
      images: [brandSocial, brandPoster, projEsummit, brandCafe, brandMerch, brandCec],
    },
    {
      key: "website",
      label: "Website & Digital Experience",
      blurb: "Landing screens, responsive direction and the digital behavior of the brand system.",
      cover: projEsummit,
      images: [projEsummit, brandCec, brandPoster, brandSocial],
    },
    {
      key: "event-experience",
      label: "Event Experience",
      blurb: "On-ground branding across signage, merchandise, stage visuals, credentials and event surfaces.",
      cover: brandMerch,
      images: [brandMerch, projEsummit, brandPoster, brandCec, brandSocial, brandCafe],
    },
  ],
  reflection: [
    "A strong brand system makes future decisions easier, not louder.",
    "Editorial structure brought consistency to both print and digital surfaces.",
    "The quiet rules were more valuable than any single hero asset.",
    "Designing for events means building for scale, speed and handoff clarity.",
  ],
};

export const brandProjects: BrandProject[] = [esummit];

function buildEditorialProject(config: Omit<EditorialProject, "kind">): EditorialProject {
  return {
    kind: "editorial",
    ...config,
  };
}

const primeEditorial = buildEditorialProject({
  slug: "prime",
  title: "The Anatomy of Virality",
  subtitle: "Social Editorial Campaign",
  description:
    "An editorial research series that dissects why products like Labubu, Prime and Stanley become cultural phenomena by combining branding, consumer psychology, internet culture and market research into highly visual social-first stories.",
  tags: [
    "Consumer Psychology",
    "Brand Strategy",
    "Editorial Design",
    "Visual Storytelling",
    "Social Media",
    "Trend Research",
  ],
  year: "2026",
  format: "3-part Instagram Editorial Carousel",
  role: ["Research", "Content Strategy", "Editorial Design", "Visual Storytelling"],
  tools: ["Figma", "Adobe Photoshop"],
  keyTakeaways:
    "This project strengthened my ability to translate research into compelling visual stories. By combining consumer psychology, branding, internet culture and market analysis, I learned how editorial design can communicate complex ideas in an engaging, highly shareable format while maintaining clarity and narrative flow.",
  slides: [p1, p2, p3, p4, p5, p6, p7, p8],
});

const lahoriEditorial = buildEditorialProject({
  slug: "lahori-jeera",
  title: "Lahori Zeera",
  subtitle: "Brand Strategy Editorial",
  description:
    "An editorial case study unpacking how Lahori Zeera built a ₹3,000+ crore beverage brand through grassroots distribution, smart pricing, and product strategy instead of traditional advertising.",
  tags: [
    "Brand Strategy",
    "Go-to-Market",
    "Consumer Products",
    "Growth Marketing",
    "Distribution",
    "Editorial Design",
  ],
  cover: lahorizeeracover,
  year: "2025",
  format: "6-slide Instagram Editorial Carousel",
  role: ["Research", "Brand Strategy", "Editorial Design", "Visual Storytelling"],
  tools: ["Figma", "Adobe Photoshop"],
  keyTakeaways:
    "This project strengthened my ability to transform business research into engaging editorial storytelling. By analysing Lahori Zeera's pricing strategy, distribution model and grassroots marketing approach, I learned how thoughtful visual narratives can simplify complex business insights while creating highly engaging social-first content.",
  slides: [lj1, lj2, lj3, q4, q5, q6, q7],
});

const isCricketDyingEditorial = buildEditorialProject({
  slug: "is-cricket-dying",
  title: "Is Cricket Dying?",
  subtitle: "Sports Business Editorial",
  description:
    "An editorial case study analysing how cricket is evolving through changing fan behaviour, shifting media economics and lessons from global sports. The project explores why traditional formats are losing attention, what is driving the rise of leagues like the WPL and how cricket can reinvent itself for the next generation.",
  tags: [
    "Sports Strategy",
    "Business Analysis",
    "Editorial Design",
    "Consumer Behaviour",
    "Storytelling",
    "Research",
  ],
  year: "2025",
  format: "10-slide Instagram Editorial Carousel",
  role: ["Research", "Editorial Design", "Visual Storytelling", "Sports Business Analysis"],
  tools: ["Figma", "Adobe Photoshop"],
  keyTakeaways:
    "This project strengthened my ability to convert complex research into engaging editorial storytelling. By combining audience trends, sports economics, global case studies and visual narratives, I learned how editorial design can simplify strategic insights while creating content that is informative, data-driven and engaging for digital audiences.",
  slides: [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10],
  slideAspectRatio: 1080 / 1350,
});

const decodeEditorial = buildEditorialProject({
  slug: "decode-the-fault",
  title: "Decode the Fault",
  subtitle: "Educational Campaign",
  description:
    "An educational campaign simplifying geological concepts through visual storytelling, structured pacing and clear information design.",
  tags: ["Education", "Infographic", "Editorial", "Visual Storytelling"],
  year: "2025",
  format: "8-slide Instagram Carousel",
  role: ["Research", "Information Design", "Editorial Design"],
  tools: ["Figma", "Illustrator", "Photoshop"],
  keyTakeaways:
    "This project taught me how to simplify technical information without flattening its meaning. I explored how sequencing, annotation and visual hierarchy can make educational content feel clear, engaging and memorable.",
  slides: [brandMerch, brandPoster, brandSocial, projEsummit, brandCec, brandCafe, brandMerch, brandPoster],
});

export const editorialProjects: EditorialProject[] = [
  primeEditorial,
  lahoriEditorial,
  isCricketDyingEditorial,
  decodeEditorial,
];

export const projects: Project[] = [
  ...productProjects,
  ...brandProjects,
  ...editorialProjects,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextByKind(slug: string): Project {
  const p = getProjectBySlug(slug);
  const pool = p ? projects.filter((x) => x.kind === p.kind) : projects;
  const i = pool.findIndex((x) => x.slug === slug);
  return pool[(i + 1) % pool.length];
}

export function getBrand(slug: string): BrandProject | undefined {
  const p = getProjectBySlug(slug);
  return p?.kind === "brand" ? p : undefined;
}


