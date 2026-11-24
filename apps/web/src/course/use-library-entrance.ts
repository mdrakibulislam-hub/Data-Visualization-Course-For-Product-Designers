import { useLayoutEffect, useRef } from "react";

/** A short entrance; content below the fold joins once it comes into view. */
export function useLibraryEntrance() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const main = ref.current;
    if (!main || typeof main.animate !== "function" || typeof IntersectionObserver === "undefined") return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || window.scrollY > 0 || location.hash) return;

    const styles = getComputedStyle(main);
    const easing = styles.getPropertyValue("--ease-standard").trim() || "ease-out";
    const animations = new Set<Animation>();
    const targets = [...main.querySelectorAll<HTMLElement>(".library-course-tile, .library-creator")];
    const header = main.closest(".library-shell")?.querySelector<HTMLElement>(".library-header-inner");

    function enter(element: HTMLElement, delay = 0) {
      if (element.contains(document.activeElement)) return;
      const animation = element.animate([
        { opacity: 0, translate: "0 var(--spacing-4)" },
        { opacity: 1, translate: "0 0" },
      ], { duration: 420, delay, easing, fill: "backwards" });
      animations.add(animation);
      void animation.finished.then(() => animations.delete(animation), () => animations.delete(animation));
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (!preference.matches) enter(entry.target as HTMLElement);
      }
    }, { threshold: .1 });

    if (header) enter(header);
    targets.forEach((target, index) => {
      if (target.getBoundingClientRect().top < innerHeight) enter(target, 60 + Math.min(index, 3) * 70);
      else observer.observe(target);
    });

    const settle = () => {
      if (!preference.matches) return;
      observer.disconnect();
      for (const animation of animations) animation.cancel();
      animations.clear();
    };
    preference.addEventListener("change", settle);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", settle);
      for (const animation of animations) animation.cancel();
    };
  }, []);

  return ref;
}
