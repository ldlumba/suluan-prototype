const items = [
  ['Paper', '#063b82'],
  ['Author', '#0b5cad'],
  ['Academic Unit', '#c81e2a'],
  ['Theme', '#f4c430'],
  ['Keyword', '#5b6472'],
]

export function GraphLegend() {
  return (
    <div className="flex flex-wrap gap-3 rounded-lg border border-stone-200 bg-white p-3 text-xs font-semibold text-stone-700 shadow-sm">
      {items.map(([label, color]) => (
        <span key={label} className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
          {label}
        </span>
      ))}
      <span className="text-stone-500">Dashed edge means related paper.</span>
    </div>
  )
}
