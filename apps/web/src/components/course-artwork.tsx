import type { CourseCover } from "@/course/catalog";

/** Original, static subject covers share one frame and the course theme’s colors. */
export function CourseArtwork({ kind }: { kind: CourseCover }) {
  return (
    <svg viewBox="0 0 480 270" className="library-course-artwork" aria-hidden="true" focusable="false">
      {kind === "data" && <>
        {[68, 108, 148, 188, 228].map((y) => <line key={y} x1={36} x2={444} y1={y} y2={y} className="library-art-line" />)}
        {[70, 104, 86, 126, 176, 148, 104].map((height, index) => <rect key={index} x={44 + index * 57} y={228 - height} width={39} height={height} rx={3} className={index === 4 ? "library-art-accent" : "library-art-muted"} />)}
      </>}
      {kind === "perception" && <>
        {[126, 354].map((x, group) => <g key={x}>
          {Array.from({ length: 6 }, (_, i) => <circle key={i} cx={x + Math.cos(i * Math.PI / 3) * (group ? 64 : 46)} cy={135 + Math.sin(i * Math.PI / 3) * (group ? 64 : 46)} r={group ? 25 : 10} className="library-art-soft" />)}
          <circle cx={x} cy={135} r={20} className="library-art-accent" />
        </g>)}
      </>}
      {kind === "interaction" && <>
        <rect x={55} y={98} width={150} height={74} rx={12} className="library-art-soft" />
        <path d="M96 131l24 55 10-23 24-6z" className="library-art-muted" />
        <path d="M228 135h55m-13-13 13 13-13 13" className="library-art-stroke" />
        <circle cx={358} cy={135} r={43} className="library-art-soft" />
        <path d="m336 135 15 15 30-31" className="library-art-stroke" />
      </>}
      {kind === "research" && [88, 198, 308].map((x, i) => <g key={x}>
        <rect x={x} y={75 + i % 2 * 16} width={84} height={110} rx={8} className="library-art-soft" />
        <circle cx={x + 24} cy={102 + i % 2 * 16} r={9} className={i === 1 ? "library-art-accent" : "library-art-muted"} />
        {[135, 149, 163].map((y) => <line key={y} x1={x + 16} x2={x + 66} y1={y + i % 2 * 16} y2={y + i % 2 * 16} className="library-art-line" />)}
      </g>)}
    </svg>
  );
}
