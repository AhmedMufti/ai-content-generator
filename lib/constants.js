/**
 * Static configuration shared across the studio UI and the generation API.
 * Keeping these in one place avoids magic values scattered through components.
 */

export const NAV_ITEMS = [
  { id: "home", label: "Home", icon: "home" },
  { id: "image", label: "Images", icon: "image" },
  { id: "video", label: "Videos", icon: "video" },
  { id: "enhance", label: "Enhance", icon: "wand" },
  { id: "library", label: "Library", icon: "folder" },
];

export const GENERATION_MODES = [
  { value: "image", label: "Image" },
  { value: "video", label: "Video" },
];

export const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1", w: 640, h: 640 },
  { value: "4:3", label: "4:3", w: 720, h: 540 },
  { value: "16:9", label: "16:9", w: 960, h: 540 },
  { value: "3:4", label: "3:4", w: 540, h: 720 },
  { value: "9:16", label: "9:16", w: 540, h: 960 },
];

export const IMAGE_COUNTS = [
  { value: 2, label: "2 images" },
  { value: 4, label: "4 images" },
  { value: 6, label: "6 images" },
  { value: 8, label: "8 images" },
];

export const MODELS = [
  { value: "lumina-xl", label: "Lumina XL" },
  { value: "vivid-v2", label: "Vivid v2" },
  { value: "studio-pro", label: "Studio Pro" },
];

export const STYLE_PRESETS = [
  "Photorealistic",
  "Cinematic",
  "Watercolor",
  "3D Render",
  "Anime",
  "Minimal",
];

export const MAX_GENERATION_COUNT = 8;

const RATIO_LOOKUP = Object.fromEntries(
  ASPECT_RATIOS.map((ratio) => [ratio.value, ratio]),
);

/** Resolve an aspect-ratio value (e.g. "16:9") to its pixel dimensions. */
export function getRatioDims(value) {
  return RATIO_LOOKUP[value] ?? RATIO_LOOKUP["1:1"];
}
