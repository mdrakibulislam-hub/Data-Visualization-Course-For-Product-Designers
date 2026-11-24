import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { HStack } from "@astryxdesign/core/HStack";
import { useEffect, useState } from "react";

import { releaseCountdown } from "@/course/course-releases";
import { libraryAsset } from "./library-assets";

export function CourseCountdown({ releaseAt }: { releaseAt: string }) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const { days, hours, minutes, hasArrived } = releaseCountdown(releaseAt, now);

  return (
    <VStack gap={3} align="center">
      <Text as="p" color="secondary">{hasArrived ? "Scheduled release" : "Releasing in"}</Text>
      {hasArrived ? (
        <Text as="p" weight="semibold" className="library-countdown-message">Coming soon</Text>
      ) : (
        <HStack gap={3} align="center" className="library-countdown-row">
          <img src={libraryAsset("release-dot.svg")} width={18} height={18} alt="" aria-hidden="true" className="library-release-dot" />
          <Text as="p" className="library-countdown" aria-label={`${days} days, ${hours} hours, ${minutes} minutes until release`}>
            {String(days).padStart(2, "0")}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m
          </Text>
        </HStack>
      )}
      <Text as="p" color="secondary" type="supporting"><time dateTime={releaseAt}>{new Date(releaseAt).toLocaleDateString(undefined, { timeZone: "Asia/Dhaka", weekday: "long", month: "long", day: "numeric" })}</time></Text>
    </VStack>
  );
}
