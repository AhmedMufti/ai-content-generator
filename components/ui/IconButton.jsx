/**
 * Square, icon-only button. `label` is required and becomes the accessible name
 * (aria-label) since there is no visible text.
 */
export function IconButton({ label, className = "", children, ...rest }) {
  const classes = [
    "inline-flex items-center justify-center rounded-full text-muted",
    "transition-colors duration-200 hover:text-foreground hover:bg-surface-muted",
    "disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
    "h-10 w-10",
    className,
  ].join(" ");

  return (
    <button type="button" aria-label={label} title={label} className={classes} {...rest}>
      {children}
    </button>
  );
}
