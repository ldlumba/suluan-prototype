import { ValidationBadge } from './Badge'

const definitions = [
  {
    status: 'Validated' as const,
    meaning: 'Sample metadata has passed prototype review and can appear in normal discovery.',
  },
  {
    status: 'Pending Review' as const,
    meaning: 'Sample metadata is waiting for simulated administrative review in the Admin Dashboard.',
  },
  {
    status: 'Needs Revision' as const,
    meaning: 'Sample metadata requires correction before it can be included in normal discovery.',
  },
]

export function ValidationStatusGuide() {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 text-sm shadow-sm">
      <h2 className="font-black text-stone-950">Validation status guide</h2>
      <div className="mt-3 grid gap-3 lg:grid-cols-3">
        {definitions.map((item) => (
          <div key={item.status} className="rounded-lg border border-stone-100 bg-stone-50/80 p-3">
            <ValidationBadge status={item.status} />
            <p className="mt-2 leading-6 text-stone-600">{item.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  )
}