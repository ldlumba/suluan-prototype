const items = [
  ['Paper', '#1f6f5b'],
  ['Author', '#28536b'],
  ['Academic Unit', '#8a5a24'],
  ['Theme', '#7c3f58'],
  ['Keyword', '#4f6f2f'],
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
