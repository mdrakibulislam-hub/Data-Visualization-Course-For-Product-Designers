import type { SourceId } from "./curriculum";

type Source = {
  id: SourceId;
  title: string;
  credit: string;
  scope: string;
  perspective: string;
  parts: readonly { title: string; note: string }[];
  url?: string;
};

export const sources: readonly Source[] = [
  {
    id: "kirk",
    title: "Data Visualisation: A Handbook for Data Driven Design",
    credit: "Andy Kirk · SAGE · Second edition, 2019",
    scope: "Full book in the supplied PDF. Start here if you want a design process you can reuse.",
    perspective: "Kirk’s strength is the connection between small design decisions and the reader’s understanding. The chart catalogue is useful after you define the task. At work, keep a short decision record so you can explain why a visual, filter, or label exists.",
    parts: [
      { title: "Introduction and chapters 1–2 · Foundations", note: "Visualization helps people interpret and understand data. The process can loop as you learn more. Use trust, accessibility, and elegance as review criteria." },
      { title: "Chapters 3–5 · The thinking behind a chart", note: "Define the audience and situation, examine what the data contains, and decide which comparisons deserve attention. This transfers directly to stakeholder briefs, metric definitions, and dashboard defaults." },
      { title: "Chapters 6–7 · Charts and interaction", note: "Choose marks and encodings for the comparison. Give an interactive feature a clear purpose, such as narrowing the scope or revealing detail." },
      { title: "Chapters 8–10 and epilogue · The finished display", note: "Use labels, color, scale, and layout to guide attention and be clear about where the data came from. Treat these as decisions to test with readers." },
    ],
  },
  {
    id: "handbook",
    title: "Handbook of Data Visualization",
    credit: "Edited by Chun-houh Chen, Wolfgang Härdle, and Antony Unwin · Springer · 2008",
    scope: "Full edited reference in the supplied PDF. Read selected chapters alongside a real data problem.",
    perspective: "This collection is more technical than a product design guide. Its enduring value is in how it organizes dense information and supports exploration. The Java and XML implementation chapters reflect their era. The exercises apply their ideas about coordinating data and views to today’s web products.",
    parts: [
      { title: "I and II.1–II.3 · Introduction and graphics principles", note: "The introduction, history, critique, and static-graphics chapters show how charts can support exploration and communication. Start with II.2 when you want to critique whether a graphic fits the task." },
      { title: "II.4–II.7 and II.10 · Structure and many variables", note: "Networks show relationships, trees show hierarchy, and glyphs pack several measurements into one mark. Each can become hard to read at scale. Choose a focused view or group records when it helps the intended task." },
      { title: "II.8–II.9 and III.1 · Coordinated exploration", note: "Linked charts, tables, and geographic displays let the same selection appear in multiple places. A product designer can specify which panels share filter state and which retain their original scope." },
      { title: "III.2–III.6 · Views of complex data", note: "Tours and scaling project many variables into fewer dimensions. Grouping and density views help make crowded plots readable. Structured sets of graphs offer a simple alternative designers can prototype with common axes." },
      { title: "III.7–III.11 and III.16 · Models, smoothing, and clusters", note: "A fitted curve, cluster, or model can reveal structure while adding assumptions. Keep a path to the observations and ask what the model fails to explain. Start with the question before discussing a method." },
      { title: "III.12–III.15 · Categorical and high-dimensional views", note: "Contingency tables and mosaic views compare joint categories. Parallel coordinates can reveal patterns across many fields, while matrices help scan across rows and columns. Labels and ordering affect what a reader notices." },
      { title: "III.17–III.18 · Implementation", note: "The original Java and XML examples show the value of separating data, selection, and rendering. Carry that separation into the frontend and query design." },
      { title: "IV.1–IV.6 · Applied cases", note: "The case studies cover networks, medical images, financial outliers and risk, auctions, and insurance. The financial and auction chapters are especially good for seeing how linked detail or a distribution can challenge a summary." },
    ],
    url: "https://doi.org/10.1007/978-3-540-33037-0",
  },
  {
    id: "truthful-art",
    title: "The Truthful Art: Data, Charts, and Maps for Communication",
    credit: "Alberto Cairo · New Riders · 2016",
    scope: "The supplied PDF includes the preface, contents, chapter 4, and index. Chapter 4 is the basis for the course’s uncertainty lesson.",
    perspective: "Cairo makes uncertainty a design problem. A clear graphic still needs a sound claim. When a number changes after a release, name other plausible explanations and ask the analyst what the study can support.",
    parts: [
      { title: "Preface and chapter 4, pp. 99–116", note: "Move from a question to a testable conjecture. Check how the data was gathered, what an observational study can tell you, and when an experiment can help. Communicate uncertainty that changes how a reader should act." },
      { title: "Topics listed in the contents", note: "The contents point to further reading on distributions, change over time, association, maps, and significance in the full book." },
    ],
  },
  {
    id: "kirk-excerpt",
    title: "Defining Data Visualisation",
    credit: "Andy Kirk · SAGE · First edition, 2016",
    scope: "Chapter 1 excerpt from the first edition of Data Visualisation, printed pp. 19–52.",
    perspective: "This version spends time on what happens after someone sees a mark. Reading a bar is one step. Recognizing what it means for the task takes context.",
    parts: [
      { title: "Chapter 1 · Perceive, interpret, understand", note: "Apply the three stages in a design critique. Ask someone to describe what they see, what the values mean, and what they would do with the information." },
      { title: "Design principles and glossary", note: "The examples make trust and accessibility concrete. A formally valid scale can still mislead, and a display that takes too much effort can be wrong for a time-pressured decision." },
    ],
  },
  {
    id: "reasoning",
    title: "Reasoning for Data Visualization",
    credit: "Alberto Cairo · EUNIS keynote slides · 2020",
    scope: "Complete slide deck in the supplied PDF. Use it to discuss design choices with a team.",
    perspective: "Cairo treats a chart as a reasoned argument. This is a useful way to review a product dashboard: ask why it should exist, who benefits, what is missing, and what the chart could cause people to do.",
    parts: [
      { title: "Slides 5–19 · Purpose, measurement, and harm", note: "Explain why a view is worth publishing. Check who is represented and who is missing, and whether showing detailed records could harm people." },
      { title: "Slides 20–35 · Audience, detail, and encoding", note: "Teach readers how to read an unfamiliar chart. Check what an average hides, and justify the visual encoding by the comparison you need." },
      { title: "Slides 36–42 · Style and words", note: "Match the visual style to its setting. In a repeat-use dashboard, a familiar form with a helpful label can serve the reader better than a novel display." },
    ],
  },
];

export function sourceTitle(id: SourceId) {
  return sources.find((source) => source.id === id)?.title ?? id;
}
