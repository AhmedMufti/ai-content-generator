"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NAV_ITEMS } from "@/lib/constants";
import styles from "./Header.module.css";

// Static usage figure for the demo credits bar.
const CREDITS_USED = 26;

function PrimaryNav() {
  const [active, setActive] = useState("image");

  return (
    <nav aria-label="Primary" className="flex w-full items-center justify-between">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            type="button"
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            title={item.label}
            onClick={() => setActive(item.id)}
            className={`${styles.navButton} ${isActive ? styles.navButtonActive : ""}`}
          >
            <Icon name={item.icon} size={20} />
          </button>
        );
      })}
    </nav>
  );
}

export function Header() {
  return (
    <header className="relative flex min-h-16 items-center justify-between gap-4 py-3">
      {/* Brand */}
      <a
        href="#"
        className="flex shrink-0 items-center gap-2 text-foreground"
        aria-label="Fluxel Studio home"
      >
        <Icon name="logo" size={30} />
        <span className="sr-only">Fluxel Studio</span>
      </a>

      {/* Center: credits bar + primary navigation.
          Absolutely centered on the page so the cluster stays at the true
          midpoint regardless of how wide the left/right groups are. */}
      <div className="absolute left-1/2 top-1/2 hidden w-[360px] max-w-[40vw] -translate-x-1/2 -translate-y-1/2 flex-col items-stretch gap-2 lg:flex">
        <div
          className="w-full"
          role="progressbar"
          aria-label="Monthly credits used"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={CREDITS_USED}
        >
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${CREDITS_USED}%` }} />
          </div>
        </div>
        <PrimaryNav />
      </div>

      {/* Right: actions */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        {/* Hidden on small screens via the wrapper (not the button) to avoid the
            inline-flex/hidden display conflict on the Button itself. */}
        <div className="hidden items-center gap-2 sm:flex">
          <Button as="a" href="#" variant="soft" size="sm">
            <Icon name="gallery" size={16} />
            Gallery
          </Button>
          <Button as="a" href="#" variant="soft" size="sm">
            <Icon name="support" size={16} />
            Support
          </Button>
        </div>
        <ThemeToggle />
        <button
          type="button"
          aria-label="Account"
          className="ml-0.5 overflow-hidden rounded-full border border-border"
        >
          <Image
            src="https://picsum.photos/seed/studio-user/72/72"
            alt="Your profile"
            width={36}
            height={36}
            className="h-9 w-9 object-cover"
          />
        </button>
      </div>
    </header>
  );
}
