import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Link } from "@tanstack/react-router";
import { useCurrentCourse } from "./course-context";
import { coursePageHref } from "./catalog";
import { dueLessonIds, weeklyDays } from "./learning-state";
import { useProgress } from "./progress";

export function LearningSummary() {
  const course = useCurrentCourse();
  const { challenges, lessons, milestones: milestoneDefinitions } = course.content;
  const { progress, today } = useProgress();
  const { learning } = progress;
  const due = dueLessonIds(learning, progress.completed, progress.knownCards, today, lessons);
  const practice = challenges.find(({ lessonId }) => progress.completed.includes(lessonId) && !learning.challenges[lessonId]);
  const days = weeklyDays(learning, today);
  const latest = milestoneDefinitions.filter(({ id }) => learning.milestones[id]).reverse().sort((a, b) => learning.milestones[b.id]!.localeCompare(learning.milestones[a.id]!))[0];
  if (!due.length && !practice && !learning.weeklyGoal && !latest) return null;
  return (
    <VStack as="section" gap={3} className="learning-next" aria-label="Your next learning step">
      {(due.length > 0 || practice) && <HStack justify="between" align="center" wrap="wrap" gap={3}>
        <VStack gap={1}>
          <Heading level={2}>{due.length ? `${due.length} ${due.length === 1 ? "idea" : "ideas"} ready to revisit` : "Put the idea into practice"}</Heading>
          <Text as="p" color="secondary">{due.length ? "A short recall session helps you keep what you’ve learned." : practice!.title}</Text>
        </VStack>
        <Button href={due.length ? coursePageHref(course, "review") : `/challenges?lesson=${practice!.lessonId}`} label={due.length ? "Review now" : "Try the challenge"} variant="secondary" />
      </HStack>}
      {(learning.weeklyGoal > 0 || latest) && <HStack gap={3} justify="between" align="center" wrap="wrap">
        {learning.weeklyGoal > 0 && <Link to="/courses/$courseId/$page" params={{ courseId: course.id, page: "preferences" }} className="learning-quiet-link">{days >= learning.weeklyGoal ? "Weekly goal reached" : "This week"} · {days} of {learning.weeklyGoal} practice days</Link>}
        {latest && <Link to="/courses/$courseId/$page" params={{ courseId: course.id, page: "preferences" }} hash="milestones" className="learning-quiet-link">Milestone · {latest.title}</Link>}
      </HStack>}
    </VStack>
  );
}
