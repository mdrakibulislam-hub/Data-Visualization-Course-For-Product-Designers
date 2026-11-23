# Chart lab audit findings

Reviewed 23 November 2026 in the shared Chromium preview at 1440 × 900 CSS pixels and 390 × 844 CSS pixels. Desktop PNGs render at 1280 pixels wide; annotation coordinates account for this 8/9 scale. The long catalog and atlas pages were captured in consecutive viewport tiles. Repeated fixed desktop sidebars were removed below their first viewport. **Baseline capture limit:** the original mobile catalog and atlas tiles missed 49-pixel strips beneath the sticky header at each seam; these strips are explicitly marked as capture gaps, rather than showing a repeated product header. The cited findings lie outside those gaps. Final after-captures use overlapping scroll steps and contain the complete page content.

## LAB01 · Medium · Keep navigation anchored when opening the catalog

**Observed:** Clicking “Browse experiments” changes the content width from 880 to 1024 CSS pixels on desktop, moving the page title and tabs 80 pixels to the left. **Why it matters:** A local content change relocates the primary navigation and interrupts orientation. **Recommended change:** Use one maximum page width for both experiment and catalog. **Resolved:** Removed the catalog-specific maximum width; both now share `.lab-page`.

Evidence: [experiment](evidence/before/lab-experiment-desktop.png), [catalog marker](evidence/before/lab-catalog-desktop-annotated.png).

## LAB02 · Medium · Enlarge frequently used controls

**Observed:** On mobile, chart-view segments have a 24-pixel visible height, Browse experiments is 28 pixels tall, and tabs are 32 pixels tall; neighboring controls leave little tolerance. **Why it matters:** Learners must repeatedly switch chart views and may miss small touch targets. **Recommended change:** Use the shared control scale for primary navigation and view controls, with adequate target height and separation. **Resolution:** Removed small sizing from lab browsing and collection controls; the shared theme controls the target-height correction.

Evidence: [mobile controls marker](evidence/before/lab-experiment-mobile-annotated.png). Keyboard radio selection was available before this fix; this finding concerns target geometry, not keyboard absence.

## LAB03 · Low · Restore the section and item heading hierarchy

**Observed:** The experiment H2 and its chart H3 both render at 17 pixels; chart atlas item headings are forced down to 14 pixels. **Why it matters:** Readers cannot easily distinguish the experiment, its current display, and reference entries while scanning. **Recommended change:** Let semantic H2 and H3 use the shared Astryx type scale. **Resolved:** Removed the two local font-size overrides.

Evidence: [desktop heading marker](evidence/before/lab-experiment-desktop-annotated.png), [atlas item marker](evidence/before/lab-atlas-mobile-annotated.png).

## LAB04 · Medium · Group charts by the task they support

**Observed:** Histogram, density plot, and box-and-whisker plot appear under “Categorical”; pie and waffle charts appear under “Hierarchical.” Venn diagrams are also labeled hierarchical. **Why it matters:** These broad technical buckets mix distinct chart-selection tasks, so a beginner trying to show a distribution or shares of a whole has to translate the taxonomy first. **Recommended change:** Offer familiar task labels and separate distributions, parts of a whole, hierarchies, and relationships. **Resolved:** Updated the atlas families to task-based groups and labeled the filter “What do you want to show?” All 49 chart entries remain available.

Evidence: [full atlas with taxonomy markers](evidence/before/lab-atlas-mobile-annotated.png). Histogram begins at document y1771; the box plot and pie entries begin at y1949 and y2038.

## LAB05 · Low · Make empty filter results recoverable in one action

**Observed:** An unmatched search renders “0 charts” and “Try a different term or choose another family.” There is no combined reset action. **Why it matters:** When both search and category are active, learners have to work out which filter prevented results and clear them separately. **Recommended change:** Show a specific empty-state heading, a short instruction, and Clear filters. **Resolved:** Added an explicit reset that clears both search and family.

Evidence: [empty-state marker](evidence/before/lab-atlas-empty-mobile-annotated.png).

## Other reviewed behavior

Chart thumbnails derive from actual experiment data. Chart-view controls have accessible radio names, and tab controls expose selected state. The default experiment fits within the 390-pixel viewport without horizontal scrolling. Chart display contrast and shared chart value-table behavior are covered by the shared-system and lesson-reader audit.

## Verification after the fixes

- At 1440 pixels, clicking Browse experiments keeps the page title and tabs anchored at x403 before and after; the shared stable scrollbar gutter also removes the remaining scrollbar-induced shift.
- The heading hierarchy is 36/23/19 pixels for page, section and chart titles; every primary lab button, tab and view segment measured 44 pixels tall.
- Selecting Show distributions and searching for pie gives zero results; the Clear filters button restores all 49 entries, the empty search and All chart families. Histogram is labeled Show distributions; Pie chart is labeled Show parts of a whole.
- At both 320 and 390 pixels, Filter or highlight, Choose a color scale, and Summarize large datasets have no overlapping choices, no controls outside their group, and no horizontal page overflow. Their long labels wrap within an auto-height segmented group.
- All 20 experiments and 45 views passed source data checks for numeric extents, interval bounds, line label/value lengths and table row lengths. Browser checks covered shared/separate scales, retained missing values, and a cohort table with row and column headers.
- Full final desktop and mobile captures for experiment, catalog and atlas are in [evidence/after](evidence/after).
