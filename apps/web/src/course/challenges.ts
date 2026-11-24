import { labs, type Lab } from "./lab-data";
import type { Question } from "./curriculum";

type Challenge = { lessonId: string; title: string; context: string; before: number; after: number; fix: Question; reason: Question };
const question = (prompt: string, options: readonly [string, string, string], answer: 0 | 1 | 2, explanation: string): Question => ({ prompt, options, answer, explanation });

export const challenges: readonly Challenge[] = [
  { lessonId: "start-with-a-question", title: "Help the café reorder its menu", context: "The owner wants to spot the most popular drink at a glance. The totals are correct, but the table takes time to scan.", before: 1, after: 0,
    fix: question("What would you change?", ["Show a ranked bar chart.", "Add a different color to every table cell.", "Show a line connecting the drinks."], 0, "Ranked bars make the largest category easy to spot. Keep the table available for exact values."),
    reason: question("Why does that help this reader?", ["It makes the page more colorful.", "Aligned bar lengths answer the owner’s ranking question.", "A chart always contains more detail than a table."], 1, "The display follows the decision: compare drink popularity, then reorder the menu.") },
  { lessonId: "choose-the-chart", title: "Show how orders changed this week", context: "A café manager wants to see the direction of orders over time, rather than rank the weekdays.", before: 0, after: 1,
    fix: question("Which change supports that question?", ["Sort the days from busiest to quietest.", "Remove the weekday labels.", "Connect the days in their time order."], 2, "A line makes direction and changes across consecutive days easy to follow."),
    reason: question("Why keep the days in this order?", ["Their sequence carries meaning.", "Alphabetical order is always clearer.", "The highest value should always be first."], 0, "Time order preserves the story of what happened across the week.") },
  { lessonId: "scales-and-baselines", title: "Make a small difference look fair", context: "A team compares 95% and 100% completion. The chart starts at 90%, making one bar look half as long as the other.", before: 1, after: 0,
    fix: question("How would you repair the comparison?", ["Make the shorter bar brighter.", "Start the bar scale at zero.", "Remove the numbers."], 1, "Bars use length to show value. A zero baseline keeps those lengths proportional."),
    reason: question("What should the reader take away?", ["The two results are the same.", "One result is twice the other.", "The difference is five percentage points."], 2, "The values differ by five percentage points. The display should communicate that difference without exaggerating it.") },
  { lessonId: "counts-and-rates", title: "Compare delivery reliability", context: "North has more late orders, but it also handles many more deliveries. You need to compare the chance of an order being late.", before: 0, after: 1,
    fix: question("What should the main comparison show?", ["Late orders as a share of eligible deliveries.", "Only the number of late orders.", "The regions in alphabetical order."], 0, "Rates account for the different delivery totals. Keep the counts available as context."),
    reason: question("Why is the denominator important?", ["It makes every bar the same length.", "It tells us how many deliveries each late count came from.", "It guarantees that the busiest region performs best."], 1, "Twelve late orders out of 300 means something different from eight out of 80.") },
  { lessonId: "averages-and-distributions", title: "Notice who waits much longer", context: "Café B has an eight-minute average wait. That summary can hide customers who wait much longer than most.", before: 0, after: 1,
    fix: question("What would you inspect before relying on the average?", ["Make the average more prominent.", "Hide unusually long waits.", "Show how Café B’s waits are spread out."], 2, "The distribution reveals Café B’s long tail, including a customer who waited 25 minutes. The equal averages did not show that experience."),
    reason: question("Why is this useful for a service designer?", ["It reveals experiences that a single average can hide.", "It proves every customer waited eight minutes.", "It removes the need to investigate long waits."], 0, "A typical wait and a difficult customer experience can coexist. The spread helps you see both.") },
  { lessonId: "uncertainty-and-causality", title: "Make a careful test decision", context: "The new design looks better in a small test. Before recommending a rollout, compare what a larger sample tells you.", before: 0, after: 1,
    fix: question("Which next step would strengthen the estimate?", ["Crop the uncertainty ranges.", "Collect more eligible observations and retain the ranges.", "Report the two rates as certain outcomes."], 1, "A larger sample gives a more precise estimate. The chart still shows the uncertainty around each rate."),
    reason: question("What can you responsibly say?", ["More observations prove the design caused the result.", "A narrow range guarantees the next test result.", "More data can reduce uncertainty; causality still needs a suitable study."], 2, "Precision and causality are different questions. A convincing claim needs both appropriate evidence and careful wording.") },
  { lessonId: "annotation-and-context", title: "Explain a change in orders", context: "A teammate sees a change in daily orders but cannot tell whether anything happened around that time.", before: 0, after: 1,
    fix: question("Which addition gives useful context?", ["Label the relevant event on the chart.", "Add a decorative illustration.", "Hide the earlier days."], 0, "A short annotation connects the change with the event readers need to know about."),
    reason: question("How should the annotation be read?", ["As proof that the event caused the change.", "As context for investigation, without claiming causation.", "As a replacement for the values."], 1, "Timing can suggest a question to investigate. It does not establish cause by itself.") },
  { lessonId: "filters-and-linked-views", title: "Investigate one delivery region", context: "A delivery lead is investigating late orders in West. The overview currently combines all regions.", before: 0, after: 2,
    fix: question("What should happen after choosing West?", ["Change the chart colors only.", "Keep the all-region totals without a label.", "Filter the chart and its detail table to West."], 2, "The selected region, chart, and values table should describe the same set of orders."),
    reason: question("Why keep the filter visible?", ["It explains which data the reader is seeing.", "It makes the data more accurate by itself.", "It means the reader never needs to clear the filter."], 0, "A clear filter label prevents a regional result from being mistaken for the whole business.") },
  { lessonId: "accessible-charts", title: "Make two series easy to identify", context: "A teammate cannot reliably distinguish the two line colors. The comparison still needs to work for them.", before: 0, after: 1,
    fix: question("Which change would you make?", ["Use even more similar colors.", "Add direct labels and different line patterns.", "Remove one series."], 1, "Names and line patterns provide ways to identify each series alongside color."),
    reason: question("Why does this improve the comparison?", ["It guarantees that every chart is accessible.", "It removes the need for text alternatives.", "Readers can identify the series using more than one visual cue."], 2, "Redundant cues help more people read the same data. Values and a clear description remain useful too.") },
  { lessonId: "aggregate-and-drill", title: "Find the difficult day", context: "Weekly average waiting times look steady, but customers reported one especially difficult day.", before: 0, after: 2,
    fix: question("What would you offer next?", ["A daily view alongside the weekly summary.", "A smoother average with fewer points.", "A larger headline saying performance is steady."], 0, "Daily detail reveals the spike that a weekly average smooths away."),
    reason: question("Why keep both levels of detail?", ["The daily chart is always the only useful chart.", "The summary supports scanning, and detail supports investigation.", "Summaries prove that no unusual days occurred."], 1, "The two views support different tasks. Readers can scan first, then inspect the period that matters.") },
  { lessonId: "compare-many-groups", title: "Compare returning customers fairly", context: "Signup groups have different starting sizes. The team wants to compare the share of people who return.", before: 0, after: 1,
    fix: question("Which comparison would you use?", ["Raw returning-user counts only.", "Remove the smaller groups.", "The share returning from each starting group."], 2, "Percentages make group sizes comparable. A missing period should remain missing, rather than becoming zero."),
    reason: question("What does a blank future period mean?", ["That period has not been observed yet.", "No one returned in that period.", "The whole group should be removed."], 0, "Not yet observed and zero are different states. Keep that distinction visible.") },
  { lessonId: "capstone", title: "Choose a useful dashboard headline", context: "A delivery lead needs to assess reliability across regions. Raw late-order counts alone favor smaller regions.", before: 0, after: 1,
    fix: question("Which view better supports reliability decisions?", ["The region with the fewest late orders, without its total.", "Late rates with access to the eligible and late counts.", "One total that removes the regions."], 1, "Rates support a fair reliability comparison. The counts and underlying records support the next investigation."),
    reason: question("What makes the overview useful at work?", ["It fits the largest possible number of charts.", "It prevents access to underlying orders.", "It answers a decision and gives the reader a clear next step."], 2, "A dashboard should help someone notice what matters and investigate it with enough context.") },
];
export function challengeFor(id: string) { return challenges.find(({ lessonId }) => lessonId === id); }
export function challengeViews(challenge: Challenge): { before: Lab["views"][number]; after: Lab["views"][number] } {
  if (challenge.lessonId === "scales-and-baselines") {
    const chart: Lab["views"][number]["chart"] = { kind: "bars", values: [["Current", 95], ["New", 100]], unit: "% complete", max: 100 };
    return {
      before: { label: "Cropped scale", title: "Setup completion, cropped scale", note: "The scale starts at 90%, so the 95% bar looks half as long as the 100% bar.", chart: { ...chart, min: 90 } },
      after: { label: "Zero baseline", title: "The same completion rates, from zero", note: "The rates are unchanged. A zero baseline shows the five-percentage-point difference fairly.", chart: { ...chart, min: 0 } },
    };
  }
  const lab = labs[challenge.lessonId];
  const before: Lab["views"][number] = challenge.lessonId === "averages-and-distributions"
    ? { label: "Average waits", title: "Both cafés average eight minutes", note: "Averages alone hide the spread.", chart: { kind: "bars", values: [["Café A", 8], ["Café B", 8]], unit: "minutes", max: 10 } }
    : lab.views[challenge.before];
  return { before, after: lab.views[challenge.after] };
}
