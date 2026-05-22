import { buildMediaItems } from "./media";

/** Thumbnails for the History strip under the header. */
export const HISTORY_ITEMS = [
  { id: "h1", seed: "aurora-portrait", alt: "Portrait in aurora light" },
  { id: "h2", seed: "mountain-dawn", alt: "Mountain range at dawn" },
  { id: "h3", seed: "still-life-bloom", alt: "Floral still life" },
  { id: "h4", seed: "paris-eiffel", alt: "Eiffel tower scene" },
  { id: "h5", seed: "golden-hour", alt: "Golden hour street" },
  { id: "h6", seed: "neon-city", alt: "Neon city at night" },
  { id: "h7", seed: "studio-cat", alt: "Studio pet portrait" },
  { id: "h8", seed: "abstract-form", alt: "Abstract sculptural form" },
].map((item) => ({
  ...item,
  src: `https://picsum.photos/seed/${item.seed}/120/120`,
}));

/** Pre-filled prompt so the studio mirrors the reference mockup on load. */
export const DEFAULT_PROMPT =
  "A professional portrait photograph of a 31-year-old redheaded woman with brown eyes and softly tousled auburn hair framing her face.";

/** The descriptive caption shown beside the results in the mockup. */
export const DEFAULT_DESCRIPTION =
  "A professional portrait photograph of a 31-year-old redheaded woman with brown eyes and softly tousled auburn hair framing her face. She is turned slightly toward the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater and gold earrings. The background is a soft expanse of muted gray and beige tones, suggesting a modern art gallery. The directional lighting is subtle and flattering.";

/**
 * Deterministic starter gallery (fixed salt) so server and client render the
 * same markup — no hydration mismatch — and the grid is populated immediately.
 */
export const DEFAULT_RESULTS = buildMediaItems({
  type: "image",
  count: 8,
  prompt: DEFAULT_PROMPT,
  ratio: "1:1",
  salt: "preview",
});
