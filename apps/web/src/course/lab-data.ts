export type Values = readonly [label: string, value: number][];

type BarView = {
  kind: "bars" | "columns";
  values: Values;
  unit: string;
  min?: number;
  max: number;
  emphasis?: number;
};

export type LineView = {
  kind: "line";
  labels: readonly string[];
  series: readonly { name: string; values: readonly (number | null)[]; muted?: boolean }[];
  unit: string;
  min?: number;
  max: number;
  annotations?: { index: number; label: string };
  usePatterns?: boolean;
};

type IntervalView = {
  kind: "interval";
  estimates: readonly { label: string; rate: number; low: number; high: number; sample: string }[];
};

export type TableView = {
  kind: "table";
  columns: readonly string[];
  rows: readonly (readonly string[])[];
  heatmap?: boolean;
};

type SymbolView = { kind: "symbols"; values: Values; scale: "area" | "radius" };
type PaletteView = { kind: "palette"; swatches: readonly [label: string, token: string][] };
type MultiplesView = { kind: "multiples"; charts: readonly { title: string; chart: LineView }[] };

export type ChartData = BarView | LineView | IntervalView | TableView | SymbolView | PaletteView | MultiplesView;

type LabView = {
  label: string;
  title: string;
  note: string;
  chart: ChartData;
  detail?: TableView;
};

export type Lab = {
  prompt: string;
  views: readonly [LabView, LabView, ...LabView[]];
};

export const weekdayOrders: Values = [
  ["Mon", 24], ["Tue", 34], ["Wed", 28], ["Thu", 42], ["Fri", 58], ["Sat", 48], ["Sun", 34],
];

export const deliveries = [
  { region: "North", late: 12, total: 300, example: ["N-031", "N-088", "N-197"] },
  { region: "West", late: 8, total: 80, example: ["W-003", "W-027", "W-068"] },
  { region: "East", late: 6, total: 120, example: ["E-021", "E-056", "E-108"] },
] as const;

const deliveryRows = deliveries.map(({ region, late, total }) => [region, String(late), String(total), `${100 * late / total}%`]);
const deliveryTable: TableView = { kind: "table", columns: ["Region", "Late", "Eligible", "Late rate"], rows: deliveryRows };
const rateChart: BarView = { kind: "bars", values: deliveries.map(({ region, late, total }) => [region, 100 * late / total]), unit: "% late", max: 12, emphasis: 1 };
const countChart: BarView = { kind: "bars", values: deliveries.map(({ region, late }) => [region, late]), unit: "late orders", max: 15, emphasis: 0 };

const sampleViews = (sizes: readonly number[]): IntervalView => ({
  kind: "interval",
  estimates: sizes.map((total, index) => {
    const rate = index === 0 ? 0.4 : 0.5;
    const z = 1.96;
    const denominator = 1 + z * z / total;
    const center = (rate + z * z / (2 * total)) / denominator;
    const radius = z * Math.sqrt(rate * (1 - rate) / total + z * z / (4 * total * total)) / denominator;
    return {
      label: index === 0 ? "Current" : "New",
      rate: rate * 100,
      low: Math.round(100 * (center - radius)),
      high: Math.round(100 * (center + radius)),
      sample: `${Math.round(total * rate)} of ${total.toLocaleString("en-US")}`,
    };
  }),
});

const waits = [[6, 7, 7, 8, 8, 9, 9, 10], [2, 3, 4, 4, 6, 8, 12, 25]];
const waitRanges = ["0–4", "5–9", "10–14", "15–19", "20–24", "25–29"];
const dailyWaits = [7, 8, 8, 7, 9, 8, 9, 7, 7, 8, 8, 10, 8, 8, 6, 6, 6, 23, 5, 5, 5, 8, 8, 7, 9, 8, 8, 8];
const waitWeeks = Array.from({ length: 4 }, (_, index) => dailyWaits.slice(index * 7, index * 7 + 7));
const weekLabels = waitWeeks.map((_, index) => `Week ${index + 1}`);
const weeklyWaits = waitWeeks.map((week) => Math.round(week.reduce((sum, value) => sum + value, 0) / week.length * 10) / 10);
const weeklyPeaks = waitWeeks.map((week) => Math.max(...week));
const dailyLabels = dailyWaits.map((_, index) => `Day ${index + 1}`);

const deviceChart: LineView = {
  kind: "line",
  labels: weekdayOrders.map(([label]) => label),
  series: [
    { name: "Mobile", values: [16, 22, 19, 29, 42, 34, 20] },
    { name: "Desktop", values: [8, 12, 9, 13, 16, 14, 14] },
  ],
  unit: "orders",
  max: 50,
};

