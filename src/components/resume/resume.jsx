import Image from 'next/future/image'

import { BriefcaseIcon } from './briefcase-icon'

import logoIntel from '@/images/logos/intel.svg'

export const Resume = () => {
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
    </div>
  )
}
