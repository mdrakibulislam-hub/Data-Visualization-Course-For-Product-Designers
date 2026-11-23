import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useEffect, useState } from "react";

import { hciReleaseAt, releaseCountdown } from "@/course/course-releases";

export function HciCountdown() {
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

  const { days, hours, minutes, hasArrived } = releaseCountdown(hciReleaseAt, now);

  return (
    <VStack gap={3} align="center">
      <Text as="p" color="secondary">{hasArrived ? "Scheduled release" : "Releasing in"}</Text>
      {hasArrived ? (
        <Text as="p" weight="semibold" className="library-countdown-message">Coming soon</Text>
      ) : (
        <Text as="p" className="library-countdown" aria-label={`${days} days, ${hours} hours, ${minutes} minutes until release`}>
          {String(days).padStart(2, "0")}d {String(hours).padStart(2, "0")}h {String(minutes).padStart(2, "0")}m
        </Text>
      )}
      <Text as="p" color="secondary" type="supporting"><time dateTime={hciReleaseAt}>Monday, November 30</time></Text>
    </VStack>
  );
}
