import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/util/formatDate'
import { getAllProjects } from '@/util/getAllProjects'

function Project({ project }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/projects/${project.slug}`}>{project.title}</Card.Title>
        <Card.Eyebrow as="time" dateTime={project.date} className="md:hidden" decorate>
          {formatDate(project.date)}
        </Card.Eyebrow>
        <Card.Description>{project.description}</Card.Description>
        <Card.Cta>Read more</Card.Cta>
      </Card>
      <Card.Eyebrow as="time" dateTime={project.date} className="mt-1 hidden md:block">
        {formatDate(project.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function ProjectsIndex({ projects }) {
  return (
    <>
      <Head>
        <title>Projects - Andy Jeffrey</title>
        <meta
          name="description"
          content="The good, bad, and ugly, a culmination of the applications I’ve been part of in chronological order."
        />
      </Head>
      <SimpleLayout
        title={`Building line of business apps for ${new Date().getFullYear() - 2001} years`}
        intro={
          <>
            The good, bad, and ugly, a culmination of the applications I’ve been part of in chronological order.
            <br />
            <i>
              Note that this is a work in progress and not a comprehensive list of every project I’ve worked on. In
              addition, I’m intentionally vague on some details to protect Intel’s intellectual property.
            </i>
          </>
        }
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {projects.map((project) => (
              <Project key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      projects: (await getAllProjects()).map(({ component, ...meta }) => meta),
    },
  }
}
