import { Link } from 'react-router'
import type { SemanticResult } from '../../data/semanticScenarios'
import { AccessBadge, ValidationBadge } from '../common/Badge'

export function SearchResultCard({ result, index }: { result: SemanticResult; index: number }) {
  const { record } = result
  return (
    <article className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#9ebbe5] hover:shadow-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#063b82]">Result {index + 1}</p>
          <Link to={`/records/${record.id}`} className="mt-1 block text-lg font-black leading-7 text-stone-950 hover:text-[#063b82]">{record.title}</Link>
          <p className="mt-1 text-sm font-medium text-stone-600">{record.authors.join(', ')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AccessBadge status={record.accessStatus} />
          <ValidationBadge status={record.validationStatus} />
        </div>
      </div>
      <p className="mt-4 rounded-lg border border-[#c9d9f2] bg-[#eef5ff] p-3 text-sm leading-6 text-[#062f6f]">{result.reason}</p>
      <p className="mt-3 text-sm leading-6 text-stone-600">{record.abstract}</p>
    </article>
  )
}
