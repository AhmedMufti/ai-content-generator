"use client";

import { useCallback, useState } from "react";
import { ControlPanel } from "./ControlPanel";
import { ResultDescription } from "./ResultDescription";
import { ResultGrid } from "./ResultGrid";
import { useGeneration } from "@/lib/useGeneration";
import { DEFAULT_DESCRIPTION, DEFAULT_PROMPT } from "@/lib/mockData";
import { MODELS } from "@/lib/constants";

const INITIAL_SETTINGS = {
  mode: "image",
  prompt: DEFAULT_PROMPT,
  count: 8,
  ratio: "1:1",
  model: "lumina-xl",
  style: "",
  detail: 60,
  negativePrompt: "",
};

/**
 * Top-level interactive area: owns the form settings, delegates fetching to
 * useGeneration, and lays out the controls beside the results. On <lg the two
 * stack vertically (controls first); from lg up they sit side by side.
 */
export function Studio() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const { results, status, lastCount, lastRatio, generate } = useGeneration();

  // Stable across renders, so memoized children don't re-render needlessly.
  const handleChange = useCallback((key, value) => {
    setSettings((previous) => ({ ...previous, [key]: value }));
  }, []);

  const handleGenerate = useCallback(() => generate(settings), [generate, settings]);

  const modelLabel =
    MODELS.find((model) => model.value === settings.model)?.label ?? settings.model;

  return (
    // Mirrors the mockup: controls | description | grid. From xl the right side
    // splits into a description column beside the grid; below xl they stack.
    <main
      id="main"
      className="mt-5 grid gap-5 lg:grid-cols-[minmax(280px,320px)_1fr]"
    >
      <ControlPanel
        settings={settings}
        onChange={handleChange}
        onGenerate={handleGenerate}
        loading={status === "loading"}
      />

      <div className="flex min-w-0 flex-col gap-4 xl:flex-row xl:gap-5">
        <ResultDescription
          description={DEFAULT_DESCRIPTION}
          model={modelLabel}
          className="xl:w-52 xl:shrink-0"
        />
        <div className="@container min-w-0 flex-1">
          <ResultGrid
            items={results}
            status={status}
            count={lastCount}
            ratio={lastRatio}
            onRetry={handleGenerate}
          />
        </div>
      </div>
    </main>
  );
}
