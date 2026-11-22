import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { lessons } from "./curriculum";
import { projectSteps, type ProjectId, type ProjectStep } from "./project-steps";
import { isQuizScope, questionById, questionsForScope, quizScore, type QuizSession } from "./quiz-data";

const key = "data-viz-field-guide.progress.v1";
const lessonIds = new Set(lessons.map(({ id }) => id));

type Progress = {
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

const emptyProgress: Progress = {
  lastLesson: null,
  completed: [],
  answers: {},
  knownCards: [],
  reviewCard: null,
  capstone: "",
  onboardingDraft: "",
  projectChecks: { delivery: [], onboarding: [] },
  quiz: null,
  quizBests: {},
};

function isLesson(id: unknown): id is string {
  return typeof id === "string" && lessonIds.has(id);
}

function listOfLessons(list: unknown) {
  return Array.isArray(list) ? [...new Set(list.filter(isLesson))] : [];
}

function checkedSteps(value: unknown): ProjectStep[] {
  return Array.isArray(value) ? projectSteps.map(({ id }) => id).filter((id) => value.includes(id)) : [];
}

function answerIndex(value: unknown): value is number {
  return value === 0 || value === 1 || value === 2;
}

function readQuiz(value: unknown): QuizSession | null {
  if (!value || typeof value !== "object") return null;
  const { scope, ids, answers, cursor, retry } = value as Record<string, unknown>;
  if (!isQuizScope(scope) || !Array.isArray(ids) || !ids.length || new Set(ids).size !== ids.length) return null;
  if (!ids.every((id) => {
    const entry = typeof id === "string" ? questionById.get(id) : undefined;
    return entry && (scope === "all" || entry.scope === scope);
  })) return null;
  if (typeof cursor !== "number" || !Number.isInteger(cursor) || cursor < 0 || cursor > ids.length) return null;
  if (!Array.isArray(answers) || !answers.every(answerIndex) || answers.length < cursor || answers.length > Math.min(ids.length, cursor + 1)) return null;
  return { scope, ids, answers, cursor, retry: retry === true };
}

function readQuizBests(value: unknown) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(Object.entries(value).filter(([scope, score]) =>
    isQuizScope(scope) && typeof score === "number" && Number.isInteger(score) && score >= 0 && score <= questionsForScope(scope).length));
}

function parseProgress(raw: string | null): Progress {
  if (!raw) return emptyProgress;
  try {
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return emptyProgress;
    const answers: Progress["answers"] = {};
    for (const lesson of lessons) {
      for (let index = 0; index < lesson.questions.length; index += 1) {
        const answerKey = `${lesson.id}:${index}`;
        const answer = saved.answers?.[answerKey];
        if (answerIndex(answer)) answers[answerKey] = answer;
      }
    }
    return {
      lastLesson: isLesson(saved.lastLesson) ? saved.lastLesson : null,
      completed: listOfLessons(saved.completed),
      answers,
      knownCards: listOfLessons(saved.knownCards),
      reviewCard: isLesson(saved.reviewCard) ? saved.reviewCard : null,
      capstone: typeof saved.capstone === "string" ? saved.capstone.slice(0, 2500) : "",
      onboardingDraft: typeof saved.onboardingDraft === "string" ? saved.onboardingDraft.slice(0, 2500) : "",
      projectChecks: {
        delivery: checkedSteps(saved.projectChecks?.delivery),
        onboarding: checkedSteps(saved.projectChecks?.onboarding),
      },
      quiz: readQuiz(saved.quiz),
      quizBests: readQuizBests(saved.quizBests),
    };
  } catch {
    return emptyProgress;
  }
}

function readProgress() {
  try {
    return { progress: parseProgress(window.localStorage.getItem(key)), canSave: true };
  } catch {
    return { progress: emptyProgress, canSave: false };
  }
}

type ProgressContextValue = {
  progress: Progress;
  canSave: boolean;
  openLesson: (id: string) => void;
  completeLesson: (id: string) => void;
  submitAnswer: (id: string, index: number, answer: number | null) => void;
  saveCapstone: (note: string) => void;
  saveOnboardingDraft: (note: string) => void;
  checkProjectStep: (project: ProjectId, step: ProjectStep, checked: boolean) => void;
  saveQuiz: (session: QuizSession) => void;
  rateCard: (id: string, known: boolean, next: string | null) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [snapshot, setSnapshot] = useState(readProgress);
  const latest = useRef(snapshot);

  useEffect(() => {
    function sync(event: StorageEvent) {
      if (event.key === key || event.key === null) {
        latest.current = readProgress();
        setSnapshot(latest.current);
      }
    }
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const update = useCallback((change: (previous: Progress) => Progress) => {
    let base = latest.current;
    if (base.canSave) {
      const stored = readProgress();
      if (stored.canSave) base = stored;
    }
    const progress = change(base.progress);
    let canSave = true;
    try {
      window.localStorage.setItem(key, JSON.stringify(progress));
    } catch {
      canSave = false;
    }
    latest.current = { progress, canSave };
    setSnapshot(latest.current);
  }, []);

  const openLesson = useCallback((id: string) => {
    if (latest.current.progress.lastLesson !== id) update((previous) => ({ ...previous, lastLesson: id }));
  }, [update]);

  const value: ProgressContextValue = {
    ...snapshot,
    openLesson,
    completeLesson: (id) => update((previous) => ({
      ...previous,
      completed: previous.completed.includes(id) ? previous.completed : [...previous.completed, id],
    })),
    submitAnswer: (id, index, answer) => update((previous) => {
      const answers = { ...previous.answers };
      const answerKey = `${id}:${index}`;
      if (answer === null) delete answers[answerKey];
      else answers[answerKey] = answer;
      return { ...previous, answers };
    }),
    saveCapstone: (capstone) => update((previous) => ({ ...previous, capstone })),
    saveOnboardingDraft: (onboardingDraft) => update((previous) => ({ ...previous, onboardingDraft })),
    checkProjectStep: (project, step, checked) => update((previous) => {
      const next = new Set(previous.projectChecks[project]);
      if (checked) next.add(step);
      else next.delete(step);
      return { ...previous, projectChecks: { ...previous.projectChecks, [project]: [...next] } };
    }),
    saveQuiz: (quiz) => update((previous) => {
      if (quiz.cursor === quiz.ids.length && !quiz.retry) {
        const best = Math.max(quizScore(quiz), previous.quizBests[quiz.scope] ?? 0);
        return { ...previous, quiz, quizBests: { ...previous.quizBests, [quiz.scope]: best } };
      }
      return { ...previous, quiz };
    }),
    rateCard: (id, known, reviewCard) => update((previous) => ({
      ...previous,
      knownCards: known ? [...new Set([...previous.knownCards, id])] : previous.knownCards.filter((card) => card !== id),
      reviewCard,
    })),
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("Course progress requires ProgressProvider");
  return context;
}

export function getResumeLesson({ lastLesson, completed }: Progress) {
  const lastIndex = lessons.findIndex(({ id }) => id === lastLesson);
  if (lastIndex >= 0 && !completed.includes(lessons[lastIndex].id)) return lessons[lastIndex];
  return lessons.slice(lastIndex + 1).find(({ id }) => !completed.includes(id))
    ?? lessons.find(({ id }) => !completed.includes(id));
}
