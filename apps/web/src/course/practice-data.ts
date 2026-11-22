import { lessons } from "./curriculum";
import { deliveries, labs, type Lab, type LineView } from "./lab-data";
import type { ProjectId } from "./project-steps";
import onboardingCsv from "./onboarding-cohorts.csv?raw";

const cohorts = onboardingCsv.trim().split(/\r?\n/).slice(1).map((line) => {
  const [week, platform, eligible, completed, context] = line.split(",");
  return { week, platform, eligible: Number(eligible), completed: completed === "" ? null : Number(completed), context };
});

const weeks = [...new Set(cohorts.map(({ week }) => week))];
const platformRates = ["Mobile", "Desktop"].map((name) => ({
  name,
  values: cohorts.filter(({ platform }) => platform === name).map(({ eligible, completed }) =>
    completed === null ? null : Math.round(completed / eligible * 1000) / 10),
}));
const onboardingTrend: LineView = { kind: "line", labels: weeks, series: platformRates, unit: "% activated", max: 100, usePatterns: true };
const platformCharts = (shared: boolean) => platformRates.map(({ name, values }): { title: string; chart: LineView } => ({
  title: name,
  chart: {
    ...onboardingTrend,
    series: [{ name, values }],
    usePatterns: false,
    min: shared ? 0 : name === "Mobile" ? 35 : 50,
    max: shared ? 100 : 60,
  },
}));
const setupTimes = [2, 4, 4, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 12, 13, 15, 16, 17, 17, 18, 20, 21, 23, 24, 25, 27, 28, 31, 33, 38];

function histogram(width: number): Lab["views"][number] {
  const values = Array.from({ length: Math.floor(38 / width) + 1 }, (_, index): [string, number] => {
    const start = index * width;
    return [`${start}–${start + width - 1}`, setupTimes.filter((time) => time >= start && time < start + width).length];
  });
  return {
    label: `${width} min`,
    title: `Setup time in ${width}-minute bins`,
    chart: { kind: "columns", values, unit: "people", max: 24 },
    note: width === 5 ? "Notice how many people took 5 to 9 minutes. Narrow bins show more detail." : "The same 30 people are counted. Wider bins make the overall shape easier to scan and can hide smaller peaks.",
  };
}

