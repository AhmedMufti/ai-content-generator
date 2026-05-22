import { THEME_STORAGE_KEY } from "@/lib/theme";

/**
 * Synchronous, render-blocking script injected at the top of <body>. It applies
 * the saved (or system) theme to <html> before first paint, preventing the
 * light/dark "flash of incorrect theme" on load.
 */
const script = `
(function () {
  try {
    var key = ${JSON.stringify(THEME_STORAGE_KEY)};
    var stored = localStorage.getItem(key);
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
