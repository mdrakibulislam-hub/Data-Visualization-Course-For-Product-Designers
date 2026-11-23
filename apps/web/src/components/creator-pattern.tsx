// Reproduces the supplied contribution screenshot with its nine empty middle
// columns removed. This is a static profile detail, not a live activity feed.
const contributionRows = [
  "00030133100021010000010041",
  "00020010000021010011000012",
  "0010001000002000100110000.",
  "0010100001002000100110004.",
  "0000220100001100000000001.",
  "0000000000001000000011000.",
  "0010222300021000000011110.",
];

export function CreatorPattern() {
  return (
    <svg className="course-creator-pattern" viewBox="0 0 258 68" fill="currentColor" aria-hidden="true" focusable="false">
      {contributionRows.flatMap((cells, row) => [...cells].map((intensity, column) => intensity === "." ? null : (
        <rect key={`${row}-${column}`} x={column * 10} y={row * 10} width={8} height={8} rx={1.5} fill={intensity === "0" ? "var(--line)" : "currentColor"} opacity={[.5, .38, .58, .8, 1][Number(intensity)]} />
      )))}
    </svg>
  );
}