export const studioLabs: readonly { id: string; title: string; lab: Lab }[] = [
  {
    id: "circle-area", title: "Scale a circle by area",
    lab: {
      prompt: "The second group is twice as large. Compare two ways to size its circle.",
      views: [
        { label: "Double the area", title: "10 and 20 signups", chart: { kind: "symbols", values: [["Group A", 10], ["Group B", 20]], scale: "area" }, note: "A radius about 1.41 times larger gives twice the area, matching the signup counts." },
        { label: "Double the radius", title: "Same counts, different symbols", chart: { kind: "symbols", values: [["Group A", 10], ["Group B", 20]], scale: "radius" }, note: "Doubling the radius makes four times the area. The circle overstates the difference." },
      ],
    },
  },
  {
    id: "bin-width", title: "Change the histogram bins",
    lab: {
      prompt: "Thirty people complete account setup. Change the width of each time interval and notice which patterns stay readable.",
      views: [histogram(5), histogram(10), histogram(20)],
    },
  },
  {
    id: "weighted-rates", title: "Combine rates fairly",
    lab: {
      prompt: "Mobile has ten times as many signups as desktop. See what happens when you give users equal weight or give platforms equal weight.",
      views: [
        { label: "By user", title: "7-day setup completion by user", chart: { kind: "bars", values: [["Mobile", 40], ["Desktop", 80], ["All users", 43.6]], unit: "% complete", max: 100, emphasis: 2 }, note: "48 completions out of 110 eligible signups is 43.6%. This is the overall user rate." },
        { label: "By platform", title: "Mean of the two platform rates", chart: { kind: "bars", values: [["Mobile", 40], ["Desktop", 80], ["Platform mean", 60]], unit: "% complete", max: 100, emphasis: 2 }, note: "Giving each platform equal weight gives 60%. This answers a different question from the overall user rate." },
      ],
    },
  },
  {
    id: "time-window", title: "Change the time window",
    lab: {
      prompt: "Start at Week 4, then zoom out. How does the longer view change the story you would tell?",
      views: [
        { label: "All 7 weeks", title: "Mobile activation recovered after a Week 4 dip", chart: { ...onboardingTrend, series: [platformRates[0]], usePatterns: false }, note: "Earlier weeks show the fall from 48% to 39% before the recovery. What would you investigate about the dip?" },
        { label: "Weeks 4–7", title: "Mobile activation rose from 39% to 56%", chart: { ...onboardingTrend, labels: weeks.slice(3), series: [{ name: "Mobile", values: platformRates[0].values.slice(3) }], usePatterns: false }, note: "Starting at the low point emphasizes the rebound. The weeks before it are still relevant context." },
      ],
    },
  },
  {
    id: "onboarding-rollout", title: "Annotate a rollout",
    lab: {
      prompt: "Add context to the same data. Identify the observed change, the missing value, and what can be said about the rollout.",
      views: [
        { label: "Basic chart", title: "Weekly activation", chart: onboardingTrend, note: "The series move differently, and the desktop line stops before Week 7." },
        { label: "Add context", title: "Mobile activation reached 56% in Week 7", chart: { ...onboardingTrend, annotations: { index: 4, label: "Rollout starts" } }, note: "Desktop’s Week 7 completion data is unavailable. The Week 5 marker gives context for the rise without attributing the change to the rollout." },
      ],
    },
  },
  {
    id: "filter-or-highlight", title: "Filter or highlight",
    lab: {
      prompt: "You want to focus on mobile. Compare keeping desktop as a reference with removing it from the view.",
      views: [
        { label: "Both platforms", title: "7-day activation by platform", chart: onboardingTrend, note: "The solid and dashed lines show both platforms on the same scale. The gap in the final week is missing data." },
        { label: "Highlight mobile", title: "Mobile in context", chart: { ...onboardingTrend, series: [platformRates[0], { ...platformRates[1], muted: true }] }, note: "The desktop series is still present. That reference helps readers compare the pattern with mobile." },
        { label: "Mobile only", title: "Mobile activation only", chart: { ...onboardingTrend, series: [platformRates[0]], usePatterns: false }, note: "Filtering removes the desktop series and its values. The mobile trend is easier to isolate, and comparing platforms requires restoring the other series." },
      ],
    },
  },
  {
    id: "color-palettes", title: "Choose a color scale",
    lab: {
      prompt: "Switch between categories, ordered values, and differences from a target. Notice what the colors need to communicate.",
      views: [
        { label: "Categories", title: "Signup channels", chart: { kind: "palette", swatches: [["Search", "categorical-blue"], ["Referral", "categorical-teal"], ["Email", "categorical-orange"], ["Direct", "categorical-purple"], ["Partner", "categorical-brown"]] }, note: "Distinct colors identify unordered categories. Give each color a visible name and keep the mapping consistent." },
        { label: "Ordered values", title: "Share of users who finished setup", chart: { kind: "palette", swatches: [["20%", "blue-1"], ["35%", "blue-2"], ["50%", "blue-3"], ["65%", "blue-4"], ["80%", "blue-5"]] }, note: "Darker shades carry larger values. The labels and legend give the reader an exact scale." },
        { label: "From a target", title: "Difference from the activation target", chart: { kind: "palette", swatches: [["−10 pp", "red-5"], ["−5 pp", "red-2"], ["0 pp", "gray-1"], ["+5 pp", "teal-2"], ["+10 pp", "teal-5"]] }, note: "Two color ramps meet at zero. The signs and exact values make the direction clear without depending on color." },
      ],
    },
  },
  {
    id: "small-multiples", title: "Compare shared and separate scales",
    lab: {
      prompt: "The two panels show mobile and desktop activation. Compare how much each changed, then let each panel use its own scale.",
      views: [
        { label: "Shared scale", title: "Activation by platform", chart: { kind: "multiples", charts: platformCharts(true) }, note: "The same height means the same rate in both panels. That shared scale makes the size of the changes comparable." },
        { label: "Separate scales", title: "Activation on individual scales", chart: { kind: "multiples", charts: platformCharts(false) }, note: "The tighter desktop scale makes small movements easier to see, but comparing the apparent height of a change across panels can mislead." },
      ],
    },
  },
];

export const courseLabs = lessons.flatMap((lesson) => labs[lesson.id] ? [{ id: lesson.id, title: lesson.title, lab: labs[lesson.id] }] : []);

export const projects = {
  delivery: {
    label: "Delivery operations",
    title: "Find the region that needs attention",
    brief: "A delivery lead has five minutes to decide which region to investigate. Design an overview that distinguishes the size of the late-order queue from the share of orders that were late.",
    columns: ["Region", "Late orders", "Eligible orders", "Late rate"],
    rows: deliveries.map(({ region, late, total }) => [region, String(late), String(total), `${100 * late / total}%`]),
    dataNote: "The fictional totals cover a single reporting day. Ask who counts as eligible and when data is refreshed before using the metric to make a staffing decision.",
    csv: ["region,late_orders,eligible_orders", ...deliveries.map(({ region, late, total }) => `${region},${late},${total}`)].join("\n"),
    filename: "delivery-operations.csv",
    lab: "capstone",
  },
  onboarding: {
    label: "Product onboarding",
    title: "Design a weekly onboarding review",
    brief: "A product lead wants to decide which platform to investigate. Show how many eligible signups finished setup within seven days, and help the lead read the rollout and the incomplete final week in context.",
    columns: ["Week", "Platform", "Eligible", "Completed", "Activation"],
    rows: cohorts.map(({ week, platform, eligible, completed }) => [
      week, platform, String(eligible), completed === null ? "Unavailable" : String(completed),
      completed === null ? "Unavailable" : `${Math.round(completed / eligible * 1000) / 10}%`,
    ]),
    dataNote: "Fictional onboarding cohorts from Data Visualization Studio. The rollout began in Week 5. The Week 7 desktop recording is incomplete.",
    csv: onboardingCsv,
    filename: "onboarding-cohorts.csv",
    lab: "onboarding-rollout",
  },
} satisfies Record<ProjectId, { label: string; title: string; brief: string; columns: string[]; rows: string[][]; dataNote: string; csv: string; filename: string; lab: string }>;
