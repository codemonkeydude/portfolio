import { ArrowSmallDownIcon } from './arrow-small-down-icon'
import { ArrowSmallUpIcon } from './arrow-small-up-icon'

export const Sort = ({ canSort, isSorted, onToggleSort }) => {
  if (!canSort) return null
  return (
    <div className="cursor-pointer" onClick={onToggleSort}>
      {{
        asc: <ArrowSmallUpIcon className="h-3 w-3" />,
        desc: <ArrowSmallDownIcon className="h-3 w-3" />,
      }[isSorted] ?? null}
    </div>
  )
}