export const labs: Record<string, Lab> = {
  "start-with-a-question": {
    prompt: "Switch views. Which makes it easier to spot the most popular drink? Which makes an exact lookup easier?",
    views: [
      { label: "Compare drinks", title: "Drinks sold this week", chart: { kind: "bars", values: [["Latte", 56], ["Tea", 38], ["Espresso", 27], ["Cocoa", 19]], unit: "drinks", max: 60, emphasis: 0 }, note: "A ranked bar chart lets the café owner scan for the longest bar." },
      { label: "Look up totals", title: "Drinks sold this week", chart: { kind: "table", columns: ["Drink", "Sold"], rows: [["Cocoa", "19"], ["Espresso", "27"], ["Latte", "56"], ["Tea", "38"]] }, note: "An alphabetical table makes it easy to find a named drink and read its exact count." },
    ],
  },
  "choose-the-chart": {
    prompt: "Use the same order counts in two different forms. Which makes the change from Thursday to Friday easiest to follow?",
    views: [
      { label: "Bars", title: "Orders by weekday", chart: { kind: "columns", values: weekdayOrders, unit: "orders", max: 60, emphasis: 4 }, note: "Bars make each day’s volume a separate amount and anchor every day at zero." },
      { label: "Line", title: "Orders across the week", chart: { kind: "line", labels: weekdayOrders.map(([label]) => label), series: [{ name: "Orders", values: weekdayOrders.map(([, value]) => value) }], unit: "orders", max: 60 }, note: "The line draws attention to the rise toward Friday and the decline over the weekend." },
    ],
  },
  "scales-and-baselines": {
    prompt: "Change where the bars start. The order counts stay the same. Notice how the size difference feels.",
    views: [
      { label: "Start at zero", title: "Orders by branch", chart: { kind: "bars", values: [["Central", 95], ["North", 97], ["West", 98]], unit: "orders", max: 100 }, note: "The branches have similar totals. The longest bar is only three orders longer than the shortest." },
      { label: "Start at 90", title: "Same orders, cropped scale", chart: { kind: "bars", values: [["Central", 95], ["North", 97], ["West", 98]], unit: "orders", min: 90, max: 100 }, note: "West’s bar is now 8 units long and Central’s is 5. The bars exaggerate a small difference in total orders." },
    ],
  },
  "counts-and-rates": {
    prompt: "Compare the busiest late-order queue with the region where an order is most likely to be late.",
    views: [
      { label: "Late orders", title: "How many orders need follow-up?", chart: countChart, detail: deliveryTable, note: "North has the most late orders. Start here if the goal is to clear the biggest queue." },
      { label: "Late rate", title: "How often are orders late?", chart: rateChart, detail: deliveryTable, note: "West has the highest late rate. Its 8 late orders came from only 80 eligible orders." },
    ],
  },
  "averages-and-distributions": {
    prompt: "Both cafés average eight minutes. Compare the shape of their wait times.",
    views: [
      { label: "Café A", title: "How long people waited at Café A", chart: { kind: "columns", values: waitRanges.map((label, index) => [label, waits[0].filter((value) => Math.floor(value / 5) === index).length]), unit: "people", max: 8 }, note: "Seven of eight people waited five to nine minutes. Nobody waited 15 minutes or longer." },
      { label: "Café B", title: "How long people waited at Café B", chart: { kind: "columns", values: waitRanges.map((label, index) => [label, waits[1].filter((value) => Math.floor(value / 5) === index).length]), unit: "people", max: 8, emphasis: 5 }, note: "Half the people waited under five minutes. One person waited 25 minutes, pulling the average up." },
    ],
  },
  "uncertainty-and-causality": {
    prompt: "The estimated rates stay at 40% and 50%. Increase the sample and see what happens to the ranges.",
    views: [
      { label: "20 per group", title: "Conversion estimates and 95% intervals", chart: sampleViews([20, 20]), note: "The ranges are wide. Twenty participants per group gives a rough estimate, even when the rates look far apart." },
      { label: "1,000 per group", title: "Conversion estimates and 95% intervals", chart: sampleViews([1000, 1000]), note: "The ranges shrink because there are more observations. The study design still determines what you can say about the cause." },
    ],
  },
  "annotation-and-context": {
    prompt: "Add the title and the missing-data note. What can you now understand without asking someone?",
    views: [
      { label: "Bare chart", title: "Activity", chart: { kind: "line", labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], series: [{ name: "Count", values: [24, 34, null, 42, 58, 48, 34] }], unit: "", max: 60 }, note: "The shape is visible, but the measure, date window, and reason for the gap are hard to infer." },
      { label: "With context", title: "Daily orders, 1–7 May", chart: { kind: "line", labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], series: [{ name: "Orders", values: [24, 34, null, 42, 58, 48, 34] }], unit: "orders", max: 60, annotations: { index: 2, label: "Data missing" } }, note: "The Wednesday integration was offline. The gap distinguishes missing data from zero orders." },
    ],
  },
  "filters-and-linked-views": {
    prompt: "Choose a region, then open the values below. The same selection drives the chart and the example order records.",
    views: [
      { label: "All regions", title: "Late orders · all regions", chart: countChart, detail: deliveryTable, note: "The overview shows where the work is. Choose one region to narrow the scope." },
      { label: "North", title: "Late orders · North", chart: { kind: "bars", values: [["Late", 12]], unit: "late orders", max: 15 }, detail: { kind: "table", columns: ["Example late order", "Region"], rows: deliveries[0].example.map((order) => [order, "North"]) }, note: "North has 12 late orders out of 300. The detail shows three example North order IDs." },
      { label: "West", title: "Late orders · West", chart: { kind: "bars", values: [["Late", 8]], unit: "late orders", max: 15 }, detail: { kind: "table", columns: ["Example late order", "Region"], rows: deliveries[1].example.map((order) => [order, "West"]) }, note: "West has 8 late orders out of 80. Choose All regions to return to the overview." },
    ],
  },
  "accessible-charts": {
    prompt: "Imagine the colors look the same to you. Switch to lines with different patterns and compare how you read them.",
    views: [
      { label: "Color only", title: "Orders by device", chart: deviceChart, note: "Both lines use the same pattern. You have to match their colors to the legend." },
      { label: "Labels and patterns", title: "Orders by device", chart: { ...deviceChart, usePatterns: true }, note: "Mobile uses a solid line and Desktop a dashed line. The values are also available in a table." },
    ],
  },
  "aggregate-and-drill": {
    prompt: "Compare two ways to summarize daily average waits by week. Then open the daily detail to find the day you would investigate.",
    views: [
      { label: "Average", title: "Average wait by week", chart: { kind: "line", labels: weekLabels, series: [{ name: "Average wait", values: weeklyWaits }], unit: "minutes", max: 25 }, note: "All four weekly averages are eight minutes. The average smooths out a short spike." },
      { label: "Peak", title: "Highest daily average in each week", chart: { kind: "line", labels: weekLabels, series: [{ name: "Peak daily average", values: weeklyPeaks }], unit: "minutes", max: 25, annotations: { index: 2, label: "23 min" } }, note: "The peak points to Week 3. It picks the highest daily average in each time bucket." },
      { label: "Daily detail", title: "Average wait by day", chart: { kind: "line", labels: dailyLabels, series: [{ name: "Average wait", values: dailyWaits }], unit: "minutes", max: 25, annotations: { index: 17, label: "23 min" } }, note: "Day 18 reached 23 minutes. The chart uses the same scale, so the change comes from the grouping." },
    ],
  },
  "compare-many-groups": {
    prompt: "Compare returning users as counts and rates. Both views use the original number of people who joined as the cohort size.",
    views: [
      { label: "Returning users", title: "Return visits by signup cohort", chart: { kind: "table", columns: ["Joined (size)", "Week 1", "Week 2", "Week 3"], rows: [["May 1 (200)", "100", "70", "58"], ["May 8 (80)", "48", "36", "28"], ["May 15 (40)", "24", "Withheld", "Not reached"]] }, note: "A bigger group can have more returning users even when a smaller share returns. Week 3 has not happened yet for the newest cohort." },
      { label: "Share returning", title: "Share of each cohort returning", chart: { kind: "table", columns: ["Joined (size)", "Week 1", "Week 2", "Week 3"], rows: [["May 1 (200)", "50%", "35%", "29%"], ["May 8 (80)", "60%", "45%", "35%"], ["May 15 (40)", "60%", "Withheld", "Not reached"]], heatmap: true }, note: "The May 8 cohort retains a bigger share by Week 3. The second week is withheld for the smallest group in this example." },
    ],
  },
  capstone: {
    prompt: "Compare the size of the late-order queue and how often orders are late. Decide which view the delivery lead needs first.",
    views: [
      { label: "Work to clear", title: "Late orders by region · today", chart: countChart, detail: deliveryTable, note: "North has the highest number of late orders. Choose this view when staffing the queue." },
      { label: "Service quality", title: "Late share by region · today", chart: rateChart, detail: deliveryTable, note: "West has the highest late share. Make the eligible volume and a path to the underlying records easy to find." },
    ],
  },
};
