import { Theme } from "@astryxdesign/core/theme";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ComponentProps, ReactNode } from "react";

import { defaultThemeSlug, themes } from "../astryx-themes";

function AstryxTheme({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "light" || resolvedTheme === "dark" ? resolvedTheme : "system";

  return <Theme theme={themes[defaultThemeSlug]} mode={mode}>{children}</Theme>;
}

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <AstryxTheme>{children}</AstryxTheme>
    </NextThemesProvider>
  );
}

export { useTheme };
