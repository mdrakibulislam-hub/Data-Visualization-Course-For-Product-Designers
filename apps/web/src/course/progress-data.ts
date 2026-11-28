import { dataVisualizationCourse, dataVisualizationId, type AvailableCourse } from "./catalog";
import { emptyLearning, parseLearning, type LearningState } from "./learning-state";
import { projectSteps, type ProjectId, type ProjectStep } from "./project-steps";
import type { QuizSession } from "./quiz-data";
import { emptyHciProgress, parseHciProgress, hciProjectIds, type HciProgress } from "./hci/state";

export type Progress = {
  hci: HciProgress;
  learning: LearningState;
  lastLesson: string | null;
  completed: string[];
  answers: Record<string, number>;
  knownCards: string[];
  reviewCard: string | null;
  capstone: string;
  onboardingDraft: string;
  projectChecks: Record<ProjectId, ProjectStep[]>;
  quiz: QuizSession | null;
  quizBests: Record<string, number>;
};

export function emptyProgress(): Progress {
  return {
    hci: emptyHciProgress(), learning: emptyLearning(), lastLesson: null, completed: [], answers: {}, knownCards: [], reviewCard: null,
    capstone: "", onboardingDraft: "", projectChecks: { delivery: [], onboarding: [] }, quiz: null, quizBests: {},
  };
}
const object = (value: unknown): Record<string, unknown> => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const answerIndex = (value: unknown): value is number => value === 0 || value === 1 || value === 2;
const checkedSteps = (value: unknown): ProjectStep[] => Array.isArray(value) ? projectSteps.map(({ id }) => id).filter((id) => value.includes(id)) : [];

export function parseCourseProgress(value: unknown, course: AvailableCourse = dataVisualizationCourse): Progress {
  const { lessons, quiz: bank } = course.content;
  const lessonIds = new Set(lessons.map(({ id }) => id));
  const isLesson = (id: unknown): id is string => typeof id === "string" && lessonIds.has(id);
  const list = (value: unknown) => Array.isArray(value) ? [...new Set(value.filter(isLesson))] : [];
  const saved = object(value);
  const rawAnswers = object(saved.answers);
  const projects = object(saved.projectChecks);
  const answers: Record<string, number> = {};
  for (const lesson of lessons) {
    for (let index = 0; index < lesson.questions.length; index += 1) {
      const key = `${lesson.id}:${index}`;
      if (answerIndex(rawAnswers[key])) answers[key] = rawAnswers[key];
    }
  }
  function readQuiz(value: unknown): QuizSession | null {
    const { scope, ids, answers, cursor, retry } = object(value);
    if (!bank.isQuizScope(scope) || !Array.isArray(ids) || !ids.length || new Set(ids).size !== ids.length) return null;
    if (!ids.every((id): id is string => {
      const entry = typeof id === "string" ? bank.questionById.get(id) : undefined;
      return Boolean(entry && (scope === "all" || entry.scope === scope));
    })) return null;
    if (typeof cursor !== "number" || !Number.isInteger(cursor) || cursor < 0 || cursor > ids.length) return null;
    if (!Array.isArray(answers) || !answers.every(answerIndex) || answers.length < cursor || answers.length > Math.min(ids.length, cursor + 1)) return null;
    return { scope, ids, answers, cursor, retry: retry === true };
  }
  const quizBests = Object.fromEntries(Object.entries(object(saved.quizBests)).filter((entry): entry is [string, number] => {
    const [scope, score] = entry;
    return bank.isQuizScope(scope) && typeof score === "number" && Number.isInteger(score) && score >= 0 && score <= bank.questionsForScope(scope).length;
  }));
  return {
    hci: course.content.interaction ? parseHciProgress(saved.hci, lessonIds) : emptyHciProgress(),
    learning: parseLearning(saved.learning, lessons, course.content.interaction ? hciProjectIds : ["delivery", "onboarding"]),
    lastLesson: isLesson(saved.lastLesson) ? saved.lastLesson : null,
    completed: list(saved.completed), answers, knownCards: list(saved.knownCards),
    reviewCard: isLesson(saved.reviewCard) ? saved.reviewCard : null,
    capstone: typeof saved.capstone === "string" ? saved.capstone.slice(0, 2500) : "",
    onboardingDraft: typeof saved.onboardingDraft === "string" ? saved.onboardingDraft.slice(0, 2500) : "",
    projectChecks: { delivery: checkedSteps(projects.delivery), onboarding: checkedSteps(projects.onboarding) },
    quiz: readQuiz(saved.quiz), quizBests,
  };
}

export function createProgressBackup(progress: Progress, course: AvailableCourse = dataVisualizationCourse, savedAt = new Date().toISOString()) {
  return { format: "graphnotes-progress", version: 2, courseId: course.id, savedAt, progress };
}

export function readProgressBackup(text: string, course: AvailableCourse = dataVisualizationCourse): Progress {
  const backup = JSON.parse(text);
  const supported = (backup?.version === 1 && course.id === dataVisualizationId) || (backup?.version === 2 && backup.courseId === course.id);
  if (backup?.format !== "graphnotes-progress" || !supported || !backup.progress || typeof backup.progress !== "object" ||
      !Array.isArray(backup.progress.completed) || !backup.progress.answers || typeof backup.progress.answers !== "object" || Array.isArray(backup.progress.answers)) {
    throw new Error(`Choose a progress backup for ${course.title}.`);
  }
  return parseCourseProgress(backup.progress, course);
}
