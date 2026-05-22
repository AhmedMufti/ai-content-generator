import { getRatioDims } from "./constants";

/**
 * Royalty-free sample clips (Google's public "gtv-videos" bucket) used to stand
 * in for generated videos. Native <video> loads these, so no next/image config
 * is needed for them.
 */
const SAMPLE_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
];

function slugify(text) {
  const slug = String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);
  return slug || "artwork";
}

/** Deterministic placeholder image URL (Lorem Picsum) for a given seed. */
function pictureFor(seed, width, height) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

/**
 * Build a batch of generated media descriptors.
 *
 * @param {object} options
 * @param {"image"|"video"} options.type   Media kind to produce.
 * @param {number} options.count           How many items.
 * @param {string} options.prompt          User prompt (used for alt text + seed).
 * @param {string} options.ratio           Aspect-ratio value, e.g. "1:1".
 * @param {string} options.salt            Varies output between requests; pass a
 *                                          fixed value for deterministic results.
 * @returns {Array<object>} media items consumed by <ResultGrid />.
 */
export function buildMediaItems({
  type = "image",
  count = 4,
  prompt = "",
  ratio = "1:1",
  salt = "default",
}) {
  const { w, h } = getRatioDims(ratio);
  const base = slugify(prompt);
  const trimmedPrompt = prompt.trim();

  return Array.from({ length: count }, (_, index) => {
    const seed = `${base}-${salt}-${index}`;
    const poster = pictureFor(seed, w, h);

    if (type === "video") {
      return {
        id: seed,
        type: "video",
        src: SAMPLE_VIDEOS[index % SAMPLE_VIDEOS.length],
        poster,
        alt: trimmedPrompt
          ? `Generated video preview for "${trimmedPrompt}"`
          : `Generated video preview ${index + 1}`,
        width: w,
        height: h,
        ratio,
      };
    }

    return {
      id: seed,
      type: "image",
      src: poster,
      poster: null,
      alt: trimmedPrompt
        ? `AI generated image: ${trimmedPrompt}`
        : `Generated artwork ${index + 1}`,
      width: w,
      height: h,
      ratio,
    };
  });
}
