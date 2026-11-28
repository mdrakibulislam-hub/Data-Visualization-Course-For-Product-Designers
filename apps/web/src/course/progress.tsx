import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { lessons, type CourseLesson } from "./curriculum";
import { useCurrentCourse } from "./course-context";
import { awardMilestones, completeChallenge, dayKey, rateReview, recordActivity, scheduleLesson } from "./learning-state";
import { projectSteps, type ProjectId, type ProjectStep } from "./project-steps";
import type { QuizSession } from "./quiz-data";
import { saveCourseProgress } from "./progress-storage";
import { publishProgress, readSavedProgress, useSavedProgress } from "./use-saved-progress";
import type { Progress } from "./progress-data";
import { hciProjectIds, hciStepIds, hciRubricIds, type HciProject, type HciProjectId } from "./hci/state";
export { createProgressBackup, readProgressBackup, type Progress } from "./progress-data";

type ProgressContextValue = {
  progress: Progress;
  today: string;
  setWeeklyGoal: (goal: number) => void;
  answerChallenge: (id: string, step: "fix" | "reason", answer: number | null) => void;
  restartChallenge: (id: string) => void;
  importProgress: (progress: Progress) => void;
  canSave: boolean;
  openLesson: (id: string) => void;
  completeLesson: (id: string) => void;
  submitAnswer: (id: string, index: number, answer: number | null) => void;
  saveCapstone: (note: string) => void;
  saveOnboardingDraft: (note: string) => void;
  checkProjectStep: (project: ProjectId, step: ProjectStep, checked: boolean) => void;
  saveQuiz: (session: QuizSession) => void;
  rateCard: (id: string, known: boolean, next: string | null) => void;
  saveHciNote: (id: string, note: string) => void;
  updateHciProject: (id: HciProjectId, change: (project: HciProject) => HciProject) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);
const answerIndex = (value: unknown): value is number => value === 0 || value === 1 || value === 2;

