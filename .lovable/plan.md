## Understanding

You want a refactor, not a redesign. The current homepage collage, typography, colors, spacing, buttons, animations, and editorial feel stay untouched. The changes are structural: better nav behavior, a new Featured Project card, a unified reusable Product page with an embedded PDF viewer, a proper Brand system for E-Summit 2026 with sub-pages, a 2×2 Editorial grid with Instagram-style carousels, and an About section that absorbs the Toolkit.

## Sections I will modify

**Homepage (`src/routes/index.tsx`) — functionality only, no visual redesign**
- Sticky nav: make it truly sticky, add scroll-spy active highlight, update items to `Product / Brand / Editorial / About / Contact / Resume`.
- "See My Work" button → smooth scrolls to Product section anchor.
- Resume link → opens in new tab (`target="_blank" rel="noopener"`).
- Insert a new **Featured Project** section directly below the hero (above Product): large horizontal AZER card — thumbnail left, title + one-line description + category tags + "View Case Study" right; subtle lift on hover only. Uses the existing type scale, spacing, and border language so it reads as part of the site.
- Product section: card list stays visually the same; project set becomes AZER, PMX, TrustFix, IndusInd Protect, IRCTC AI Copilot (all link to the unified product page).
- Editorial section: replace the current masonry with a clean 2×2 grid of four equal cards: Labubu, Lahori Zeera, IPL Inside Out, Decode the Fault. Card styling reuses existing type/border tokens — no new visual language.
- About section: keep as-is, ensure Toolkit chips render inside About (not as a separate section).
- Contact/footer: verify links (email, phone, LinkedIn, Figma, Resume, Back to Top).

**Data layer (`src/lib/projects.ts`) — rewrite the registry**
- Three kinds keep existing shape but content changes:
  - `product`: AZER, PMX, TrustFix, IndusInd Protect, IRCTC AI Copilot. Each stores `role`, `timeline`, `team`, `tools`, `deliverable`, short `overview`, `pdfUrl` (placeholder path under `/public/decks/*.pdf`).
  - `brand`: single entry E-Summit 2026 with `system` cards (Brand Story, Logo, Typography, Colour Palette, Graphic Language) and `applications` (Digital Promotion, Website & Digital Experience, Event Experience), each with an unlimited image array.
  - `editorial`: Labubu, Lahori Zeera, IPL Inside Out, Decode the Fault, each with an ordered `carousel[]` and short overview.
- Prev/Next helpers scoped by kind so "Next Project" cycles within Product, "Next Campaign" within Editorial.

**Project pages — refactor to match the new spec**

`src/routes/projects.$slug.tsx` — becomes the **unified Product template only** (Brand and Editorial dispatch to their own routes below). Sections in order:
1. Breadcrumb (Home / Product / Title)
2. Hero (title, one-line description, tags)
3. "Project At a Glance" compact meta row: Role · Timeline · Team · Tools · Deliverable
4. Short editable overview (2–3 lines from data)
5. Embedded PDF viewer (full width, tall, with fullscreen button; no download UI — `#toolbar=0` and hide download control)
6. Next Project (cycles within Product kind)

Every Product page uses this same component; only data changes.

**Brand routes (new + refactor)**
- `src/routes/projects.$slug.tsx` dispatches: if `kind === "brand"`, render the E-Summit brand landing (Hero → Overview → Brand System cards → Brand Applications cards → Reflection).
- New sub-routes replacing the current gallery route:
  - `src/routes/projects.$slug_.system.$card.tsx` — one page per system card (story/logo/typography/colors/graphic-language).
  - `src/routes/projects.$slug_.applications.$area.tsx` — one page per application area (digital-promotion / website / event-experience), rendering the unlimited image grid with fullscreen lightbox.
- Delete the old `projects.$slug_.gallery.$category.tsx` (superseded).

**Editorial routes (refactor)**
- `src/routes/projects.$slug_.carousel.tsx` becomes the Campaign page: Hero → Instagram-style single-frame carousel (mouse drag, trackpad, touch, arrow keys, preserves upload order) → short overview → Next Campaign.
- When `kind === "editorial"`, the `/projects/$slug` route redirects to (or renders) this campaign layout so each editorial project has one page, not two.
- Delete `projects.$slug_.deck.tsx` (product PDF viewer replaces it; no separate deck route needed).

**Shared components (`src/components/project/`)**
- Add `Breadcrumb`, `AtAGlance`, `PdfViewer` (iframe + fullscreen toggle), `Lightbox` (fullscreen image viewer used by Brand application galleries), `InstaCarousel` (single-frame swipeable), `NextProject` / `NextCampaign`.
- Keep existing shared bits (`ProjectTopBar`, `MetaStrip`, `OverviewBlock`, etc.) but retire the ones no longer used (deck previews, brand-in-action grid) once the new pages are in.

## Sections I will NOT touch

- Hero (three-photo collage, typography, quote, buttons visual style, whitespace, colors).
- Design tokens in `src/styles.css`.
- Font imports and global head in `__root.tsx`.
- Reveal-on-scroll animation system.
- Overall editorial aesthetic, hover language, spacing scale.
- About narrative content and Experience timeline layout (only ensuring Toolkit lives inside About).
- Dark footer visual design.

## Placeholder policy

- PDFs: reference `/decks/{slug}.pdf` paths so you can drop files into `public/decks/` and they appear immediately. Viewer shows a friendly "PDF coming soon" state when the file is missing — no invented case-study copy.
- Brand application galleries and editorial carousels start with empty (or minimal reused) image arrays and are driven purely by the data file, so adding images is a one-line change.
- No fabricated research, personas, or metrics anywhere.

## Technical notes

- Scroll-spy: `IntersectionObserver` on section elements with matching `id`s, updating active nav item; smooth-scroll via `element.scrollIntoView({ behavior: "smooth" })`.
- PDF embed: `<iframe src="{pdf}#toolbar=0&navpanes=0" />` inside a container with a fullscreen button using the Fullscreen API. No download button rendered.
- Carousel: CSS scroll-snap track with one frame per viewport, arrow-key + pointer/touch drag handlers, order preserved from data array.
- Fullscreen image lightbox: portal-mounted, ESC/click-to-close, uses existing color tokens.
- Routing uses trailing-underscore convention (`projects.$slug_.system.$card.tsx`) so sub-pages opt out of the parent layout, consistent with what's already there.

Awaiting your approval before I touch any files.
