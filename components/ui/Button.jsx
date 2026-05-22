const VARIANTS = {
  accent:
    "bg-accent text-accent-contrast hover:bg-accent-strong shadow-sm shadow-black/10",
  soft: "bg-surface text-foreground hover:bg-surface-muted border border-border",
  ghost: "text-muted hover:text-foreground hover:bg-surface-muted",
};

const SIZES = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
};

/**
 * App-wide button. Renders as <button> by default; pass `as="a"` (or any tag)
 * for link-styled buttons. Keeps focus/disabled/transition behavior in one place.
 */
export function Button({
  as: Tag = "button",
  variant = "accent",
  size = "md",
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
    "cursor-pointer",
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
