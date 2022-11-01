import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import classnames from 'classnames'

import { CommandLineIcon } from './command-line-icon'
import { data as DATA } from './data'
import { fuzzyFilter } from './fuzzy-filter'
import { HeaderLabel } from './header-label'
import { Search } from './search'
import { Sort } from './sort'

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

export const Table = () => {
  const [data] = useState(() => [...DATA])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([{ id: 'lastUsed', desc: true }]) // pre-sort by last used

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    // global filter
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    // sort
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <div className="rounded-l-2xl rounded-tr-2xl border border-zinc-200 dark:border-zinc-300/40">
      <div className="flex place-content-between items-start gap-x-6 px-6 pt-6 pb-2 ">
        <Search value={globalFilter} onChange={(e) => setGlobalFilter(e)} />
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <CommandLineIcon className="h-6 w-6 flex-none" />
          <span className="ml-3">Technical Experience</span>
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
                      'whitespace-nowrap border-b border-zinc-300/40 py-3 text-sm dark:border-zinc-300/20',
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
