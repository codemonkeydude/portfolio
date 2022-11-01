export const HeaderLabel = ({ canSort, children, onToggleSort }) => {
  return (
    <div className="flex-grow cursor-pointer truncate text-left" onClick={canSort ? onToggleSort : undefined}>
      {children}
    </div>
  )
}
