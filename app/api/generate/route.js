import { MAX_GENERATION_COUNT } from "@/lib/constants";
import { buildMediaItems } from "@/lib/media";

// Always run on request: each call returns a fresh, randomized batch.
export const dynamic = "force-dynamic";

const DEFAULT_COUNT = 4;

function clampCount(value) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return DEFAULT_COUNT;
  return Math.min(Math.max(parsed, 1), MAX_GENERATION_COUNT);
}

function normalize({ type, count, prompt, ratio }) {
  return {
    type: type === "video" ? "video" : "image",
    count: clampCount(count),
    prompt: String(prompt ?? "").slice(0, 400),
    ratio: String(ratio ?? "1:1"),
  };
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Shared core for both verbs: simulate latency, then return media items. */
async function generate(params) {
  const options = normalize(params);

  // Pretend a model is working so the client can exercise its loading UI.
  await delay(900 + Math.random() * 700);

  const salt = Math.random().toString(36).slice(2, 8);
  const items = buildMediaItems({ ...options, salt });

  return Response.json({
    items,
    meta: { ...options, generatedAt: new Date().toISOString() },
  });
}

// GET — convenient for manual testing in the browser, e.g.
// /api/generate?type=image&count=4&ratio=1:1&prompt=sunset
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return generate({
    type: searchParams.get("type"),
    count: searchParams.get("count"),
    prompt: searchParams.get("prompt"),
    ratio: searchParams.get("ratio"),
  });
}

// POST — the primary endpoint the UI calls, with a JSON body.
export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // Tolerate empty/invalid bodies and fall back to defaults.
  }
  return generate(body);
}
