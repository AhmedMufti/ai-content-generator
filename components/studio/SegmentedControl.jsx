/**
 * Accessible two-or-more option toggle (used for Image / Video mode).
 * Implemented as a radiogroup so keyboard and screen-reader users get correct
 * semantics, with a sliding "pill" highlight for the active option.
 */
export function SegmentedControl({ options, value, onChange, ariaLabel }) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="grid grid-cols-2 gap-1 rounded-full border border-border bg-surface-muted p-1"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={[
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-surface text-foreground shadow-sm"
                : "text-muted hover:text-foreground",
            ].join(" ")}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
