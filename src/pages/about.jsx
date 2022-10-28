import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        target="_blank"
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Andy Jeffrey</title>
        <meta
          name="description"
          content="I’m Andy Jeffrey. I live in Portland Oregon, where I design and
          build applications."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Andy Jeffrey. I live in Portland Oregon, where I design and
              build applications.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                <strong>TL;DR</strong> &middot; I’m a dude who started with an
                Architecture degree from U of O and became a coder at Intel.
              </p>
              <p>
                For as long as I can remember, I’ve had a love for building
                things. Tinker Toys and Legos, of course. Later, a 3 story fort
                in our backyard built out of pilfered construction debris (good
                thing my mom kept my tetanus shots current). I built hundreds of
                model airplanes, plastic and balsa. I nearly completed the
                entire Guillow line by the time I graduated from high school.
              </p>
              <p>
                Drawing was another passion. When I was in 4th grade I won an
                art contest. Though looking back the competition wasn’t that
                impressive. I was a constant doodler. My mom enrolled me in
                several art programs and I did very well in my high school
                drafting classes.
              </p>
              <p>
                When it was time for college I thought Architecture would be the
                way to go and not just because it was on the first page of the
                college pamphlet (like &quot;Weird Al&quot; Yankovic). I figured
                I could leverage my creative side and build buildings. I did
                well and graduated in the early nineties from U of O right smack
                in the middle of a recession. There were no Architecture jobs to
                be found, even for drawing bathroom elevations (something we
                joked about in Architecture studio). Soon I found an alternate
                job at Intel planning office space. It was hard thankless work
                but it paid the bills.
              </p>
              <p>
                It was during my stint as a Site Planner that I discovered
                coding. After pouring over stacks of software books I helped
                automate several processes using classic ASP 3.0 and then .NET
                when it was released. I was hooked and became a lifelong learner
                of everything to do with coding. As a result, I built a
                reputation as an effective application developer. Intel decided
                to make me a fulltime developer in 2005 and I joined a team of
                &quot;embedded&quot; IT software professionals practicing Agile.
                I learned a ton from those folks. We practice full Agile using
                pair programming, TDD, CI/CD, the works.
              </p>
              <p>
                Today, I’m in IT Product Engineering and building elaborate
                cloud aware applications hosted on Azure and Intel’s internal
                cloud. I leverage a wide range of technologies including several
                open source stacks, the Microsoft stack and integrations with
                many enterprise solutions (SAP, Salesforce, Apigee, etc.). I can
                build an application from the ground up or lead a team of
                developers to do the same. It’s not what I majored in or
                expected to be doing when I was growing up but now I can’t
                imagine doing anything else. In a way, I’m actually practicing
                my major it’s just that I’m designing and building using ones
                and zeros instead of brick and morter.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://twitter.com/CodeMonkeyDude"
                icon={TwitterIcon}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://github.com/codemonkeydude"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/andy-jeffrey-b342673"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:codemonkeydudex@gmail.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                codemonkeydudex@gmail.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
