import { useEffect, useState } from 'react'
import { compareItems, RankingInfo, rankItem } from '@tanstack/match-sorter-utils'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import classnames from 'classnames'
import clsx from 'clsx'
import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/SocialIcons'
import logoIntel from '@/images/logos/intel.svg'
import image4 from '@/images/photos/ci-cd-latest.png'
import image1 from '@/images/photos/db-latest.png'
import image2 from '@/images/photos/middletier-latest.png'
import image5 from '@/images/photos/salesforce-latest.jpg'
import image3 from '@/images/photos/ui-latest.png'
import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6" className="stroke-zinc-400 dark:stroke-zinc-500" />
    </svg>
  )
}

function ArrowSmallUp(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowSmallDown(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function CommandLine(props) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function SearchIcon(props) {
  return (
    <svg
      className="h-5 w-5 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.slug}`}>{article.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props} target="_blank">
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Newsletter() {
  return (
    <form action="/thank-you" className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6 flex">
        <input
          type="email"
          placeholder="Email address"
          aria-label="Email address"
          required
          className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
        />
        <Button type="submit" className="ml-4 flex-none">
          Join
        </Button>
      </div>
    </form>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Intel',
      title: 'Cloud Application Development Engineer',
      logo: logoIntel,
      start: '2020',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear(),
      },
    },
    {
      company: 'Intel',
      title: 'Senior Software Application Engineer',
      logo: logoIntel,
      start: '2008',
      end: '2020',
    },
    {
      company: 'Intel',
      title: 'Software Application Engineer',
      logo: logoIntel,
      start: '2005',
      end: '2008',
    },
    {
      company: 'Intel',
      title: 'Site Planner',
      logo: logoIntel,
      start: '1995',
      end: '2005',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-300/40">
      <h2 className="flex justify-end text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-1">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-zinc-800 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-auto w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">{role.company}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="w-full text-xs text-zinc-500 dark:text-zinc-400">{role.title}</dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${role.end.label ?? role.end}`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>{role.start.label ?? role.start}</time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>{role.end.label ?? role.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      {/* <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button> */}
    </div>
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

const technologyData = [
  {
    name: 'GitHub',
    category: 'CI/CD',
    purpose: 'Repository',
    lastUsed: 2022,
  },
  {
    name: 'GitLab',
    category: 'CI/CD',
    purpose: 'Repository',
    lastUsed: 2021,
  },
  {
    name: 'Kendo UI',
    category: 'UI',
    purpose: 'Component',
    lastUsed: 2021,
  },
  {
    name: 'Azure Cognitive Search',
    category: 'Cloud Computing',
    purpose: 'Service',
    lastUsed: 2022,
  },
  {
    name: 'Ab Initio',
    category: 'Enterprise Software',
    purpose: 'ETL',
    lastUsed: 2015,
  },
  {
    name: 'Salesforce',
    category: 'Enterprise Software',
    purpose: 'CRM',
    lastUsed: 2020,
  },
  {
    name: 'TailwindCSS',
    category: 'UI',
    purpose: 'Design System',
    lastUsed: 2022,
  },
]

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'purpose',
    header: 'Purpose',
    cell: (info) => info.getValue(),
    meta: {
      hideUntil: 'md',
    },
  },
  {
    accessorKey: 'lastUsed',
    header: 'Last Used',
    cell: (info) => info.getValue(),
    meta: {
      hideUntil: 'lg',
    },
  },
]

function DebouncedSearch({ value: initialValue, onChange, debounce = 300 }) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [debounce, onChange, value])

  return (
    <div className="w-full items-center justify-center md:max-w-md">
      <label htmlFor="search-technology-experience" className="sr-only">
        Search technology experience
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search-technology-experience"
          name="search-technology-experience"
          className="block w-full rounded-md border border-zinc-200 bg-zinc-50 py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:border-zinc-200 focus:bg-white focus:text-zinc-900 focus:placeholder-zinc-400 focus:outline-none focus:ring-white dark:border-transparent dark:bg-zinc-700 dark:text-zinc-50 focus:dark:bg-zinc-600 focus:dark:text-zinc-50 sm:text-sm"
          placeholder="Search"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  )
}

function Sort({ canSort, isSorted, onToggleSort }) {
  if (!canSort) return null
  return (
    <div className="cursor-pointer" onClick={onToggleSort}>
      {{
        asc: <ArrowSmallUp className="h-3 w-3" />,
        desc: <ArrowSmallDown className="h-3 w-3" />,
      }[isSorted] ?? null}
    </div>
  )
}

function HeaderLabel({ canSort, children, onToggleSort }) {
  return (
    <div className="flex-grow cursor-pointer truncate text-left" onClick={canSort ? onToggleSort : undefined}>
      {children}
    </div>
  )
}

function fuzzyFilter(row, columnId, value, addMeta) {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

function fuzzySort(rowA, rowB, columnId) {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(rowA.columnFiltersMeta[columnId].itemRank, rowB.columnFiltersMeta[columnId].itemRank)
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

function TechnologyTable() {
  const [data, setData] = useState(() => [...technologyData])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])

  const table = useReactTable({
    data,
    columns,
    // filterFns: {
    //     fuzzy: fuzzyFilter,
    // },
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <div className="rounded-l-2xl rounded-tr-2xl border border-zinc-200 dark:border-zinc-300/40">
      <div className="flex place-content-between items-start gap-x-6 px-6 pt-6 pb-2 ">
        <DebouncedSearch value={globalFilter} onChange={(e) => setGlobalFilter(e)} />
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <CommandLine className="h-6 w-6 flex-none" />
          <span className="ml-3">Technology Experience</span>
        </h2>
      </div>
      <div className="h-[400px] overflow-auto">
        <table className="min-w-full table-fixed border-separate border-spacing-0">
          <thead className="sticky top-0 z-20 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, headerIndex) => (
                  <th
                    key={header.id}
                    scope="col"
                    className={classnames(
                      'border-b border-zinc-200 py-3.5 text-left text-sm font-semibold dark:border-zinc-300/40',
                      header.column.columnDef.meta?.hideUntil &&
                        `hidden ${header.column.columnDef.meta?.hideUntil}:table-cell`,
                      headerIndex === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3',
                    )}
                  >
                    <div className="flex place-content-between items-center">
                      <HeaderLabel
                        canSort={header.column.getCanSort()}
                        onToggleSort={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </HeaderLabel>
                      <Sort
                        canSort={header.column.getCanSort()}
                        isSorted={header.column.getIsSorted()}
                        onToggleSort={header.column.getToggleSortingHandler()}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-zinc-500 dark:text-zinc-400">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    key={cell.id}
                    className={classnames(
                      'whitespace-nowrap border-b border-zinc-300/40 py-4 text-sm dark:border-zinc-300/20',
                      cell.column.columnDef.meta?.hideUntil &&
                        `hidden ${cell.column.columnDef.meta?.hideUntil}:table-cell`,
                      cellIndex === 0 ? 'pl-4 pr-3 sm:pl-6' : 'px-3',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
            <TechnologyTable />
          </div>
          <div className="hidden lg:inline-block">
            &nbsp;
            {/* {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))} */}
          </div>
          <div className="">
            {/* <Newsletter /> */}
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles()).slice(0, 4).map(({ component, ...meta }) => meta),
    },
  }
}
