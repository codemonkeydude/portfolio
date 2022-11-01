import clsx from 'clsx'
import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { Resume } from '@/components/resume/resume'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/SocialIcons'
import { Table as ExperienceTable } from '@/components/technical-experience/table'
import image4 from '@/images/photos/ci-cd-latest.png'
import image1 from '@/images/photos/db-latest.png'
import image2 from '@/images/photos/middletier-latest.png'
import image5 from '@/images/photos/salesforce-latest.jpg'
import image3 from '@/images/photos/ui-latest.png'

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props} target="_blank">
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={imageIndex}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl border border-zinc-200 drop-shadow-lg dark:border-0 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length],
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Andy Jeffrey - code monkey dude</title>
        <meta
          name="description"
          content="I’m Andy, a Cloud Application Development Engineer at Intel Corporation where I have over 21 years’ experience in creating intuitive line-of-business applications of all shapes and sizes. Over the years, my passion for continuous learning and striving to improve my craft has built up to an impressive spectrum of technologies that I can bring to every project. Whether it is flying solo or leading a large team of developers, I enjoy the process of crafting solutions that delight customers and make their requirements a reality."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Full stack software engineer, team lead and code monkey dude.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Andy, a <strong>Cloud Application Development Engineer</strong> at Intel Corporation where I have over{' '}
            {new Date().getFullYear() - 2001} years’ experience in creating intuitive line-of-business applications of
            all shapes and sizes. Over the years, my passion for continuous learning and striving to improve my craft
            has built up to an impressive spectrum of technologies that I can bring to every project. Whether it is
            flying solo or leading a large team of developers, I enjoy the process of crafting solutions that delight
            customers and make their requirements a reality.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink href="https://twitter.com/CodeMonkeyDude" aria-label="Follow on Twitter" icon={TwitterIcon} />
            <SocialLink href="https://github.com/codemonkeydude" aria-label="Follow on GitHub" icon={GitHubIcon} />
            <SocialLink
              href="https://www.linkedin.com/in/andy-jeffrey-b342673"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-16 md:mt-20 lg:mt-24">
        <div className="grid grid-cols-1 gap-y-16 md:gap-y-20 lg:grid-cols-2 lg:gap-y-24">
          <div className="lg:col-span-2">
            <ExperienceTable />
          </div>
          <div className="hidden lg:inline-block">&nbsp;</div>
          <div>
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
