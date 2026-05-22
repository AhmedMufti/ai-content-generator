"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./Collapsible.module.css";

/**
 * Reusable disclosure section (used for "Advance" and "Styles"). Wires up the
 * button/region aria relationship and animates open/close smoothly. When closed
 * the content is marked `inert` so it stays out of the tab order and a11y tree.
 */
export function Collapsible({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const regionId = useId();

  return (
    <div className="rounded-2xl border border-border bg-surface">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-foreground"
      >
        {title}
        <Icon
          name="chevronDown"
          size={16}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>
      <div
        id={regionId}
        className={`${styles.region} ${open ? styles.regionOpen : ""}`}
      >
        <div className={styles.regionInner} inert={!open ? true : undefined}>
          <div className="px-4 pb-4 pt-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
