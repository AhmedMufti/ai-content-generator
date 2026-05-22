/**
 * Lightweight inline-SVG icon set. Inlining keeps the icons themeable via
 * `currentColor`, tree-shakeable, and free of an external icon dependency.
 *
 * Usage: <Icon name="wand" /> or <Icon name="moon" size={18} />
 */

const paths = {
  logo: (
    <path
      d="M7 4h10v3H10v3.5h6v3h-6V20H7z"
      fill="currentColor"
      stroke="none"
    />
  ),
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4.5 17 4.5-4 4 3.2 3-2.7 3.5 3" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2.5" />
      <path d="m15 10 6-3v10l-6-3z" />
    </>
  ),
  wand: (
    <>
      <path d="m5 19 9-9" />
      <path d="m13 5 1 1m4 4 1 1m-4-6 .8 2.2L18 7l-1.8.8L15.4 10l-.8-2.2L12.4 7l1.8-.8z" />
    </>
  ),
  folder: (
    <path d="M4 7a2 2 0 0 1 2-2h3.2a2 2 0 0 1 1.4.6L12 7h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
  ),
  gallery: (
    <>
      <rect x="3.5" y="3.5" width="11" height="11" rx="2" />
      <path d="M17 8.5h1.5a2 2 0 0 1 2 2V19a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-1.5" />
    </>
  ),
  support: (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="3.5" height="6" rx="1.5" />
      <rect x="17.5" y="13" width="3.5" height="6" rx="1.5" />
      <path d="M20 19a3 3 0 0 1-3 3h-3" />
    </>
  ),
  moon: <path d="M20 13.5A8 8 0 1 1 10.5 4 6.2 6.2 0 0 0 20 13.5z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" />
    </>
  ),
  sparkle: (
    <path d="M12 3.5l1.7 4.8 4.8 1.7-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7z" />
  ),
  chevronDown: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-3.2-3.2" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10" />
      <path d="m8 11 4 4 4-4" />
      <path d="M5 19h14" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-9.2-8.2A4.6 4.6 0 0 1 12 6.6 4.6 4.6 0 0 1 21.2 11.8C19 15.6 12 20 12 20z" />
  ),
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H15" />
    </>
  ),
  check: <path d="m5 12.5 4 4 10-10" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({ name, size = 22, className = "", strokeWidth = 1.7, ...rest }) {
  const content = paths[name];
  if (!content) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {content}
    </svg>
  );
}
