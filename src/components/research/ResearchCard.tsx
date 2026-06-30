import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import type { ResearchRecord } from '../../data/researchRecords'
import { AccessBadge, ValidationBadge } from '../common/Badge'

export function ResearchCard({ record }: { record: ResearchRecord }) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <AccessBadge status={record.accessStatus} />
        <ValidationBadge status={record.validationStatus} />
        <span className="text-xs font-semibold text-stone-500">{record.year}</span>
      </div>
      <h2 className="mt-3 text-lg font-bold leading-7 text-stone-950">{record.title}</h2>
      <p className="mt-1 text-sm text-stone-600">{record.authors.join(', ')}</p>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{record.abstract}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {record.keywords.slice(0, 4).map((keyword) => (
          <span key={keyword} className="rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">{keyword}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 border-t border-stone-100 pt-4 text-sm">
        <span className="text-stone-500">{record.department}</span>
        <Link to={`/records/${record.id}`} className="inline-flex items-center gap-1 font-semibold text-emerald-700 hover:text-emerald-900">
          View record <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
