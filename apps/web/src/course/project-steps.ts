export const projectSteps = [
  { id: "brief", label: "Write the decision brief", description: "Name the reader, the question, and the action they need to take." },
  { id: "data", label: "Check the data and define the metric", description: "Specify what one row means, the denominator, and how to show missing values." },
  { id: "sketch", label: "Sketch the overview and its detail view", description: "Compare two chart forms. Give the strongest one labels, a time window, and a way to investigate." },
  { id: "test", label: "Test with a teammate", description: "Ask them what changed, what is uncertain, and what step they would take. Try a narrow screen." },
  { id: "handoff", label: "Write the handoff notes", description: "Identify the data source and owner, refresh cadence, and behavior when data is incomplete." },
] as const;

export type ProjectId = "delivery" | "onboarding";
export type ProjectStep = (typeof projectSteps)[number]["id"];

