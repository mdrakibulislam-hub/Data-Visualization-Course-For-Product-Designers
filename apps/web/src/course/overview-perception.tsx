import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { Pause, Play } from "reicon-react";
import { useEffect, useId, useRef, useState } from "react";

/** The center radii never change. Only their surroundings and positions do. */
export function OverviewPerception({ isPreview = false }: { isPreview?: boolean }) {
  const [phase, setPhase] = useState(0);
  const compared = phase % 2 === 1;
  const swapped = phase >= 2;
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const figure = useRef<HTMLElement>(null);
  const id = useId();
  const resultId = `${id}-result`;
  const drawingId = `${id}-drawing`;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", updateMotion);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .25 });
    if (figure.current) observer.observe(figure.current);

    // The library's stretched course link receives pointer events over the drawing.
    // Observe its card so hovering still pauses the experiment without blocking navigation.
    const hoverArea = isPreview ? figure.current?.closest(".library-course-tile") : figure.current;
    const enter = (event: Event) => { if ((event as PointerEvent).pointerType === "mouse") setHovered(true); };
    const leave = () => setHovered(false);
    hoverArea?.addEventListener("pointerenter", enter);
    hoverArea?.addEventListener("pointerleave", leave);
    return () => {
      preference.removeEventListener("change", updateMotion);
      observer.disconnect();
      hoverArea?.removeEventListener("pointerenter", enter);
      hoverArea?.removeEventListener("pointerleave", leave);
    };
  }, [isPreview]);

  useEffect(() => {
    if (paused || hovered || focused || !inView || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setPhase((value) => (value + 1) % 4);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, inView, reducedMotion]);

  const pauseControl = !reducedMotion && <IconButton
    label={paused ? "Play context animation" : "Pause context animation"}
    tooltip={paused ? "Play context animation" : "Pause context animation"}
    icon={paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
    variant="ghost"
    size="sm"
    onClick={() => setPaused((value) => !value)}
  />;

  const content = <VStack
    as="figure"
    ref={figure}
    gap={0}
    className="hci-perception-figure"
    aria-label="Explore how surroundings change perceived size"
    data-compared={compared || undefined}
    data-swapped={swapped || undefined}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}
  >
    {isPreview ? <HStack gap={0} className="hci-perception-pause library-chart-controls">{pauseControl}</HStack> : <HStack justify="between" align="center" gap={2} className="hci-perception-heading">
      <Text as="p" weight="semibold">Which center looks larger?</Text>
      {pauseControl}
    </HStack>}
    <svg
      id={drawingId}
      viewBox="0 15 480 210"
      className="hci-perception-drawing"
      role="img"
      aria-label={compared ? "Two equal red circles aligned between matching diameter guides." : `Two red circles, one surrounded by small circles and one by large circles. ${isPreview ? "The animation brings the centers together to compare their size." : "Compare the centers to check their size."}`}
    >
      <g className="hci-perception-context" aria-hidden="true">
        {[126, 354].map((x, group) => {
          const large = Boolean(group) !== swapped;
          const distance = large ? 64 : 46;
          return <g key={x}>{Array.from({ length: 6 }, (_, index) => <circle
            key={index}
            r={1}
            transform={`translate(${x + Math.cos(index * Math.PI / 3) * distance} ${120 + Math.sin(index * Math.PI / 3) * distance}) scale(${large ? 25 : 10})`}
            className="hci-perception-neighbor"
          />)}</g>;
        })}
      </g>
      <g className="hci-perception-guides" aria-hidden="true">
        <path d="M180 100H300 M180 140H300" />
        <path d="M180 96V104 M300 96V104 M180 136V144 M300 136V144" />
        <path d="M236 117H244 M236 123H244" />
      </g>
      {[126, 354].map((x, index) => <circle
        key={x}
        r={20}
        transform={`translate(${compared ? index === 0 ? 208 : 272 : x} 120)`}
        className="hci-perception-center"
        aria-hidden="true"
      />)}
    </svg>
    {!isPreview && <HStack className="hci-perception-actions" gap={3} align="center" justify="between" wrap="wrap">
      <Button
        label={compared ? "Restore context" : "Compare centers"}
        variant="secondary"
        size="md"
        width="calc(var(--spacing-10) * 4)"
        aria-controls={drawingId}
        aria-describedby={resultId}
        onClick={() => {
          setPhase((value) => (value + 1) % 4);
          setPaused(true);
        }}
      />
      <Text as="p" id={resultId} className="hci-perception-result" type="supporting" color="secondary" role="status" aria-live={paused ? "polite" : "off"} aria-atomic="true">
        <Text as="span" className="hci-perception-message" type="supporting" color="secondary" data-active={!compared || undefined} aria-hidden={compared}>Only the surroundings change.</Text>
        <Text as="span" className="hci-perception-message" type="supporting" color="secondary" data-active={compared || undefined} aria-hidden={!compared}>Both centers are the same size.</Text>
      </Text>
    </HStack>}
  </VStack>;

  return isPreview ? <VStack className="hci-perception-preview" gap={0}>{content}</VStack> : <Card className="course-hero-figure hci-perception-hero" padding={4}>{content}</Card>;
}
