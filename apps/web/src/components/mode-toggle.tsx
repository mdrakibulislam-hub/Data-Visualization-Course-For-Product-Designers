import { useAppShellMobile } from "@astryxdesign/core/AppShell";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Popover } from "@astryxdesign/core/Popover";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { BookOpen, Moon, Sun } from "reicon-react";

import { useAppearance } from "@/components/theme-provider";

export function AppearanceTabs({ compact = false }: { compact?: boolean }) {
  const { appearance, setAppearance } = useAppearance();

  return (
    <SegmentedControl label="Appearance" value={appearance} onChange={setAppearance} size={compact ? "sm" : "md"} layout={compact ? "fill" : "hug"}>
      <SegmentedControlItem label="Default" value="light" icon={compact ? undefined : <Sun size={15} aria-hidden="true" />} />
      <SegmentedControlItem label="Sepia" value="sepia" icon={compact ? undefined : <BookOpen size={15} aria-hidden="true" />} />
      <SegmentedControlItem label="Dark" value="dark" icon={compact ? undefined : <Moon size={15} aria-hidden="true" />} />
    </SegmentedControl>
  );
}

export function ModeToggle({ isCollapsed }: { isCollapsed: boolean }) {
  const { isMobile } = useAppShellMobile();
  const { appearance } = useAppearance();
  const Icon = appearance === "dark" ? Moon : appearance === "sepia" ? BookOpen : Sun;

  if (!isMobile && !isCollapsed) return <AppearanceTabs compact />;

  return (
    <Popover label="Appearance" placement={isMobile ? "below" : "end"} alignment={isMobile ? "end" : "center"} content={<AppearanceTabs />} isModal={false} padding={1.5}>
      <IconButton label="Appearance" icon={<Icon size={17} aria-hidden="true" />} variant="ghost" />
    </Popover>
  );
}
