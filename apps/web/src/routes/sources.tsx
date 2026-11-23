import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link as AstryxLink } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";
import { AtSign, Briefcase, Envelope, Globe } from "reicon-react";

import { articleSources, bookSources } from "@/course/sources";

export const Route = createFileRoute("/sources")({
  head: () => ({ meta: [{ title: "Credits · Graphnotes" }] }),
  component: SourcesPage,
});

function SourcesPage() {
  return (
    <VStack className="course-wrap course-simple-page" gap={6}>
      <VStack as="header" gap={2}>
        <Heading level={1} className="course-display course-page-title">Credits</Heading>
        <Text as="p" color="secondary">The creator and learning sources behind Graphnotes.</Text>
      </VStack>
      <Card padding={6}>
        <VStack as="section" aria-labelledby="creator-name" gap={5}>
          <VStack gap={2}>
            <Text as="p" type="supporting" color="secondary">Created by</Text>
            <VStack gap={1}>
              <Heading level={2} id="creator-name">Md Rakibul Islam</Heading>
              <Text as="p" color="secondary">Product Design Engineer</Text>
            </VStack>
          </VStack>
          <VStack gap={1}>
            <HStack gap={4} wrap="wrap">
              <AstryxLink href="https://rakib.framer.wiki" className="course-credit-link"><Globe size={18} aria-hidden="true" />Portfolio</AstryxLink>
              <AstryxLink href="https://x.com/rakib_ux" className="course-credit-link"><AtSign size={18} aria-hidden="true" />X (Twitter)</AstryxLink>
              <AstryxLink href="https://www.linkedin.com/in/searchrakib/" className="course-credit-link"><Briefcase size={18} aria-hidden="true" />LinkedIn</AstryxLink>
            </HStack>
            <AstryxLink href="mailto:rakibulislamborkan@gmail.com" className="course-credit-link"><Envelope size={18} aria-hidden="true" />rakibulislamborkan@gmail.com</AstryxLink>
          </VStack>
        </VStack>
      </Card>
      <HStack as="nav" gap={4} wrap="wrap" aria-label="Learning sources">
        <AstryxLink href="#articles">Articles and guides</AstryxLink>
        <AstryxLink href="#books">Books and slides</AstryxLink>
      </HStack>
      <VStack as="section" aria-labelledby="articles" gap={2}>
        <Heading id="articles" level={2}>Articles and guides</Heading>
        <VStack gap={0}>
          {articleSources.map((source) => (
            <VStack as="article" key={source.id} id={source.id} className="course-source" data-scroll-reveal gap={1}>
              <Text as="p" type="supporting" color="secondary" className="course-meta">{source.credit}</Text>
              <Heading level={3}><AstryxLink href={source.url} weight="semibold" type="inherit">{source.title}</AstryxLink></Heading>
              <p>{source.note}</p>
            </VStack>
          ))}
        </VStack>
      </VStack>
      <VStack as="section" aria-labelledby="books" gap={2}>
        <Heading id="books" level={2}>Books and slides</Heading>
        <VStack gap={0}>
          {bookSources.map((source) => (
            <VStack as="article" key={source.id} id={source.id} className="course-source" data-scroll-reveal gap={2}>
              <Text as="p" type="supporting" color="secondary" className="course-meta">{source.credit}</Text>
              <Heading level={3}>{source.title}</Heading>
              <p>{source.scope}</p>
              <p>{source.perspective}</p>
              <details className="course-lesson-sources">
                <summary>Reading notes</summary>
                <VStack as="ul" gap={3}>
                  {source.parts.map(({ title, note }) => <li key={title}><strong>{title}</strong><p>{note}</p></li>)}
                </VStack>
              </details>
              {source.url && <AstryxLink href={source.url}>Publisher’s reference</AstryxLink>}
            </VStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
}
import { Card } from "@astryxdesign/core/Card";
