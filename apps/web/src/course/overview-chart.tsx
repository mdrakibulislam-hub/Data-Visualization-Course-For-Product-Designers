import { Card } from "@astryxdesign/core/Card";
import { HStack } from "@astryxdesign/core/HStack";
import { IconButton } from "@astryxdesign/core/IconButton";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { ArrowRight, Pause, Play } from "reicon-react";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { weekdayOrders } from "./lab-data";

const styles = ["Columns", "Line", "Area", "Lollipop"] as const;
type ChartStyle = (typeof styles)[number];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const plot = { left: 36, right: 424, top: 22, bottom: 180 };
const step = (plot.right - plot.left) / weekdayOrders.length;
const points = weekdayOrders.map(([, value], index) => ({
  x: plot.left + step * (index + .5),
  y: plot.bottom - value / 60 * (plot.bottom - plot.top),
}));
const linePath = points.map(({ x, y }, index) => `${index ? "L" : "M"}${x},${y}`).join(" ");
const areaPath = `${linePath} L${points.at(-1)!.x},${plot.bottom} L${points[0].x},${plot.bottom} Z`;
const particles = points.flatMap(({ x, y }, index) => [0, 1, 2].map((part) => ({
  x: x + (part - 1) * 8,
  y: y + part * 7,
  day: index,
  style: {
    "--dust-x": `${(index % 2 ? -1 : 1) * (12 + part * 9)}px`,
    "--dust-y": `${-14 - (index + part) % 4 * 9}px`,
    "--dust-delay": `${part * 30}ms`,
  } as CSSProperties,
})));

function PlotMarks({ kind, selected, onInspect, hasValue = true }: { kind: ChartStyle; selected: number; onInspect?: (index: number) => void; hasValue?: boolean }) {
  function moveFocus(event: KeyboardEvent<SVGGElement>, index: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onInspect?.(index);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const next = (index + (event.key === "ArrowRight" ? 1 : -1) + weekdayOrders.length) % weekdayOrders.length;
      event.currentTarget.parentElement?.querySelectorAll<SVGGElement>("[data-day]")[next]?.focus();
    }
  }

  return (
    <>
      {kind === "Area" && <path d={areaPath} className="overview-chart-area" />}
      {(kind === "Line" || kind === "Area") && <path d={linePath} className="overview-chart-line" />}
      <g>
        {weekdayOrders.map(([day, value], index) => {
          const { x, y } = points[index];
          return (
            <g
              key={day}
              data-day={index}
              data-active={index === selected || undefined}
              className="overview-chart-mark"
              role={onInspect ? "button" : undefined}
              tabIndex={onInspect ? 0 : undefined}
              aria-label={onInspect ? `${days[index]}, ${value} orders` : undefined}
              onPointerEnter={onInspect ? () => onInspect(index) : undefined}
              onFocus={onInspect ? () => onInspect(index) : undefined}
              onClick={onInspect ? () => onInspect(index) : undefined}
              onKeyDown={onInspect ? (event) => moveFocus(event, index) : undefined}
            >
              {kind === "Columns" ? (
                <rect x={x - step * .35} y={y} width={step * .7} height={plot.bottom - y} rx={3} className="overview-chart-fill" />
              ) : (
                <>
                  {kind === "Lollipop" && <line x1={x} y1={plot.bottom} x2={x} y2={y} className="overview-chart-stem" />}
                  <circle cx={x} cy={y} r={kind === "Lollipop" ? 6 : 4.5} className="overview-chart-fill" />
                </>
              )}
              {hasValue && index === selected && <text x={x} y={y - 10} textAnchor="middle" className="overview-chart-value">{value}</text>}
              {onInspect && <rect x={x - step / 2} y={plot.top - 16} width={step} height={plot.bottom - plot.top + 20} rx={4} className="overview-chart-hit" />}
            </g>
          );
        })}
      </g>
    </>
  );
}

