import { Icon } from "@/components/ui/Icon";
import { Spinner } from "@/components/ui/Spinner";

/**
 * The prompt text area with an inline Generate action. The textarea is labelled
 * (visually hidden) and the button reflects loading state for accessibility.
 */
export function PromptInput({ id = "prompt", value, onChange, onGenerate, loading, mode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-3 shadow-sm">
      <label htmlFor={id} className="sr-only">
        Describe what you want to generate
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        placeholder="Describe your imagination to be converted into a piece of art…"
        className="w-full resize-none bg-transparent text-sm leading-relaxed text-foreground placeholder:text-muted focus:outline-none"
      />
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-xs text-muted">{value.trim().length}/400</span>
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading}
          aria-busy={loading}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-medium text-accent-contrast shadow-sm transition-colors duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Spinner size={16} /> : <Icon name="sparkle" size={16} />}
          {loading ? "Generating…" : `Generate ${mode === "video" ? "Video" : "Image"}`}
        </button>
      </div>
    </div>
  );
}
