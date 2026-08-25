import brandCec from "@/assets/brand-cec.jpg";
import esummitIdentity from "@/assets/esummitidentity.png";
import esummitCover from "@/assets/3.png";
import socialCreative from "@/assets/e1.png";
import packagingStudy from "@/assets/e2.png";
import merchDirection from "@/assets/e4.png";
import editorialFrame from "@/assets/q4.png";
import typographyFrame from "@/assets/q7.png";
import sportsFrame from "@/assets/r4.png";
import broadcastFrame from "@/assets/r7.png";

export const archiveCategories = [
  "All",
  "Editorial",
  "Branding",
  "Social Media",
  "Packaging",
  "Typography",
  "Posters",
  "Experiments",
] as const;

export type ArchiveFilter = (typeof archiveCategories)[number];
export type ArchiveCategory = Exclude<ArchiveFilter, "All">;

export type ArchiveItem = {
  id: string;
  title: string;
  category: ArchiveCategory;
  year: string;
  image: string;
  tags: string[];
};

export const archiveItems: ArchiveItem[] = [
  {
    id: "esummit-identity-system",
    title: "E-Summit Identity System",
    category: "Branding",
    year: "2026",
    image: esummitIdentity,
    tags: ["Identity", "Event", "System"],
  },
  {
    id: "festival-cover-layout",
    title: "Festival Cover Layout",
    category: "Posters",
    year: "2026",
    image: esummitCover,
    tags: ["Poster", "Campaign", "Composition"],
  },
  {
    id: "launch-social-creative",
    title: "Launch Social Creative",
    category: "Social Media",
    year: "2026",
    image: socialCreative,
    tags: ["Social", "Campaign", "Storytelling"],
  },
  {
    id: "lahori-packaging-study",
    title: "Lahori Packaging Study",
    category: "Packaging",
    year: "2025",
    image: packagingStudy,
    tags: ["Packaging", "Branding", "Retail"],
  },
  {
    id: "merch-direction",
    title: "Merch Direction",
    category: "Experiments",
    year: "2026",
    image: merchDirection,
    tags: ["Merch", "Graphic", "Exploration"],
  },
  {
    id: "cec-identity-panel",
    title: "CEC Identity Panel",
    category: "Branding",
    year: "2025",
    image: brandCec,
    tags: ["Identity", "Layout", "Visual System"],
  },
  {
    id: "editorial-colour-study",
    title: "Editorial Colour Study",
    category: "Editorial",
    year: "2025",
    image: editorialFrame,
    tags: ["Editorial", "Narrative", "Visual Pacing"],
  },
  {
    id: "type-led-sequence",
    title: "Type-led Sequence",
    category: "Typography",
    year: "2025",
    image: typographyFrame,
    tags: ["Typography", "Campaign", "Hierarchy"],
  },
  {
    id: "sports-story-frame",
    title: "Sports Story Frame",
    category: "Editorial",
    year: "2025",
    image: sportsFrame,
    tags: ["Sports", "Editorial", "Information Design"],
  },
  {
    id: "broadcast-energy-study",
    title: "Broadcast Energy Study",
    category: "Experiments",
    year: "2025",
    image: broadcastFrame,
    tags: ["Motion Still", "Sports", "Visual Experiment"],
  },
];
