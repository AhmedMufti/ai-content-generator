"use client";

import { useCallback, useRef, useState } from "react";
import { DEFAULT_PROMPT, DEFAULT_RESULTS } from "./mockData";

/**
 * Encapsulates calling the dummy generation API and tracking request state.
 * Keeping this in a hook keeps <Studio /> focused on composition and makes the
 * data-fetching logic reusable/testable on its own.
 *
 * @returns {{
 *   results: Array<object>,
 *   status: "idle" | "loading" | "error",
 *   lastCount: number,
 *   lastRatio: string,
 *   generate: (settings: object) => Promise<void>,
 * }}
 */
export function useGeneration() {
  const [results, setResults] = useState(DEFAULT_RESULTS);
  const [status, setStatus] = useState("idle");
  const [lastCount, setLastCount] = useState(DEFAULT_RESULTS.length);
  const [lastRatio, setLastRatio] = useState("1:1");
  const abortRef = useRef(null);

  const generate = useCallback(async (settings) => {
    // Cancel any in-flight request so rapid clicks don't race.
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setLastCount(settings.count);
    setLastRatio(settings.ratio);

    // Fold the chosen style preset into the prompt sent to the model.
    const basePrompt = settings.prompt.trim() || DEFAULT_PROMPT;
    const prompt = settings.style ? `${basePrompt}, ${settings.style} style` : basePrompt;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          type: settings.mode,
          count: settings.count,
          ratio: settings.ratio,
          prompt,
          model: settings.model,
          detail: settings.detail,
          negativePrompt: settings.negativePrompt,
        }),
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      const data = await response.json();
      setResults(data.items);
      setStatus("idle");
    } catch (error) {
      if (error.name === "AbortError") return; // superseded by a newer request
      setStatus("error");
    }
  }, []);

  return { results, status, lastCount, lastRatio, generate };
}
