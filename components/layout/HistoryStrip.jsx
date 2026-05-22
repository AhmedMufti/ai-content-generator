import Image from "next/image";
import { HISTORY_ITEMS } from "@/lib/mockData";
import styles from "./HistoryStrip.module.css";

/**
 * Horizontally scrollable strip of recent generations. The overflow is scoped
 * to this strip (overflow-x-auto), so it never causes page-level scrolling.
 */
export function HistoryStrip() {
  return (
    <section
      aria-label="Generation history"
      className="flex items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface/70 p-3"
    >
      <div className="flex shrink-0 flex-col pr-2">
        <h2 className="text-sm font-semibold leading-tight">History</h2>
        <button
          type="button"
          className="text-left text-xs text-accent transition-colors hover:text-accent-strong"
        >
          View All
        </button>
      </div>

      <div className="h-9 w-px shrink-0 bg-border" aria-hidden="true" />

      <ul className="scrollbar-soft flex flex-1 items-center gap-2.5 overflow-x-auto pb-1">
        {HISTORY_ITEMS.map((item) => (
          <li key={item.id}>
            <button type="button" className={styles.thumb} aria-label={`Open ${item.alt}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
