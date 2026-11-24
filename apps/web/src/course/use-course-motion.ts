import { useLayoutEffect, useRef } from "react";

import { useCurrentCourse } from "./course-context";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function motionTiming(element: HTMLElement) {
  const styles = getComputedStyle(element);
  const duration = styles.getPropertyValue("--duration-medium").trim();
  return {
    duration: (parseFloat(duration) || 0) * (duration.endsWith("ms") ? 1 : 1000),
    easing: styles.getPropertyValue("--ease-standard").trim() || "ease-out",
  };
}

function pageOffset(from: string | null, to: string, lessons: readonly { id: string }[]) {
  if (to.includes("/lesson/") || to.includes("/lessons/")) {
    const previous = lessons.findIndex(({ id }) => from?.endsWith(`/lesson/${id}`) || from?.endsWith(`/lessons/${id}`));
    const next = lessons.findIndex(({ id }) => to.endsWith(`/lesson/${id}`) || to.endsWith(`/lessons/${id}`));
    return previous > next && next !== -1
      ? "calc(-1 * var(--spacing-8)) 0"
      : "var(--spacing-8) 0";
  }
  if (to === "/course" && from?.startsWith("/lesson/")) return "calc(-1 * var(--spacing-8)) 0";
  return "0 var(--spacing-2)";
}

/** Animate the live content, so navigation never waits for an exit or remounts saved work. */
export function useCourseMotion(pathname: string) {
  const { content: { lessons } } = useCurrentCourse();
  const frame = useRef<HTMLElement>(null);
  const previousPath = useRef<string | null>(null);

  useLayoutEffect(() => {
    const element = frame.current;
    const from = previousPath.current;
    previousPath.current = pathname;
    if (!element || typeof element.animate !== "function") return;

    const preference = matchMedia(reducedMotionQuery);
    // A hash destination should arrive exactly where the reader expects it.
    if (preference.matches || location.hash) return;

    const animation = element.animate([
      { opacity: .55, translate: from ? pageOffset(from, pathname, lessons) : "0 var(--spacing-2)" },
      { opacity: 1, translate: "0 0" },
    ], motionTiming(element));
    const cancel = () => animation.cancel();
    preference.addEventListener("change", cancel);
    return () => {
      preference.removeEventListener("change", cancel);
      cancel();
    };
  }, [pathname, lessons]);

  useLayoutEffect(() => {
    const element = frame.current;
    if (!element || typeof IntersectionObserver === "undefined" || typeof element.animate !== "function") return;

    const preference = matchMedia(reducedMotionQuery);
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const timing = motionTiming(element);

    function isReading(target: HTMLElement) {
      let hash = location.hash.slice(1);
      try { hash = decodeURIComponent(hash); } catch { /* A malformed hash is still a valid URL. */ }
      const hashTarget = hash && document.getElementById(hash);
      return target.contains(document.activeElement) || (hashTarget && target.contains(hashTarget));
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        const target = entry.target as HTMLElement;
        // Leave restored positions, focused content and fast upward scrolling undisturbed.
        if (preference.matches || entry.boundingClientRect.top < 0 || isReading(target)) continue;
        const animation = target.animate([
          { opacity: .55, translate: "0 var(--spacing-3)" },
          { opacity: 1, translate: "0 0" },
        ], timing);
        animations.add(animation);
        void animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
      }
    }, { rootMargin: "0px 0px -24px 0px", threshold: 0 });

    function discover() {
      for (const target of element!.querySelectorAll<HTMLElement>("[data-scroll-reveal]")) {
        if (seen.has(target) || !target.getClientRects().length) continue;
        seen.add(target);
        // Content already on screen participates in the page entrance, never a second reveal.
        if (preference.matches || target.getBoundingClientRect().top < innerHeight) continue;
        observer.observe(target);
      }
    }

    function settle() {
      if (!preference.matches) return;
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
    }

    discover();
    // Catalog filters and practice tabs can add sections without changing the route.
    const mutations = new MutationObserver(discover);
    mutations.observe(element, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
    preference.addEventListener("change", settle);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", settle);
      for (const animation of animations) animation.cancel();
    };
  }, [pathname, lessons]);

  return frame;
}
