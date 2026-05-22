import { STYLE_PRESETS } from "@/lib/constants";

/**
 * Single-select style presets shown as toggleable chips. Selecting the active
 * chip again clears the selection.
 */
export function StyleChips({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Style preset">
      {STYLE_PRESETS.map((preset) => {
        const isActive = preset === value;
        return (
          <button
            key={preset}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(isActive ? "" : preset)}
            className={[
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200 cursor-pointer",
              isActive
                ? "border-accent bg-accent text-accent-contrast"
                : "border-border bg-surface text-muted hover:text-foreground hover:border-accent/50",
            ].join(" ")}
          >
            {preset}
          </button>
        );
      })}
    </div>
  );
}
