# Figma course library implementation

Reference: [Graphnotes library, node 52:1271](https://www.figma.com/design/jVpDNYnQz5CSTHXOggHE0Y/Untitled?node-id=52-1271).

Follow-up concept: [Course list states, page 0:1](https://www.figma.com/design/tGFpPtcYyuDZvJI2urUFLv/Untitled?node-id=0-1), frames 1:291 (not started) and 1:2 (started). New courses show their curriculum-derived duration as `01h 45m`; this becomes Continue after a learner starts. Comments 2020338427 and 2020338376 both request a smoothly blinking countdown indicator. The dot uses a gentle 2.4-second opacity cycle, can be paused with mouse or keyboard, and stays still under reduced motion. Pausing the decorative pulse does not stop the actual release countdown. All eleven exported assets were downloaded and confirmed byte-identical to the existing local assets.

The subsequent request for an automatically changing course cover replaces the static Data Visualization SVG with the shared `OverviewChart` in preview mode. It cycles through columns, line, area, and lollipop every three seconds using the overview's dissolve/dust transitions. The cover keeps its 16:9 frame and omits chart titles, axis labels, and individual-point controls. A small pause/resume control appears on hover or keyboard focus and remains available on touch screens. Rotation stops while the cover is outside the viewport, the tab is hidden, or reduced motion is enabled. The original SVG remains in the asset folder as reference material.

The index follows the reference's centered 1024-wide composition, 24-unit gap, compact course footers, live SUSE Mono countdown with release dot, and full creator panel. Its shared catalog, conditional search/filter controls, course routes, local progress, and email-draft request flow remain functional. The previous library metadata/progress line and minimal creator footer were replaced by the supplied design.

On smaller screens the catalog becomes one column, titles/secondary details wrap, the creator pattern moves below the profile, and the three equal-width links stack. The page grows naturally when its content exceeds the viewport.

## Assets

All reference assets were downloaded from the Figma MCP exports into `apps/web/public/images/library/`; no temporary asset URLs are used at runtime. SVG roots remain unchanged. Images retain their original aspect ratio.

| Figma layer | Local asset | Desktop geometry |
| --- | --- | --- |
| 52:1282 logo | graphnotes.svg | 168 × 33.1875 |
| 52:1298 request icon | plus.svg | 16 × 18 |
| 52:1307 appearance icon | appearance.svg | 16 × 18 |
| 52:1603 chart cover | data-visualization.svg | 498 × 279.125 |
| 52:1621 Continue arrow | arrow-right.svg | 16 × 16 |
| 52:1857 release dot | release-dot.svg | 18 × 18 |
| 52:1640 portrait | creator.png | 96 × 96 |
| 52:1649 contribution pattern | contribution-pattern.svg | 256 × 67.4688 |
| 52:1832 Portfolio icon | portfolio.svg | 16 × 18 |
| 52:1839 X icon | x-twitter.svg | 16 × 18 |
| 52:1847 LinkedIn icon | linkedin.svg | 16 × 18 |

Inter Display Medium and SUSE Mono SemiBold are served locally from `src/fonts`, alongside their open-font licenses. Existing Inter and Inter Display SemiBold remain in use. Astryx supplies the controls, stacks, cards, avatar, dialog, and themes. Theme-specific icon filters preserve readability in dark mode without altering exported SVGs.

## Verification

Reviewed the built page in Ego Browser at 320, 390, 768, 1024, 1440, and the reference's 2242 × 1310 size, including default, sepia, and dark appearances. At the reference size the content begins at x=609, cards are 500 × 346.8125, and the creator panel is 1024 × 233, matching the supplied layout within fractional-pixel rounding. All static images loaded with the geometry listed above. Continue resumes the saved lesson; the request selector generates the intended email draft; creator links retain their supplied destinations. Test progress and theme were restored afterwards.

Production build, TypeScript, all 35 existing tests (194 assertions), Astryx doctor (26 passes, no warnings or failures), and whitespace checks passed. The Taste standalone checker remains unavailable on this machine as recorded in [course-library-validation.md](course-library-validation.md); visual verification for this change used Ego Browser.