export function OverviewChart({ isPreview = false }: { isPreview?: boolean }) {
  const [chart, setChart] = useState<{ current: number; previous: number | null }>({ current: 0, previous: null });
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [selected, setSelected] = useState(4);
  const figure = useRef<HTMLElement>(null);
  const clipId = useId();

  const nextStyle = useCallback(() => {
    setChart(({ current }) => ({ current: (current + 1) % styles.length, previous: reducedMotion ? null : current }));
  }, [reducedMotion]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", updateMotion);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .25 });
    if (figure.current) observer.observe(figure.current);
    return () => {
      preference.removeEventListener("change", updateMotion);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || !inView || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) nextStyle();
    }, 3000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, inView, reducedMotion, nextStyle, chart.current]);

  useEffect(() => {
    if (chart.previous === null) return;
    const timer = window.setTimeout(() => setChart((current) => ({ ...current, previous: null })), 700);
    return () => window.clearTimeout(timer);
  }, [chart.current, chart.previous]);

  const content = (
    <VStack as="figure" ref={figure} gap={0} aria-label="Orders by weekday">
      {isPreview && !reducedMotion && (
        <HStack gap={0} className="library-chart-controls">
          <IconButton
            label={paused ? "Resume chart rotation" : "Pause chart rotation"}
            tooltip={paused ? "Resume chart rotation" : "Pause chart rotation"}
            icon={paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            variant="ghost"
            size="sm"
            onClick={() => setPaused((value) => !value)}
          />
        </HStack>
      )}
      {!isPreview && (
        <>
          <HStack justify="between" align="center" gap={2} className="overview-chart-heading">
            <Text as="p" weight="semibold">Orders by weekday</Text>
            <HStack gap={0}>
              {!reducedMotion && (
                <IconButton
                  label={paused ? "Resume chart rotation" : "Pause chart rotation"}
                  tooltip={paused ? "Resume chart rotation" : "Pause chart rotation"}
                  icon={paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
                  variant="ghost"
                  size="sm"
                  onClick={() => setPaused((value) => !value)}
                />
              )}
              <IconButton
                label="Next chart style"
                tooltip="Next chart style"
                icon={<ArrowRight size={16} aria-hidden="true" />}
                variant="ghost"
                size="sm"
                onClick={nextStyle}
              />
            </HStack>
          </HStack>
          <HStack justify="between" gap={2} className="course-axis-unit">
            <Text type="supporting" color="secondary">Orders</Text>
            <Text type="supporting" color="secondary">{styles[chart.current]}</Text>
          </HStack>
        </>
      )}
      <svg
        viewBox={isPreview ? "0 -36 460 258.75" : "0 0 440 210"}
        className="overview-chart"
        role={isPreview ? "img" : "group"}
        aria-label={isPreview ? `${styles[chart.current]} chart preview` : `${styles[chart.current]} chart. Inspect a weekday for its order count.`}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
        }}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={plot.left - 4} y={0} width={plot.right - plot.left + 8} height={plot.bottom + 4} />
          </clipPath>
        </defs>
        {[0, 15, 30, 45, 60].map((value) => {
          const y = plot.bottom - value / 60 * (plot.bottom - plot.top);
          return (
            <g key={value} aria-hidden="true">
              <line x1={plot.left} x2={plot.right} y1={y} y2={y} className="overview-chart-grid" />
              {!isPreview && <text x={plot.left - 9} y={y + 4} textAnchor="end" className="overview-chart-label">{value}</text>}
            </g>
          );
        })}
        <g clipPath={`url(#${clipId})`}>
          {chart.previous !== null && !reducedMotion && (
            <g key={`out-${chart.current}`} className="overview-chart-outgoing" aria-hidden="true" pointerEvents="none">
              <PlotMarks kind={styles[chart.previous]} selected={selected} hasValue={!isPreview} />
            </g>
          )}
          <g key={chart.current} className={chart.previous !== null && !reducedMotion ? "overview-chart-incoming" : undefined}>
            <PlotMarks kind={styles[chart.current]} selected={selected} hasValue={!isPreview} onInspect={isPreview ? undefined : setSelected} />
          </g>
          {chart.previous !== null && !reducedMotion && (
            <g key={`dust-${chart.current}`} aria-hidden="true" pointerEvents="none">
              {particles.map(({ x, y, day, style }, index) => (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={1.5 + index % 3 * .4}
                  className="overview-chart-dust"
                  data-accent={day === selected || undefined}
                  style={style}
                />
              ))}
            </g>
          )}
        </g>
        {!isPreview && weekdayOrders.map(([day], index) => <text key={day} x={points[index].x} y={203} textAnchor="middle" className="overview-chart-label" aria-hidden="true">{day}</text>)}
      </svg>
      {!isPreview && <figcaption>{selected === 4 ? "Friday was busiest, with 58 orders." : `${days[selected]} had ${weekdayOrders[selected][1]} orders.`}</figcaption>}
    </VStack>
  );

  return isPreview ? <VStack className="library-chart-preview" gap={0}>{content}</VStack> : <Card className="course-hero-figure" padding={4}>{content}</Card>;
}
