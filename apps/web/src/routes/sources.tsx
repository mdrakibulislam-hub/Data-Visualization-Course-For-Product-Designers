import { Heading } from "@astryxdesign/core/Heading";
import { HStack } from "@astryxdesign/core/HStack";
import { Link as AstryxLink } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute } from "@tanstack/react-router";

import { articleSources, bookSources } from "@/course/sources";

export const Route = createFileRoute("/sources")({
  head: () => ({ meta: [{ title: "Sources · Graphnotes" }] }),
  component: SourcesPage,
});

function SourcesPage() {
  return (
    <VStack className="course-wrap course-simple-page" gap={6}>
      <VStack as="header" gap={2}>
        <Heading level={1} className="course-display course-page-title">Sources</Heading>
        <p className="course-deck">Find a practical guide for your current design problem, or go deeper with the course’s books and slides.</p>
        <HStack as="nav" gap={3} wrap="wrap" aria-label="Reading groups">
          <AstryxLink href="#articles">Articles and guides</AstryxLink>
          <AstryxLink href="#books">Books and slides</AstryxLink>
        </HStack>
      </VStack>
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