export function ProgressProvider({ children }: { children: ReactNode }) {
  const course = useCurrentCourse();
  const snapshot = useSavedProgress(course);
  const { quizScore } = course.content.quiz;
  const challengeFor = (id: string) => course.content.challenges.find((item) => item.lessonId === id);
  const latest = useRef(snapshot);
  latest.current = snapshot;
  const [today, setToday] = useState(dayKey);

  useEffect(() => {
    const refresh = () => setToday(dayKey());
    const timer = window.setInterval(refresh, 60_000);
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const update = useCallback((change: (previous: Progress) => Progress) => {
    let base = latest.current;
    if (base.canSave) {
      const stored = readSavedProgress(course);
      if (stored.canSave) base = stored;
    }
    const next = change(base.progress);
    const projectReady = (["delivery", "onboarding"] as const).some((project) =>
      (project === "delivery" ? next.capstone : next.onboardingDraft).trim().length > 0 && next.projectChecks[project].length === projectSteps.length);
    const progress = { ...next, learning: awardMilestones(next.learning, projectReady, dayKey(), course.content.lessons) };
    let saved;
    try { saved = saveCourseProgress(window.localStorage, course, progress); }
    catch { saved = { progress, canSave: false }; }
    latest.current = saved;
    publishProgress(course.id, saved);
  }, [course]);

  const openLesson = useCallback((id: string) => {
    if (latest.current.progress.lastLesson !== id) update((previous) => ({ ...previous, lastLesson: id }));
  }, [update]);

  const value: ProgressContextValue = {
    ...snapshot,
    today,
    setWeeklyGoal: (goal) => {
      if ([0, 2, 3, 4, 5].includes(goal)) update((previous) => ({ ...previous, learning: { ...previous.learning, weeklyGoal: goal } }));
    },
    importProgress: (progress) => update(() => progress),
    saveHciNote: (id, note) => {
      if (!course.content.interaction?.guides[id]) return;
      update((previous) => ({ ...previous, hci: { ...previous.hci, notes: { ...previous.hci.notes, [id]: note.slice(0, 1200) } } }));
    },
    updateHciProject: (id, change) => {
      if (!course.content.interaction || !hciProjectIds.includes(id)) return;
      update((previous) => {
        const proposed = change(previous.hci.projects[id]);
        const project: HciProject = {
          path: proposed.path === "field" ? "field" : "case",
          entries: Object.fromEntries(hciStepIds.filter((step) => typeof proposed.entries[step] === "string").map((step) => [step, proposed.entries[step]!.slice(0, 4000)])),
          checks: hciStepIds.filter((step) => proposed.checks.includes(step)),
          ratings: Object.fromEntries(hciRubricIds.filter((key) => Number.isInteger(proposed.ratings[key]) && proposed.ratings[key]! >= 0 && proposed.ratings[key]! <= 3).map((key) => [key, proposed.ratings[key]])),
        };
        return { ...previous, hci: { ...previous.hci, projects: { ...previous.hci.projects, [id]: project } }, learning: recordActivity(previous.learning, dayKey(), "projects", id) };
      });
    },
    answerChallenge: (id, step, answer) => {
      const challenge = challengeFor(id);
      if (!challenge || (answer !== null && !answerIndex(answer))) return;
      update((previous) => {
        const current = previous.learning.attempts[id] ?? { fix: null, reason: null };
        if (step === "reason" && current.fix !== challenge.fix.answer) return previous;
        const attempt = step === "fix" ? { fix: answer, reason: null } : { ...current, reason: answer };
        let learning = { ...previous.learning, attempts: { ...previous.learning.attempts, [id]: attempt } };
        if (attempt.fix === challenge.fix.answer && attempt.reason === challenge.reason.answer) learning = completeChallenge(learning, id, dayKey());
        return { ...previous, learning };
      });
    },
    restartChallenge: (id) => {
      if (challengeFor(id)) update((previous) => ({ ...previous, learning: { ...previous.learning, attempts: { ...previous.learning.attempts, [id]: { fix: null, reason: null } } } }));
    },
    openLesson,
    completeLesson: (id) => update((previous) => ({
      ...previous,
      completed: previous.completed.includes(id) ? previous.completed : [...previous.completed, id],
      learning: recordActivity(scheduleLesson(previous.learning, id, dayKey()), dayKey(), "lessons", id),
    })),
    submitAnswer: (id, index, answer) => update((previous) => {
      const answers = { ...previous.answers };
      const answerKey = `${id}:${index}`;
      if (answer === null) delete answers[answerKey];
      else answers[answerKey] = answer;
      return { ...previous, answers };
    }),
    saveCapstone: (capstone) => update((previous) => ({ ...previous, capstone, learning: capstone.trim() && capstone !== previous.capstone ? recordActivity(previous.learning, dayKey(), "projects", "delivery") : previous.learning })),
    saveOnboardingDraft: (onboardingDraft) => update((previous) => ({ ...previous, onboardingDraft, learning: onboardingDraft.trim() && onboardingDraft !== previous.onboardingDraft ? recordActivity(previous.learning, dayKey(), "projects", "onboarding") : previous.learning })),
    checkProjectStep: (project, step, checked) => update((previous) => {
      const next = new Set(previous.projectChecks[project]);
      if (checked) next.add(step);
      else next.delete(step);
      return { ...previous, projectChecks: { ...previous.projectChecks, [project]: [...next] }, learning: checked ? recordActivity(previous.learning, dayKey(), "projects", project) : previous.learning };
    }),
    saveQuiz: (quiz) => update((previous) => {
      if (quiz.cursor === quiz.ids.length && !quiz.retry) {
        const best = Math.max(quizScore(quiz), previous.quizBests[quiz.scope] ?? 0);
        return { ...previous, quiz, learning: recordActivity(previous.learning, dayKey(), "quiz"), quizBests: { ...previous.quizBests, [quiz.scope]: best } };
      }
      return { ...previous, quiz, learning: quiz.cursor === quiz.ids.length ? recordActivity(previous.learning, dayKey(), "quiz") : previous.learning };
    }),
    rateCard: (id, known, reviewCard) => update((previous) => ({
      ...previous,
      knownCards: known ? [...new Set([...previous.knownCards, id])] : previous.knownCards.filter((card) => card !== id),
      reviewCard,
      learning: rateReview(previous.learning, id, known, dayKey()),
    })),
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("Course progress requires ProgressProvider");
  return context;
}

export function getResumeLesson({ lastLesson, completed }: Progress, courseLessons: readonly CourseLesson[] = lessons) {
  const lessons = courseLessons;
  const lastIndex = lessons.findIndex(({ id }) => id === lastLesson);
  if (lastIndex >= 0 && !completed.includes(lessons[lastIndex].id)) return lessons[lastIndex];
  return lessons.slice(lastIndex + 1).find(({ id }) => !completed.includes(id))
    ?? lessons.find(({ id }) => !completed.includes(id));
}
