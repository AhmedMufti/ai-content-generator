# Fluxel Studio — Responsive AI Content Generation

A responsive, production-quality implementation of an AI content‑generation studio,
built from the provided design mockup. Users write a prompt, choose whether they
want **images** or **videos**, tune a few options, and generate a gallery of
results from a built‑in dummy API.

> Submission for the Frontend Developer Technical Assessment.

## ✨ Highlights

- **Pixel-faithful UI** of the mockup: header with usage bar + icon nav, history
  strip, left control panel, prompt-details caption, and the results grid.
- **Fully responsive** from **320px → large desktops**, with **no horizontal
  scrolling** at any breakpoint (verified programmatically — see _Testing_).
- **Dummy generation API** (`/api/generate`) that returns images **or** videos
  with a simulated latency so the loading UI is real.
- **Dark mode** with no flash-of-incorrect-theme, persisted to `localStorage`
  and respecting the OS preference on first visit.
- **Accessible**: semantic landmarks, labelled controls, keyboard focus styles,
  `alt` text, a skip link, `aria` states, and `prefers-reduced-motion` support.
- **Performance-minded**: `next/image` optimization, memoized media cards,
  stable callbacks, container-query grid, and code-split client components.

## 🧱 Tech Stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | **Next.js 16** (App Router)                       |
| Language       | **JavaScript** (JSX)                              |
| Styling        | **Tailwind CSS v4** + **CSS Modules** (both used) |
| Fonts          | `next/font` (Geist)                               |
| Linting        | ESLint (`eslint-config-next`)                     |

## 🚀 Run locally

Requires **Node.js 18.18+** (developed on Node 24).

```bash
# 1. install dependencies
npm install

# 2. start the dev server
npm run dev
# open http://localhost:3000

# production build / serve
npm run build
npm run start

# lint
npm run lint
```

> **Network note:** generated media uses public placeholder services
> ([Lorem Picsum](https://picsum.photos) for images, Google's public sample
> bucket for videos), so an internet connection is needed to _display_ results.
> Allowed image hosts are whitelisted in `next.config.mjs` (`images.remotePatterns`).

## 🔌 Dummy API

`app/api/generate/route.js` is a Route Handler that returns generated media.

- **`POST /api/generate`** — primary endpoint used by the UI (JSON body).
- **`GET /api/generate`** — same logic, query‑string driven, handy for testing
  in the browser.

**Query / body parameters**

| Param           | Type                 | Default | Notes                          |
| --------------- | -------------------- | ------- | ------------------------------ |
| `type`          | `"image"` \| `"video"` | `image` | what to generate               |
| `count`         | number (1–8)         | `4`     | number of results              |
| `ratio`         | `"1:1"`, `"16:9"`, …  | `1:1`   | aspect ratio                   |
| `prompt`        | string               | `""`    | used for `alt` text + seeding  |
| `model`, `detail`, `negativePrompt` | mixed | —    | accepted (forwarded to body)   |

Try it:

```
http://localhost:3000/api/generate?type=image&count=4&ratio=16:9&prompt=mountain%20sunset
```

```jsonc
{
  "items": [
    {
      "id": "mountain-sunset-kwa3te-0",
      "type": "image",
      "src": "https://picsum.photos/seed/mountain-sunset-kwa3te-0/960/540",
      "alt": "AI generated image: mountain sunset",
      "width": 960, "height": 540, "ratio": "16:9"
    }
    /* … */
  ],
  "meta": { "type": "image", "count": 4, "ratio": "16:9", "prompt": "mountain sunset", "generatedAt": "…" }
}
```

The route is marked `dynamic = "force-dynamic"` and adds an artificial delay so
each call returns a fresh, randomized batch and the client can show its skeleton
loading state.

## 🗂️ Project structure

```
app/
  layout.js              # fonts, metadata, ThemeProvider + no-flash ThemeScript, skip link
  page.js                # page composition (Header → HistoryStrip → Studio)
  globals.css            # Tailwind v4 import, design tokens (light/dark), base styles
  api/generate/route.js  # dummy generation API (GET + POST)
components/
  layout/                # Header, HistoryStrip (+ CSS Modules)
  studio/                # ControlPanel, PromptInput, SegmentedControl, OptionSelect,
                         # Collapsible, StyleChips, ResultDescription, ResultGrid,
                         # MediaCard, Studio (orchestrator) (+ CSS Modules)
  theme/                 # ThemeProvider, ThemeToggle, ThemeScript
  ui/                    # reusable primitives: Button, IconButton, Icon, Spinner
lib/
  constants.js           # nav items, options, aspect ratios
  media.js               # builds media descriptors for the API
  mockData.js            # history thumbnails, default prompt/description/results
  useGeneration.js       # client hook: calls the API, tracks status
  theme.js               # shared theme storage key
screenshots/             # responsiveness evidence (light + dark, 320 → 1536)
```

## 🎨 Styling approach (Tailwind **and** CSS Modules)

Both are used intentionally, as required:

- **Tailwind v4** drives layout, spacing, and responsive utilities. Theme colors
  are CSS variables exposed to Tailwind via `@theme`, so the same tokens power
  both utilities (`bg-surface`, `text-muted`) and module files.
- **CSS Modules** own component-scoped visuals and animations that read better as
  real CSS: `Header.module.css` (animated usage bar), `Collapsible.module.css`
  (smooth `grid-template-rows` expand), `MediaCard.module.css` (shimmer skeleton,
  hover zoom, overlay), `ResultGrid.module.css`, `ControlPanel.module.css`,
  `HistoryStrip.module.css`.

**Dark mode** is class-based: a tiny render-blocking script applies the saved
theme to `<html>` before paint (no flash), and Tailwind's `dark:` variant is
redefined to follow the `.dark` class (`@custom-variant`).

## ♿ Accessibility & ⚡ performance

- Landmarks (`header`, `main`, `aside`, `section`, `figure`), a **skip link**,
  and labelled form controls (native `<select>`, labelled `<textarea>`).
- Icon-only buttons have `aria-label`s; toggles expose `aria-checked` /
  `aria-pressed` / `aria-expanded`; collapsed sections are `inert`.
- Visible keyboard focus, readable contrast in both themes, and
  `prefers-reduced-motion` disables animations.
- `next/image` for all imagery (lazy by default, `priority` for the first row);
  `MediaCard` is `React.memo`'d and the studio uses stable `useCallback`
  handlers to avoid unnecessary re-renders.
- The results grid uses **CSS container queries**, so columns adapt to the panel
  width rather than the viewport — robust regardless of the sidebar.

## 🧪 Testing & responsiveness

Responsiveness was verified across breakpoints (Chromium via Playwright), and
**no horizontal scrolling** was confirmed at every size by asserting
`scrollWidth === clientWidth`:

| Breakpoint     | 320 (mobile) | 768 (tablet) | 1280 (desktop) | 1536 (large) |
| -------------- | :----------: | :----------: | :------------: | :----------: |
| No h-scroll    |      ✅       |      ✅       |       ✅        |      ✅       |

Screenshots (light + dark) are in [`screenshots/`](./screenshots). The Generate
flow, Image/Video switch, and theme toggle were exercised end-to-end against the
production build.

## 📦 Notable decisions

- **App Router + JavaScript** per the brief; no TypeScript.
- The mockup's narrow description column is rendered as a **"Prompt details"**
  card above the results in the content area — cleaner and more responsive while
  preserving the content and hierarchy.
- Advanced controls (style preset, detail strength, negative prompt) are wired
  into the request body so nothing is dead UI.
- Placeholder media services keep the repo light; swapping in a real model is a
  one-file change in `app/api/generate/route.js`.
