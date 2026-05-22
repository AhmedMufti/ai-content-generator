"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Caption card describing the current result, with a copy-to-clipboard action. */
export function ResultDescription({ description }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(description);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context); fail silently.
    }
  };

  return (
    <section
      aria-label="Result description"
      className="rounded-[var(--radius-card)] border border-border bg-surface/70 p-4"
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Prompt details</h2>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-muted transition-colors hover:bg-surface-muted hover:text-foreground cursor-pointer"
        >
          <Icon name={copied ? "check" : "copy"} size={14} />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </section>
  );
}
