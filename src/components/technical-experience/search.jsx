import { useEffect, useState } from 'react'

import { SearchIcon } from './search-icon'

export const Search = ({ value: initialValue, onChange, debounce = 300 }) => {
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
