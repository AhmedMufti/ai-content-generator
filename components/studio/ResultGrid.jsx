import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { MediaCard } from "./MediaCard";
import styles from "./ResultGrid.module.css";

// Columns adapt to the grid's own container width (not the viewport), so the
// count is correct whether or not the description column is beside it.
const GRID_CLASS =
  "grid grid-cols-2 gap-3 sm:gap-4 @sm:grid-cols-3 @xl:grid-cols-4";

function aspectStyle(ratio) {
  const [w, h] = String(ratio || "1:1").split(":").map(Number);
  return { aspectRatio: `${w || 1} / ${h || 1}` };
}

function LoadingState({ count, ratio }) {
  return (
    <div className={GRID_CLASS} aria-busy="true" aria-label="Generating results">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeletonCard} style={aspectStyle(ratio)} />
      ))}
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface/70 p-10 text-center">
      <p className="text-sm text-muted">
        Something went wrong while generating. Please try again.
      </p>
      <Button variant="soft" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-dashed border-border bg-surface/50 p-12 text-center">
      <Icon name="sparkle" size={28} className="text-accent" />
      <p className="text-sm text-muted">
        Your generated content will appear here. Write a prompt and hit Generate.
      </p>
    </div>
  );
}

/**
 * Renders the generation results, switching between loading skeletons, an error
 * state, an empty state, and the media grid. Columns adapt to the container
 * width (container queries), independent of the page breakpoints.
 */
export function ResultGrid({ items, status, count, ratio, onRetry }) {
  if (status === "loading") return <LoadingState count={count} ratio={ratio} />;
  if (status === "error") return <ErrorState onRetry={onRetry} />;
  if (!items.length) return <EmptyState />;

  return (
    <div className={`${GRID_CLASS} ${styles.fadeIn}`}>
      {items.map((item, index) => (
        <MediaCard key={item.id} item={item} priority={index < 4} />
      ))}
    </div>
  );
}
