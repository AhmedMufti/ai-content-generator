"use client";

import { useCallback, useState } from "react";
import { ControlPanel } from "./ControlPanel";
import { ResultDescription } from "./ResultDescription";
import { ResultGrid } from "./ResultGrid";
import { useGeneration } from "@/lib/useGeneration";
import { DEFAULT_DESCRIPTION, DEFAULT_PROMPT } from "@/lib/mockData";

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

  return (
    <main
      id="main"
      className="mt-5 grid gap-5 lg:grid-cols-[minmax(300px,340px)_1fr]"
    >
      <ControlPanel
        settings={settings}
        onChange={handleChange}
        onGenerate={handleGenerate}
        loading={status === "loading"}
      />

      <div className="@container flex min-w-0 flex-col gap-4">
        <ResultDescription description={DEFAULT_DESCRIPTION} />
        <ResultGrid
          items={results}
          status={status}
          count={lastCount}
          ratio={lastRatio}
          onRetry={handleGenerate}
        />
      </div>
    </main>
  );
}
