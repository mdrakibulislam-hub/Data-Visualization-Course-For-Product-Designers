// The confirmed launch day starts at midnight in the creator’s timezone.
export const hciReleaseAt = "2026-11-30T00:00:00+06:00";

export function releaseCountdown(releaseAt: string, now: number) {
  const remaining = Math.max(0, Math.ceil((Date.parse(releaseAt) - now) / 60_000));
  return {
    days: Math.floor(remaining / 1440),
    hours: Math.floor(remaining % 1440 / 60),
    minutes: remaining % 60,
    hasArrived: now >= Date.parse(releaseAt),
  };
}
