import { lessons, modules, type Question, type CourseLesson } from "./curriculum";

export type QuizEntry = Question & { id: string; scope: string; lessonId?: string };

export const studioScope = "Studio scenarios";

const studioQuestions: readonly Question[] = [
  { prompt: "A circle’s radius doubles. How much larger is its area?", options: ["Twice as large", "Four times as large", "The same size"], answer: 1, explanation: "Area grows with the square of the radius. For a value twice as large, multiply the radius by about 1.41." },
  { prompt: "The same setup times look smoother in a histogram with wider bins. What changed?", options: ["The customers completed setup faster", "The sample size increased", "Nearby values were grouped together"], answer: 2, explanation: "The values stay the same. Wider bins combine more observations and can hide local peaks." },
  { prompt: "Mobile has 40 completions out of 100 signups. Desktop has 8 out of 10. What is the overall user rate?", options: ["43.6%, using 48 of 110 signups", "60%, averaging the two rates", "80%, since desktop has the higher rate"], answer: 0, explanation: "Each eligible signup should count once. Use the combined completions and the combined eligible group." },
  { prompt: "Desktop completions are unavailable for the latest week. What should you tell the product lead?", options: ["Desktop activation was 0%", "The latest all-platform rate is incomplete", "Desktop matched the prior week"], answer: 1, explanation: "The denominator alone tells us how many were eligible. We need the completion count to find the rate." },
  { prompt: "You need a palette for ordered satisfaction scores from 1 to 5. What fits?", options: ["Five unrelated hues", "A sequential palette with visible score labels", "A diverging palette centered on the highest score"], answer: 1, explanation: "A sequential palette uses steps of lightness to reinforce the numeric order. Labels still carry the exact values." },
  { prompt: "Mobile activation improved after the rollout began. What can you conclude from the trend?", options: ["The improvement was observed, and its cause needs more evidence", "The rollout caused the entire improvement", "The rollout improved every user’s experience"], answer: 0, explanation: "The annotation marks timing. Attribution requires evidence that accounts for other changes, such as who signed up that week." },
];


export type QuizSession = {
  scope: string;
  ids: string[];
  answers: number[];
  cursor: number;
  retry: boolean;
};

export function createQuizBank(courseLessons: readonly CourseLesson[], courseModules: readonly { title: string }[], extras: readonly Question[] = []) {
  const quizScopes = [
    { value: "all", label: "All topics" },
    ...courseModules.map(({ title }) => ({ value: title, label: title })),
    ...(extras.length ? [{ value: studioScope, label: studioScope }] : []),
  ];
  const practiceQuestions: readonly QuizEntry[] = [
    ...courseLessons.flatMap((lesson) => lesson.questions.map((question, index) => ({ ...question, id: `${lesson.id}:${index}`, scope: lesson.moduleTitle, lessonId: lesson.id }))),
    ...extras.map((question, index) => ({ ...question, id: `studio:${index}`, scope: studioScope })),
  ];
  const questionById = new Map(practiceQuestions.map((question) => [question.id, question]));
  const questionsForScope = (scope: string) => practiceQuestions.filter((question) => scope === "all" || question.scope === scope);
  const quizScore = (session: QuizSession) => session.ids.filter((id, index) => questionById.get(id)?.answer === session.answers[index]).length;
  function isQuizScope(value: unknown): value is string { return quizScopes.some(({ value: scope }) => scope === value); }
  return { quizScopes, practiceQuestions, questionById, questionsForScope, quizScore, isQuizScope };
}

export const dataVisualizationQuiz = createQuizBank(lessons, modules, studioQuestions);
export const { quizScopes, practiceQuestions, questionById, questionsForScope, quizScore, isQuizScope } = dataVisualizationQuiz;
