import { DropdownMenu, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@astryxdesign/core/DropdownMenu";
import { BookOpen, Moon, Sun } from "lucide-react";

import { useAppearance } from "@/components/theme-provider";

export function ModeToggle() {
  const { appearance, setAppearance } = useAppearance();
  const Icon = appearance === "dark" ? Moon : appearance === "sepia" ? BookOpen : Sun;

  return (
    <DropdownMenu
      button={{
        label: "Appearance",
        tooltip: "Appearance",
        icon: <Icon size={17} aria-hidden="true" />,
        isIconOnly: true,
        variant: "ghost",
      }}
      hasChevron={false}
      placement="above"
    >
      <DropdownMenuRadioGroup label="Appearance" value={appearance} onChange={setAppearance}>
        <DropdownMenuRadioItem label="Default" value="light" />
        <DropdownMenuRadioItem label="Sepia" value="sepia" />
        <DropdownMenuRadioItem label="Dark" value="dark" />
      </DropdownMenuRadioGroup>
    </DropdownMenu>
  );
}
