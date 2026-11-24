import { Theme, defineTheme } from "@astryxdesign/core/theme";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ReactNode } from "react";

import { defaultThemeSlug, themes } from "../astryx-themes";

const fieldGuideTheme = defineTheme({
  name: "field-guide",
  extends: themes[defaultThemeSlug],
  typography: {
    scale: { base: 16, ratio: 1.2 },
    body: { family: "Inter", fallbacks: "system-ui, sans-serif" },
    heading: { family: "Inter Display", fallbacks: "Inter, system-ui, sans-serif" },
  },
  color: { accent: ["#963f32", "#f4ad97"], neutralStyle: "neutral" },
  radius: { base: 5, multiplier: 1 },
  motion: { character: "expressive", tempo: 0.95 },
  tokens: {
    "--color-data-neutral": "light-dark(#667987, #8c939b)",
    "--color-data-categorical-teal": "light-dark(#007b80, #28b8b4)",
  },
  components: {
    "side-nav": {
      base: { minWidth: "calc(2 * var(--spacing-8))", scrollbarWidth: "thin", scrollbarColor: "color-mix(in srgb, var(--color-text-secondary) 16%, transparent) transparent" },
    },
    button: {
      base: { minHeight: "var(--spacing-10)", minWidth: "var(--spacing-10)" },
      "size:sm": { minHeight: "calc(var(--spacing-10) + var(--spacing-1))", minWidth: "calc(var(--spacing-10) + var(--spacing-1))" },
      "size:md": { minHeight: "calc(var(--spacing-10) + var(--spacing-1))", minWidth: "calc(var(--spacing-10) + var(--spacing-1))" },
      "size:lg": { minHeight: "calc(var(--spacing-10) + var(--spacing-1))", minWidth: "calc(var(--spacing-10) + var(--spacing-1))" },
    },
    "segmented-control": { base: { height: "auto", minHeight: "calc(var(--spacing-10) + var(--spacing-3))" } },
    "segmented-control-item": {
      base: { minHeight: "calc(var(--spacing-10) + var(--spacing-1))", whiteSpace: "normal", textAlign: "center" },
    },
    tab: { base: { minHeight: "calc(var(--spacing-10) + var(--spacing-1))" } },
    "tab-strip": { base: { minHeight: "calc(var(--spacing-10) + var(--spacing-1))" } },
    "text-input": { base: { minHeight: "calc(var(--spacing-10) + var(--spacing-1))" } },
    selector: { base: { minHeight: "calc(var(--spacing-10) + var(--spacing-1))" } },
    "side-nav-section": { base: { marginBlockStart: "var(--spacing-4)", paddingBlock: "0" } },
    "radio-list-item": { base: { minHeight: "calc(var(--spacing-10) + var(--spacing-1))", paddingBlock: "var(--spacing-2)" } },
    "side-nav-item": {
      base: {
        transitionProperty: "background-color, color",
        transitionDuration: "var(--duration-fast)",
        transitionTimingFunction: "var(--ease-standard)",
      },
      "size:md": { minHeight: "calc(var(--spacing-10) + var(--spacing-1))" },
      "size:sm": { minHeight: "calc(var(--spacing-10) + var(--spacing-1))", paddingInlineEnd: "var(--spacing-3)" },
      selected: {
        backgroundColor: "var(--color-accent-muted)",
        color: "var(--color-text-accent)",
      },
    },
  },
});

const sepiaTheme = defineTheme({
  name: "field-guide-sepia",
  extends: fieldGuideTheme,
  tokens: {
    "--color-background-body": "#f3e9da",
    "--color-background-surface": "#f8efdf",
    "--color-background-card": "#fcf3e6",
    "--color-background-muted": "#ede0cb",
    "--color-background-popover": "#fcf3e6",
    "--color-border": "#deccb3",
    "--color-text-primary": "#32281f",
    "--color-text-secondary": "#645345",
    "--color-accent": "#974232",
    "--color-text-accent": "#82392c",
    "--color-on-accent": "#fff8ed",
    "--color-accent-muted": "#f1dcc7",
  },
});

export function useAppearance() {
  const { theme, setTheme } = useTheme();
  const appearance = theme === "sepia" || theme === "dark" ? theme : "light";
  return { appearance, setAppearance: setTheme };
}

function AstryxTheme({ children }: { children: ReactNode }) {
  const { appearance } = useAppearance();
  return (
    <Theme theme={appearance === "sepia" ? sepiaTheme : fieldGuideTheme} mode={appearance === "dark" ? "dark" : "light"}>
      {children}
    </Theme>
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      themes={["light", "sepia", "dark"]}
      value={{ light: "light", sepia: "theme-sepia", dark: "dark" }}
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="vite-ui-theme"
    >
      <AstryxTheme>{children}</AstryxTheme>
    </NextThemesProvider>
  );
}
