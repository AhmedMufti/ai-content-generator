import { Icon } from "@/components/ui/Icon";

/**
 * Compact, pill-shaped dropdown built on a native <select> for full keyboard
 * and screen-reader support. An optional `prefix` renders a static label inside
 * the pill (e.g. "Model:").
 */
export function OptionSelect({ id, label, prefix, value, onChange, options }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
      {prefix && <span className="text-muted">{prefix}</span>}
      <span className="relative inline-flex items-center">
        <select
          id={id}
          aria-label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="cursor-pointer appearance-none bg-transparent pr-5 font-medium text-foreground focus:outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          size={14}
          className="pointer-events-none absolute right-0 text-muted"
        />
      </span>
    </div>
  );
}
