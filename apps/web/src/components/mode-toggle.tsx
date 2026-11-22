import { IconButton } from "@astryxdesign/core/IconButton";
import { Popover } from "@astryxdesign/core/Popover";
import { SegmentedControl, SegmentedControlItem } from "@astryxdesign/core/SegmentedControl";
import { BookOpen, Moon, Sun } from "reicon-react";

import { useAppearance } from "@/components/theme-provider";

export function AppearanceTabs() {
  const { appearance, setAppearance } = useAppearance();

  return (
    <SegmentedControl label="Appearance" value={appearance} onChange={setAppearance} size="md" className="course-appearance">
      <SegmentedControlItem label="Default" value="light" icon={<Sun size={15} aria-hidden="true" />} />
      <SegmentedControlItem label="Sepia" value="sepia" icon={<BookOpen size={15} aria-hidden="true" />} />
      <SegmentedControlItem label="Dark" value="dark" icon={<Moon size={15} aria-hidden="true" />} />
    </SegmentedControl>
  );
}

export function ModeToggle() {
  const { appearance } = useAppearance();
  const Icon = appearance === "dark" ? Moon : appearance === "sepia" ? BookOpen : Sun;

  return (
    <Popover label="Appearance" placement="above" content={<AppearanceTabs />} isModal={false} padding={1.5}>
      <IconButton label="Appearance" icon={<Icon size={17} aria-hidden="true" />} variant="ghost" />
    </Popover>
  );
}
