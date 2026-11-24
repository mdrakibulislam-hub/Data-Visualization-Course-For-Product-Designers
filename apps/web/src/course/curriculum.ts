export type SourceId =
  | "kirk"
  | "handbook"
  | "truthful-art"
  | "kirk-excerpt"
  | "reasoning"
  | "amplitude-analytics"
  | "datawrapper-chart-types"
  | "kirk-bar-charts"
  | "nngroup-dashboards"
  | "carbon-data-tables"
  | "accessibility-first"
  | "stackoverflow-aggregation"
  | "datadog-queries"
  | "wilke-overlap"
  | (string & {});

export type Question = {
  prompt: string;
  options: readonly [string, string, string];
  answer: 0 | 1 | 2;
  explanation: string;
};

type Lesson = {
  id: string;
  title: string;
  minutes: number;
  description: string;
  sections: readonly { title: string; body: string }[];
  takeaway: string;
  practice: string;
  questions: readonly Question[];
  flashcard: { front: string; back: string };
  reading: readonly { source: SourceId; locator: string }[];
};

type Module = {
  title: string;
  description: string;
  lessons: readonly Lesson[];
};

export const modules: readonly Module[] = [
  {
    title: "The foundations",
    description: "Decide what the chart should help someone see.",
    lessons: [
      {
        id: "start-with-a-question",
        title: "Start with a question",
        minutes: 6,
        description: "Give your chart a job before you choose how it looks.",
        sections: [
          { title: "Ask what someone needs to do", body: "A café owner wants to put the most popular drink at the top of the menu. That calls for a quick ranking. A colleague closing the till needs the exact number sold for each drink. The same orders can support both jobs, but each person needs a different display." },
          { title: "Write a one-sentence brief", body: "Try: “Help the café owner compare drinks sold this week so they can reorder the menu.” Name the reader, the question, and what happens next. Adding the time window also makes it easier to agree which orders belong in the chart." },
          { title: "Use the same brief at work", body: "For a checkout dashboard, ask whether the reader is spotting a problem or investigating an order. A clear overview can help with the first. A searchable table with order IDs can help with the second." },
          { title: "Measure the behavior you care about", body: "A funnel shows where people stop along a sequence. For a grocery app, follow cart opened, delivery slot selected, and order placed. Decide how long people have to finish the steps. If the question is whether people come back, use retention and agree on what counts as returning, such as placing a second order." },
        ],
        takeaway: "Choose the display after you know the reader, the question, and the decision.",
        practice: "Pick one chart from a product you use. Write a brief for it in one sentence, then ask someone if they would know what to do after looking at it.",
        questions: [
          { prompt: "The café owner needs to spot the most popular drink in a few seconds. Which view is the better starting point?", options: ["An unsorted table of every order", "A bar chart ranked by drinks sold", "A line showing all orders over the week"], answer: 1, explanation: "Aligned, ranked bars make the biggest category easy to spot. A table is useful when the next step is exact lookup." },
          { prompt: "Which brief gives a designer enough to start?", options: ["Make the dashboard more visual.", "Use a modern chart for orders.", "Help shift leads compare weekday orders so they can plan staffing."], answer: 2, explanation: "The third brief names a reader, a comparison, and a decision. Each can guide a design choice." },
        ],
        flashcard: { front: "What three things belong in a one-sentence chart brief?", back: "The reader, the question they need answered, and what they will do with the answer." },
        reading: [{ source: "kirk", locator: "Chapters 1–3, especially project context and vision" }, { source: "kirk-excerpt", locator: "Chapter 1, the stages of understanding" }, { source: "reasoning", locator: "Slides 5–8 and 20–25" }, { source: "amplitude-analytics", locator: "Funnels and retention" }],
      },
      {
        id: "choose-the-chart",
        title: "Choose the right chart",
        minutes: 8,
        description: "Match bars, lines, and other chart types to the question.",
        sections: [
          { title: "Compare sizes with bars", body: "Use bars when someone needs to compare amounts across categories. The baseline gives their lengths a common starting point. Ranking categories helps people spot the largest one. Keep a meaningful order, such as the days of the week, when the sequence matters." },
          { title: "Show change with a line", body: "A line makes direction and changes between ordered points easier to see. It works for orders across days, where the connection has meaning. Connecting unrelated categories, such as latte and tea, suggests a relationship between neighboring points that the data does not provide." },
          { title: "Use the form that answers the task", body: "A stacked bar can show how drink categories make up all orders. To compare two similar shares precisely, put them on a common baseline. Use a histogram for the spread of numeric values, a scatterplot for a relationship between two measurements, and a table when readers need exact values." },
          { title: "Decide what your bars need to say", body: "Try horizontal bars for long category names. If the reader needs the exact number beside each drink, put the value at the end of its bar. If they mainly need to see which drink sold most, a shared scale and a clear ranking can do the job with fewer labels." },
        ],
        takeaway: "Start with the relationship you want someone to read: difference, change, spread, or association.",
        practice: "Sketch a café’s orders by drink and its total orders by day. Write the question above each sketch. Then add direct value labels to the bars and check whether they help someone answer the first question.",
        questions: [
          { prompt: "Which chart helps you see whether delivery time and a customer’s distance tend to increase together?", options: ["A scatterplot with one dot per delivery", "A pie chart of all delivery times", "A line connecting customer names in alphabetical order"], answer: 0, explanation: "A scatterplot gives each delivery a position using both distance and time. A visible pattern can suggest an association to investigate." },
          { prompt: "A team wants to see how sign-ups changed week by week. What should go on the horizontal axis?", options: ["Customer names", "Weeks in chronological order", "Weeks sorted from most to fewest sign-ups"], answer: 1, explanation: "Chronological order keeps the time intervals and lets readers follow the change. Sorting by size answers a different question." },
        ],
        flashcard: { front: "When are bars a better first choice than a line?", back: "When the job is to compare amounts for separate categories. Use a line for change across a meaningful order, typically time." },
        reading: [{ source: "kirk", locator: "Chapter 6, visual encoding and chart selection" }, { source: "reasoning", locator: "Slides 30–35, selecting encodings" }, { source: "datawrapper-chart-types", locator: "Developments over time, shares, and absolute numbers" }, { source: "kirk-bar-charts", locator: "Direct labels and alternate bar layouts" }],
      },
      {
        id: "scales-and-baselines",
        title: "Use honest scales",
        minutes: 7,
        description: "See how a small difference can look much bigger.",
        sections: [
          { title: "Start bars at zero", body: "A bar encodes a value through its length. Three branches with 95, 97, and 98 orders are close in size. Start their bars at 90 and the marks now show differences of 5, 7, and 8 from a hidden starting point. That changes the visual comparison." },
          { title: "Show small differences carefully", body: "A few points can matter when a service level is close to its target. Show the exact numbers, or use a dot plot with a clearly labeled range. A line chart can use a tighter range to reveal movement when the scale is visible and the range makes sense for the question." },
          { title: "Keep comparisons consistent", body: "If two charts are meant to be compared side by side, align their units, date windows, and scales. When each chart needs its own scale, name that difference so readers do not compare the shapes as if they shared an axis." },
        ],
        takeaway: "Check what the marks imply about size, even when the numbers in the labels are correct.",
        practice: "Find two side-by-side dashboards. Check if equal distances represent equal amounts, and if both use the same time window.",
        questions: [
          { prompt: "A 95% bar looks half as long as a 100% bar. The chart starts at 90%. What should you do first?", options: ["Remove the axis labels", "Use brighter colors for the 100% bar", "Start bars at zero or show the values with dots on a labeled scale"], answer: 2, explanation: "Bars invite comparison by length. A shared zero preserves that comparison, and dots can show fine differences through position." },
          { prompt: "Can a line chart of temperature use a vertical range of 15–30°C?", options: ["Yes, if the labeled scale gives useful context for the changes", "No, every chart has to start at zero", "Only when the numbers are hidden"], answer: 0, explanation: "A line shows position and change. A clearly marked, meaningful range can reveal change without relying on a zero baseline." },
        ],
        flashcard: { front: "Why do standard bars need a zero baseline?", back: "Readers compare bar lengths. A shifted starting point changes those lengths and exaggerates or shrinks the apparent difference." },
        reading: [{ source: "kirk", locator: "Chapters 6 and 10, distortion and axis ranges" }, { source: "kirk-excerpt", locator: "Chapter 1, trustworthy design, pp. 32–36" }],
      },
    ],
  },
  {
    title: "Read the data",
    description: "Understand what a number can tell you and what it leaves out.",
    lessons: [
      {
        id: "counts-and-rates",
        title: "Know what you’re counting",
        minutes: 8,
        description: "Use counts and rates to answer different questions.",
        sections: [
          { title: "Check what a row represents", body: "In a delivery export, a row could represent an order, a parcel, or a delivery attempt. One order may have two attempts. Counting rows can give you a different answer from counting distinct orders. Agree on what one row and one counted event mean." },
          { title: "Put the denominator beside the rate", body: "Twelve late orders at a busy branch create more follow-up work than eight late orders at a smaller branch. If the branches had 300 and 80 orders, their late rates were 4% and 10%. The rate answers how common a late order was, while the count answers how much work arrived." },
          { title: "Give the metric a clear contract", body: "Record which orders qualify, what counts as late, which timezone defines a day, and whether a missing delivery time means unknown or unfinished. For an overall rate, divide total late orders by total eligible orders. Averaging branch rates gives small and large branches equal weight." },
        ],
        takeaway: "Put the unit of analysis and the denominator where users can find them.",
        practice: "Pick a metric in a product dashboard. Write its numerator, denominator, exclusions, and time window in four short lines.",
        questions: [
          { prompt: "One branch has 12 late orders out of 300. Another has 8 out of 80. Which has the higher late rate?", options: ["The branch with 12 late orders", "The branch with 8 late orders", "The rates are the same"], answer: 1, explanation: "Eight out of 80 is 10%, while twelve out of 300 is 4%. The smaller count represents a higher share." },
          { prompt: "How do you calculate the combined late rate for those two branches?", options: ["Average 4% and 10%.", "Divide 20 late orders by 380 eligible orders.", "Report 20% because there were 20 late orders."], answer: 1, explanation: "The overall rate uses every eligible order once. It is about 5.3%, weighted by each branch’s order volume." },
        ],
        flashcard: { front: "What is a denominator, and why show it?", back: "It is the total eligible group behind a rate. Showing it helps readers interpret the rate and notice when it comes from very few cases." },
        reading: [{ source: "kirk", locator: "Chapter 4, acquiring, examining, and transforming data" }, { source: "reasoning", locator: "Slides 14–19, checking measurement and limits" }],
      },
      {
        id: "averages-and-distributions",
        title: "Look beyond the average",
        minutes: 9,
        description: "Read a distribution and find the customers a summary can hide.",
        sections: [
          { title: "Averages hide the shape", body: "Two cafés can both average an eight-minute wait. At one, most people wait around eight minutes. At the other, many wait much less, while one person waits 25 minutes. A single average cannot explain both experiences." },
          { title: "Look at spread and the tail", body: "A histogram counts how many values fall into each time interval. The median sits halfway through the ordered values. A high percentile, such as p95, describes the slow end: roughly 95% of observations are at or below it. A small sample makes tail estimates unstable." },
          { title: "Find the issue before you explain it", body: "If checkout feels slow, draw the distribution, then look at the same view by device or network. A slow cluster may be concentrated in one group. Share the group size and check that the difference persists before treating it as a diagnosis." },
        ],
        takeaway: "Pair a typical value with the spread or tail whenever the bad experience matters.",
        practice: "Choose a timing metric. Ask your analyst for the median, p95, and count, then sketch how you would explain those three numbers to a teammate.",
        questions: [
          { prompt: "Two branches have the same average wait. You want to find where very long waits happen. What should you look at?", options: ["The same averages in a larger font", "A histogram or a high percentile with the sample size", "A pie chart of branch names"], answer: 1, explanation: "The distribution exposes the tail. A high percentile summarizes that tail, with the count helping readers judge how stable it is." },
          { prompt: "What does the height of a standard histogram bar count?", options: ["The number of observations in a value interval", "The average of all values", "The largest individual value"], answer: 0, explanation: "In a frequency histogram with equal bins, each bar counts observations in that interval." },
        ],
        flashcard: { front: "What do you learn from a histogram that a mean cannot show?", back: "The shape of the distribution: clusters, spread, gaps, and a long tail. Equal means can come from very different experiences." },
        reading: [{ source: "handbook", locator: "III.5, histograms and density estimation; IV.3, outliers" }, { source: "reasoning", locator: "Slides 26–29, what aggregation can hide" }],
      },
      {
        id: "uncertainty-and-causality",
        title: "Say what’s uncertain",
        minutes: 8,
        description: "Make careful claims from small samples and noisy changes.",
        sections: [
          { title: "Put the sample size next to the result", body: "Five out of ten people liking a new menu and five hundred out of a thousand liking it both give 50%. Those rates are equally large, but random variation has much more room to move the first number. Show the count and the time window." },
          { title: "Show a range around an estimate", body: "An interval can show how precise an estimate is under a particular method. State what the range represents. In the exercise, the endpoints come from 95% Wilson intervals for made-up conversion data. The ranges describe sampling uncertainty and do not account for biased recruitment or tracking errors." },
          { title: "Separate the observation from the explanation", body: "If orders rose after a redesign, say they rose after it. A holiday, new traffic source, or tracking change could also explain the rise. For a causal claim, work with an analyst on how groups were assigned and what other factors may have changed." },
        ],
        takeaway: "Describe the evidence you have and name the uncertainty in terms someone can act on.",
        practice: "Rewrite a chart title that says “Our redesign drove more sign-ups.” State the measured change and one thing the team should verify.",
        questions: [
          { prompt: "Two groups each show 50%, but one has 20 participants and the other has 1,000. Which estimate is usually more precise if sampling is comparable?", options: ["The one based on 20 participants", "Both are equally precise", "The one based on 1,000 participants"], answer: 2, explanation: "The point estimate is the same. With more comparable observations, sampling fluctuations tend to be smaller." },
          { prompt: "Conversions rose after a checkout release, but a holiday sale began on the same day. What can you say?", options: ["Conversion rose after the release, and the cause still needs investigation.", "The release caused all of the increase.", "The sale caused all of the increase."], answer: 0, explanation: "The timing is an observation. Separating the release effect from the sale requires stronger evidence." },
        ],
        flashcard: { front: "What separates an observation from a causal claim?", back: "An observation describes what the data shows. A causal claim says what produced it and requires evidence that addresses alternative explanations." },
        reading: [{ source: "truthful-art", locator: "Chapter 4, printed pp. 99–116" }, { source: "handbook", locator: "III.16, using graphics to check model fit" }],
      },
    ],
  },
  {
    title: "Design for decisions",
    description: "Make the chart understandable in the middle of someone’s work.",
    lessons: [
      {
        id: "annotation-and-context",
        title: "Give the chart context",
        minutes: 7,
        description: "Use labels and notes to explain the part that matters.",
        sections: [
          { title: "Use words to orient the reader", body: "“Activity” leaves people to guess. “Orders per day, 1–7 May” says what was measured and when. If you know the takeaway, make it specific: “Orders peaked on Friday.” Keep the measurement and time window visible as supporting context." },
          { title: "Make the important detail easy to find", body: "A short label next to a point can save a trip to the legend. Use annotation for an event, a meaningful benchmark, or a detail the reader would otherwise miss. A release marker can show when it happened, while the note avoids claiming the release caused the change." },
          { title: "Leave gaps where data is unknown", body: "An integration stopped sending orders for a day. A zero would say the café received no orders. Joining the points on either side would imply a path you never measured. Leave a gap and explain why it is there." },
          { title: "Give the first glance a job", body: "A shift lead deciding which queue needs help should see that queue quickly. Compare wait times with bars on one baseline, mark the target, and label the queue that needs attention. A weekly planning dashboard can give more space to trends and comparisons because its reader has time to investigate." },
        ],
        takeaway: "Label the measure and time window, then add context where it changes how the chart is read.",
        practice: "Rewrite the title, axis label, and one note for a chart your team uses. Read the result to someone who has never seen the dashboard.",
        questions: [
          { prompt: "Tuesday’s order total is unavailable because the source did not update. How should you show Tuesday?", options: ["Show zero so the chart is complete.", "Leave a gap and explain that data is missing.", "Copy Monday’s total into Tuesday."], answer: 1, explanation: "A gap distinguishes an unmeasured value from a measured zero. A short note tells the reader why." },
          { prompt: "Which heading helps a reader most?", options: ["Graph", "Key performance insights", "Daily orders, 1–7 May"], answer: 2, explanation: "The last heading names the measure, the time grain, and the date window." },
        ],
        flashcard: { front: "What is the difference between zero and missing?", back: "Zero is an observed amount of none. Missing means the amount is unknown. Show them differently and explain the gap when it matters." },
        reading: [{ source: "kirk", locator: "Chapters 5, 8, and 10, editorial focus, annotation, and composition" }, { source: "reasoning", locator: "Slides 36–42, style and words" }, { source: "nngroup-dashboards", locator: "Dashboard types and visual cues for fast comparisons" }],
      },
      {
        id: "filters-and-linked-views",
        title: "Design useful filters",
        minutes: 9,
        description: "Keep a dashboard’s charts and details in agreement.",
        sections: [
          { title: "Start with an overview", body: "A shift lead wants to see which part of the city has late deliveries today, then inspect the orders behind that number. Start with the overview and keep the action one step away. A table can carry exact records without requiring the overview chart to show every one." },
          { title: "Make the scope visible", body: "When someone selects North, show the selection beside the results and update the views that are supposed to follow it. If a chart stays global as a comparison, label it as an all-region benchmark. Make it easy to clear filters and return to the starting view." },
          { title: "Design the states people actually hit", body: "A team will see loading, no matches, stale data, and partial results. A user should be able to tell “still loading” from “no deliveries” and “totals are ready, but the order list is late.” Keep the selected filters visible through those transitions." },
          { title: "Give the records their own view", body: "In an orders table, show the ID, status, and delivery time together so people can compare rows. Let someone expand a row for a short delivery note. A full delivery history may need a panel or a page of its own. Put search and filters above the rows they apply to." },
        ],
        takeaway: "People should always know which records they’re looking at and how to get back.",
        practice: "Sketch a dashboard with one global filter, one chart-specific filter, and a clear reset. Write what changes for each control.",
        questions: [
          { prompt: "A global region filter is set to North. One score remains a company-wide reference. How should it be named?", options: ["Company-wide benchmark", "North score", "Score"], answer: 0, explanation: "The name makes the exception visible. Readers can compare North with the company without assuming both values use the filter." },
          { prompt: "A filter returns no matching records. What should the interface do?", options: ["Clear the filter automatically", "Show a blank chart without a message", "Keep the filter visible and offer a way to clear it"], answer: 2, explanation: "The user can see what caused the empty state and decide how to broaden the query." },
        ],
        flashcard: { front: "What are linked views?", back: "Views that share an interaction or a selection. Selecting a region in a chart can show the same region in a table while the scope stays visible." },
        reading: [{ source: "kirk", locator: "Chapter 7, interaction features and trade-offs" }, { source: "handbook", locator: "II.8–II.9, linked views; IV.5, coordinated auction views" }, { source: "carbon-data-tables", locator: "Expandable rows, table toolbar, and pagination" }],
      },
      {
        id: "accessible-charts",
        title: "Make charts accessible",
        minutes: 8,
        description: "Design for readers who use a keyboard, a screen reader, or a small screen.",
        sections: [
          { title: "Put meaning in more than color", body: "If two lines are labeled only with colored swatches, losing the colors can make them hard to distinguish. Label lines directly where there is room. A dash pattern, shape, or text label can preserve the distinction when colors look similar." },
          { title: "Give the graphic a readable equivalent", body: "Use a short description of what the view shows. Provide the actual values as a readable table when someone needs to inspect them. If a chart responds to a filter, the description and the table should describe the same filtered data." },
          { title: "Design beyond hover", body: "People need to discover and operate controls by keyboard and touch. Essential numbers cannot depend on pointer hover. Test focus order, contrast, small screens, and zoom. Ask people to complete a task rather than using a color simulator as the entire test." },
          { title: "Test the chart before you polish it", body: "At 200% zoom, check whether the labels, comparison, and controls still fit the reader’s task. In a grid of checkout times, a key can explain how bar height and color both represent the same time band. Test whether people read them as two cues for one value." },
        ],
        takeaway: "Use multiple signals for meaning and provide a clear way to read the values.",
        practice: "Review one chart with color turned off and use only the keyboard. Note where the legend, values, controls, and focus become hard to follow.",
        questions: [
          { prompt: "A traffic chart uses orange and blue for mobile and desktop. What is a useful additional cue?", options: ["A brighter background", "Direct series labels and different line patterns", "A legend that only shows two unlabeled dots"], answer: 1, explanation: "Labels and line patterns keep the series distinguishable when colors are hard to tell apart." },
          { prompt: "Exact values are available only on hover. Which improvement gives more people access?", options: ["Make the hover targets smaller", "Add more animation to the tooltip", "Add a readable data table or keyboard-accessible value controls"], answer: 2, explanation: "Keyboard and touch users need an equivalent way to inspect the values." },
        ],
        flashcard: { front: "How can you show two series without relying on color alone?", back: "Add visible names and use another visual distinction, such as solid and dashed lines or different point shapes." },
        reading: [{ source: "kirk", locator: "Chapters 8–9, reader guides and effective color" }, { source: "reasoning", locator: "Slides 20–25, audience and accessibility" }, { source: "accessibility-first", locator: "Low vision, contrast, and a second way to read values" }],
      },
    ],
  },
  {
    title: "Design at scale",
    description: "Handle dense data, incomplete results, and enterprise trade-offs.",
    lessons: [
      {
        id: "aggregate-and-drill",
        title: "Summarize large datasets",
        minutes: 10,
        description: "Keep the big picture fast without hiding important detail.",
        sections: [
          { title: "Match detail to the decision", body: "A manager looking across a month can start with weekly summaries. An on-call lead investigating a busy period needs hourly or daily detail. The more you group, the more shape you lose. An average can hide a short spike, so carry a peak or spread when it affects the decision." },
          { title: "Check what gets combined", body: "Say checkout takes 100 ms in four readings and 900 ms in a fifth. One time bucket can show a mean of 260 ms or a peak of 900 ms. The query can then combine results across servers, hiding the server with the spike. Specify the time bucket, the calculation, and the group in the chart’s details." },
          { title: "Keep a useful comparison in view", body: "A weekly average can hide the dinner rush. Compare Friday evenings with other Friday evenings so the shift lead can judge whether a wait is unusual. Give the selected shift visual emphasis and keep the usual range nearby for context." },
          { title: "Design the overview and the drill-down together", body: "Agree with engineering on what the server groups, what the first chart requests, and what happens when a user zooms or drills down. A million orders can become a few dozen time buckets. Keep detailed records behind a filtered, paginated view." },
          { title: "Keep changes in resolution visible", body: "Label the bucket size, date range, time zone, and whether a result is sampled or partial. Sampling can reveal common patterns quickly, but may miss rare failures. Cancel outdated requests when filters change and preserve current filters until the matching results arrive." },
        ],
        takeaway: "Keep the overview fast, label its level of detail, and preserve a path to the exceptions.",
        practice: "Write two requests for a checkout dashboard. Give the first view a time bucket, calculation, group, and freshness label. For the drill-down, choose a finer time bucket or a single server. Explain which one would help someone find a short outage.",
        questions: [
          { prompt: "Weekly average wait stays flat, but one day had a major outage. What could help reveal it?", options: ["A larger weekly average chart", "A weekly peak or a drill-down to the daily data", "A longer averaging window"], answer: 1, explanation: "A peak or a finer-grained view retains the exception that an average can smooth away." },
          { prompt: "A heavy view uses a sample of 5,000 from two million events. What does its interface need to say?", options: ["Only the full dataset size", "That the chart is sampled and what the sample represents", "Nothing, if the chart loads quickly"], answer: 1, explanation: "Sampling affects what users can conclude, especially about rare events. Disclose the scope and provide exact data when the task demands it." },
        ],
        flashcard: { front: "What should an aggregated overview preserve?", back: "The context of each bucket, the signal needed for the decision, and a path to finer detail when the summary might hide an exception." },
        reading: [{ source: "handbook", locator: "II.6, high-dimensional graphics; III.4 and III.9, large datasets and smoothing" }, { source: "reasoning", locator: "Slides 26–29, trade-offs of aggregation" }, { source: "stackoverflow-aggregation", locator: "Comparing similar periods and keeping background context" }, { source: "datadog-queries", locator: "Time and source aggregation" }],
      },
      {
        id: "compare-many-groups",
        title: "Compare many groups",
        minutes: 10,
        description: "Use aligned views when a single chart gets crowded.",
        sections: [
          { title: "Give groups a repeatable structure", body: "If a line chart has a dozen labels crossing one another, try one small chart per group with the same axes. If you need precise comparisons by group and week, use a table or a matrix. A matrix uses the same columns in every row so patterns can be scanned in both directions." },
          { title: "Make overlapping points visible", body: "On a plot of rounded order totals and wait times, several orders can land on the same dot. A little transparency can reveal stacks. For a small dataset with rounded values, a slight offset can separate dots visually while the tooltip shows the original values. If thousands of marks blend together, use a grid with the count in each cell and offer a way to inspect the underlying orders." },
          { title: "Keep cohorts and denominators clear", body: "A cohort groups people who share a starting event, such as joining in the same week. Each cohort’s Week 2 occurs on a different calendar date. Show the size of each cohort and whether the group was old enough to reach each week." },
          { title: "Make gaps and restrictions meaningful", body: "An unfinished week, an unknown value, and a value withheld for privacy deserve different labels. Agree on access rules and export behavior with your data partners. Withholding small cells is one safeguard. Other totals and filters can still reveal those values through subtraction." },
        ],
        takeaway: "Align groups on a meaningful scale, and make their sizes and limits visible.",
        practice: "Turn a cluttered comparison into two small multiples or a matrix. Write the rule for the scale and the label a missing or withheld value should show.",
        questions: [
          { prompt: "You want to compare how many weeks different groups keep using a product after joining. How should you align the columns?", options: ["By weeks since joining", "By the number of users sorted highest first", "By the groups’ names"], answer: 0, explanation: "Weeks since joining line up equivalent stages of the experience across cohorts." },
          { prompt: "A cell has been withheld because the group is very small. What should the design show?", options: ["0%", "A label that says the value was withheld", "The value in the exported CSV only"], answer: 1, explanation: "Withheld data is different from a measured zero. Respect the same access policy in details and exports." },
        ],
        flashcard: { front: "When do small multiples help?", back: "When a single view has too many groups to read. Repeating a simple chart with the same units and scale makes comparisons easier." },
        reading: [{ source: "handbook", locator: "III.6, structured sets of graphs; III.14–III.15, parallel coordinates and matrix visualization" }, { source: "kirk", locator: "Chapter 10, comparing views and arranging space" }, { source: "wilke-overlap", locator: "Sections 18.1–18.3, transparency, jitter, and density" }],
      },
      {
        id: "capstone",
        title: "Build a decision dashboard",
        minutes: 15,
        description: "Put your skills to work on a delivery operations case.",
        sections: [
          { title: "Your brief", body: "A delivery lead has five minutes to decide which region needs attention today. The company handles many orders, and a strange-looking total may come from unusually high volume rather than poor service. Help the lead choose where to investigate, then find the orders behind the signal." },
          { title: "Sketch your first screen", body: "Write the decision in one sentence. Sketch a comparison that shows both late rate and eligible volume. Add a time window, a clear definition of “late,” and a path to the underlying orders. Decide how it looks when a region has no eligible orders or part of the data is stale." },
          { title: "Review it like a staff designer", body: "Ask an analyst to check your metric grain, denominator, and exclusions. Ask an engineer to explain the request, limits, and loading behavior. Give a teammate a task to complete with keyboard or touch. Ask what they would act on, then compare their reasoning to yours." },
        ],
        takeaway: "A dependable dashboard connects a decision, a clear measure, and a path to the evidence.",
        practice: "Sketch your solution on paper or in your design tool. Save a short rationale below. Explain what you show first, what the lead can do next, and one limit you make visible.",
        questions: [
          { prompt: "The lead wants to investigate the region with the worst late rate. What else should be visible before they act?", options: ["Only the color assigned to the region", "The rate’s eligible order count, time window, and access to records", "A total with no explanation"], answer: 1, explanation: "The denominator and time scope support interpretation. The records give the lead a path to investigate responsibly." },
          { prompt: "How should you test the first version?", options: ["Ask whether the charts look modern", "Check that every chart fits on one screen", "Ask a teammate to choose a region and explain what they would investigate"], answer: 2, explanation: "A realistic task exposes whether the metric, comparison, and path to details actually support the decision." },
        ],
        flashcard: { front: "What should you check in a dashboard design review?", back: "The decision, metric definition and scope, scale and labels, access to details, accessibility, and behavior when results are stale, partial, or empty." },
        reading: [{ source: "kirk", locator: "Chapters 2–5 and 7–10, from brief to design decisions" }, { source: "handbook", locator: "IV.3 and IV.5, applications of exploratory and linked views" }, { source: "reasoning", locator: "Slides 7–8 and 40–42, justifying choices" }],
      },
    ],
  },
];

export const lessons = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({ ...lesson, moduleTitle: module.title })),
);

export type CourseLesson = (typeof lessons)[number];

export const totalMinutes = lessons.reduce((sum, lesson) => sum + lesson.minutes, 0);
