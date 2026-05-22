import {
  ASPECT_RATIOS,
  GENERATION_MODES,
  IMAGE_COUNTS,
  MODELS,
} from "@/lib/constants";
import { SegmentedControl } from "./SegmentedControl";
import { PromptInput } from "./PromptInput";
import { OptionSelect } from "./OptionSelect";
import { Collapsible } from "./Collapsible";
import { StyleChips } from "./StyleChips";
import styles from "./ControlPanel.module.css";

/**
 * The left-hand studio controls. Fully controlled: every value comes from
 * `settings` and every edit is reported through a single `onChange(key, value)`
 * callback, which keeps the parent's state logic in one place.
 */
export function ControlPanel({ settings, onChange, onGenerate, loading }) {
  return (
    <aside className={styles.panel} aria-label="Generation settings">
      <SegmentedControl
        ariaLabel="Content type"
        options={GENERATION_MODES}
        value={settings.mode}
        onChange={(value) => onChange("mode", value)}
      />

      <PromptInput
        value={settings.prompt}
        onChange={(value) => onChange("prompt", value)}
        onGenerate={onGenerate}
        loading={loading}
        mode={settings.mode}
      />

      <div className={styles.optionsRow}>
        <OptionSelect
          id="count-select"
          label="Number of images"
          prefix="#"
          value={settings.count}
          onChange={(value) => onChange("count", Number(value))}
          options={IMAGE_COUNTS}
        />
        <OptionSelect
          id="ratio-select"
          label="Aspect ratio"
          value={settings.ratio}
          onChange={(value) => onChange("ratio", value)}
          options={ASPECT_RATIOS}
        />
        <OptionSelect
          id="model-select"
          label="Model"
          prefix="Model:"
          value={settings.model}
          onChange={(value) => onChange("model", value)}
          options={MODELS}
        />
      </div>

      <Collapsible title="Advance">
        <div className="space-y-4">
          <div>
            <div className={styles.rangeLabel}>
              <span>Detail strength</span>
              <span className="font-medium text-foreground">{settings.detail}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={settings.detail}
              onChange={(event) => onChange("detail", Number(event.target.value))}
              className={styles.range}
              aria-label="Detail strength"
            />
          </div>
          <div>
            <label
              htmlFor="negative-prompt"
              className="mb-1 block text-xs text-muted"
            >
              Negative prompt
            </label>
            <textarea
              id="negative-prompt"
              rows={2}
              value={settings.negativePrompt}
              onChange={(event) => onChange("negativePrompt", event.target.value)}
              placeholder="blurry, low quality, distorted…"
              className="w-full resize-none rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none"
            />
          </div>
        </div>
      </Collapsible>

      <Collapsible title="Styles">
        <StyleChips
          value={settings.style}
          onChange={(value) => onChange("style", value)}
        />
      </Collapsible>
    </aside>
  );
}
