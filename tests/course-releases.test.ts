import { describe, expect, test } from "bun:test";

import { hciReleaseAt, releaseCountdown } from "../apps/web/src/course/course-releases";

describe("HCI release countdown", () => {
  test("targets November 30 at midnight in Dhaka for every visitor", () => {
    expect(Date.parse(hciReleaseAt)).toBe(Date.parse("2026-11-29T18:00:00Z"));
    expect(releaseCountdown(hciReleaseAt, Date.parse("2026-11-23T00:00:00+06:00"))).toEqual({ days: 7, hours: 0, minutes: 0, hasArrived: false });
  });

  test("keeps a final minute until the release instant", () => {
    expect(releaseCountdown(hciReleaseAt, Date.parse(hciReleaseAt) - 1000)).toEqual({ days: 0, hours: 0, minutes: 1, hasArrived: false });
  });

  test("stops at zero without announcing an unfinished course as available", () => {
    for (const now of [Date.parse(hciReleaseAt), Date.parse(hciReleaseAt) + 86400_000]) {
      expect(releaseCountdown(hciReleaseAt, now)).toEqual({ days: 0, hours: 0, minutes: 0, hasArrived: true });
    }
  });
});
