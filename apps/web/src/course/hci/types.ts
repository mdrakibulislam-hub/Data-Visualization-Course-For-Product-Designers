export const hciCourseId = "human-computer-interaction";
export type GlossaryEntry = { term: string; meaning: string; example: string };
export type LessonGuide = { objective: string; prediction: string; worked: string; deeper: string; terms: readonly string[]; lab?: string };
export type LabKind = "search" | "memory" | "model" | "tasks" | "feedback" | "recovery" | "direct" | "form" | "pointing" | "find" | "help" | "keyboard" | "consent" | "evidence" | "collaboration" | "ai";
export type InteractionLab = { id: LabKind; title: string; lessonId: string; prompt: string; explanation: string };
export type InteractionContent = { guides: Readonly<Record<string, LessonGuide>>; labs: readonly InteractionLab[]; glossary: readonly GlossaryEntry[]; moduleOutputs: readonly { title: string; prompt: string; example: string }[] };
