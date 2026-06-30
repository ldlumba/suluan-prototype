import { Link } from 'react-router'
import type { SemanticResult } from '../../data/semanticScenarios'
import { AccessBadge, ValidationBadge } from '../common/Badge'

export function SearchResultCard({ result, index }: { result: SemanticResult; index: number }) {
  const { record } = result
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Result {index + 1}</p>
          <Link to={`/records/${record.id}`} className="mt-1 block text-lg font-bold leading-7 text-stone-950 hover:text-emerald-800">{record.title}</Link>
          <p className="mt-1 text-sm text-stone-600">{record.authors.join(', ')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AccessBadge status={record.accessStatus} />
          <ValidationBadge status={record.validationStatus} />
        </div>
      </div>
      <p className="mt-4 rounded-md border border-emerald-100 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950">{result.reason}</p>
      <p className="mt-3 text-sm leading-6 text-stone-600">{record.abstract}</p>
    </article>
  )
}
