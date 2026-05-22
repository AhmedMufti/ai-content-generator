"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import styles from "./MediaCard.module.css";

// Each card spans roughly: ~45vw on phones, ~30vw on tablets, ~22vw on desktop.
const SIZES = "(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 45vw";

function aspectStyle(ratio) {
  const [w, h] = String(ratio || "1:1").split(":").map(Number);
  return { aspectRatio: `${w || 1} / ${h || 1}` };
}

function MediaCardComponent({ item, priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const isVideo = item.type === "video";

  return (
    <figure className={styles.card} style={aspectStyle(item.ratio)}>
      {!loaded && !playing && <span className={styles.skeleton} aria-hidden="true" />}

      {isVideo && playing ? (
        <video
          className={styles.video}
          src={item.src}
          poster={item.poster ?? undefined}
          controls
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Image
          src={isVideo ? item.poster : item.src}
          alt={item.alt}
          fill
          sizes={SIZES}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`${styles.media} ${loaded ? styles.mediaLoaded : ""}`}
        />
      )}

      {isVideo && !playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className={styles.playButton}
          aria-label={`Play ${item.alt}`}
        >
          <Icon name="play" size={22} />
        </button>
      )}

      {!playing && (
        <figcaption className={styles.overlay}>
          <span className="sr-only">{item.alt}</span>
          <button
            type="button"
            aria-pressed={liked}
            aria-label={liked ? "Remove from favorites" : "Add to favorites"}
            onClick={() => setLiked((value) => !value)}
            className={`${styles.actionButton} ${liked ? styles.actionButtonActive : ""}`}
          >
            <Icon name="heart" size={16} />
          </button>
          <a
            href={item.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open full size in new tab"
            className={styles.actionButton}
          >
            <Icon name="download" size={16} />
          </a>
        </figcaption>
      )}
    </figure>
  );
}

// Memoized: cards only re-render when their `item`/`priority` props change,
// not when sibling cards or unrelated studio state updates.
export const MediaCard = memo(MediaCardComponent);
