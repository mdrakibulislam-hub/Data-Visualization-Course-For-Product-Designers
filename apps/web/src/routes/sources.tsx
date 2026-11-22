import { Heading } from "@astryxdesign/core/Heading";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "reicon-react";

import { sources } from "@/course/sources";

export const Route = createFileRoute("/sources")({
  head: () => ({ meta: [{ title: "Sources · Data Viz Field Guide" }] }),
  component: SourcesPage,
});

function SourcesPage() {
  return (
    <VStack className="course-wrap course-simple-page" gap={6}>
      <Link to="/" className="course-back"><ArrowLeft size={16} aria-hidden="true" /> Course overview</Link>
      <VStack as="header" gap={2}>
        <Heading level={1} className="course-display course-page-title">Sources &amp; reading notes</Heading>
        <p className="course-deck">Five resources informed the course. Use these notes to find the chapters and ideas that fit the problem you are working on.</p>
      </VStack>
      <VStack className="course-source-list" gap={0}>
        {sources.map((source) => (
          <VStack as="article" key={source.id} id={source.id} className="course-source" gap={2}>
            <Heading level={2}>{source.title}</Heading>
            <p className="course-meta">{source.credit}</p>
            <p>{source.scope}</p>
            <p>{source.perspective}</p>
            <details className="course-lesson-sources">
              <summary>Reading notes</summary>
              <VStack as="ul" gap={3}>
                {source.parts.map(({ title, note }) => <li key={title}><strong>{title}</strong><p>{note}</p></li>)}
              </VStack>
            </details>
            {source.url && <a href={source.url} className="course-back">Publisher’s reference <ArrowUpRight size={15} aria-hidden="true" /></a>}
          </VStack>
        ))}
      </VStack>
    </VStack>
  );
}
