"use client";

import { IconButton } from "@/components/ui/IconButton";
import { Icon } from "@/components/ui/Icon";
import { useTheme } from "./ThemeProvider";

/**
 * Light/dark switch. Icon visibility is driven by the `.dark` class (CSS), not
 * React state, so the correct icon shows on first paint with no hydration flash.
 */
export function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <IconButton
      label="Toggle dark mode"
      onClick={toggleTheme}
      className="border border-border bg-surface/60"
    >
      <Icon name="moon" size={18} className="dark:hidden" />
      <Icon name="sun" size={18} className="hidden dark:block" />
    </IconButton>
  );
}
