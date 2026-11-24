import { Avatar } from "@astryxdesign/core/Avatar";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";

import { LibraryIcon, libraryAsset } from "./library-assets";

export function LibraryCreator() {
  return (
    <Card padding={6} className="library-creator">
      <VStack as="section" gap={6} aria-labelledby="library-creator-name">
        <HStack gap={6} justify="between" align="center" className="library-creator-header">
          <HStack gap={5} align="center" className="library-creator-profile">
            <Avatar src={libraryAsset("creator.png")} name="Md Rakibul Islam" size={96} shape="rounded" tooltip={false} />
            <VStack gap={2}>
              <Text as="p" type="supporting" color="secondary">Created by</Text>
              <VStack gap={1}>
                <Heading level={2} id="library-creator-name" className="library-creator-name">Md Rakibul Islam</Heading>
                <Text as="p" color="secondary">Product Design Engineer</Text>
              </VStack>
            </VStack>
          </HStack>
          <img src={libraryAsset("contribution-pattern.svg")} width={256} height={67.4688} alt="" aria-hidden="true" className="library-creator-pattern" />
        </HStack>
        <HStack gap={4} className="library-creator-links">
          <Button href="https://rakib.framer.wiki" label="Portfolio" variant="primary" icon={<LibraryIcon name="portfolio" />} />
          <Button href="https://x.com/rakib_ux" label="X (Twitter)" variant="secondary" icon={<LibraryIcon name="x-twitter" isInk />} />
          <Button href="https://www.linkedin.com/in/searchrakib/" label="LinkedIn" variant="secondary" icon={<LibraryIcon name="linkedin" isInk />} />
        </HStack>
      </VStack>
    </Card>
  );
}
