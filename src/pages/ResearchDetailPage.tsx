import { Check, Copy, ExternalLink } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { AccessBadge, ValidationBadge } from '../components/common/Badge'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { ResearchCard } from '../components/research/ResearchCard'
import { researchRecords } from '../data/researchRecords'
import { copyText, getApaCitation } from '../utils/citation'
import { applyStatusOverrides, getSubmittedRecords } from '../utils/localStorage'

export function ResearchDetailPage() {
  const { recordId } = useParams()
  const [copied, setCopied] = useState(false)
  const allRecords = useMemo(() => applyStatusOverrides([...getSubmittedRecords(), ...researchRecords]), [])
  const records = useMemo(() => allRecords.filter((item) => item.validationStatus === 'Validated'), [allRecords])
  const record = records.find((item) => item.id === recordId)
  const nonDiscoverableRecord = allRecords.find((item) => item.id === recordId)

  if (!record) {
    return (
      <div>
        <PageHeader title="Record not available in normal discovery" description="Normal record pages show validated sample metadata only." />
        <SimulationNotice>
          {nonDiscoverableRecord
            ? 'This sample metadata is not validated for normal discovery. Pending, revision, and rejected records are available only in the Admin Dashboard validation workflow simulation.'
            : 'The selected prototype record could not be found in the temporary dataset.'}
        </SimulationNotice>
        <div className="mt-6"><Link to="/browse" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">Back to validated records</Link></div>
      </div>
    )
  }

  const related = record.relatedRecordIds.map((id) => records.find((item) => item.id === id)).filter(Boolean)

  async function handleCopy() {
    const ok = await copyText(getApaCitation(record!))
    setCopied(ok)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div>
      <PageHeader eyebrow={record.recordType} title={record.title} description={`${record.department} / ${record.program} / ${record.year}`} />
      <SimulationNotice>This record is validated fictional sample metadata. Access labels, provenance, and related studies are prototype simulations and do not grant restricted document access.</SimulationNotice>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
        <article className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap gap-2"><AccessBadge status={record.accessStatus} /><ValidationBadge status={record.validationStatus} /></div>
          <h2 className="mt-6 text-base font-bold text-stone-950">Abstract</h2>
          <p className="mt-2 text-sm leading-7 text-stone-700">{record.abstract}</p>
          <h2 className="mt-6 text-base font-bold text-stone-950">Keywords</h2>
          <div className="mt-2 flex flex-wrap gap-2">{record.keywords.map((keyword) => <span key={keyword} className="rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700">{keyword}</span>)}</div>
          <h2 className="mt-6 text-base font-bold text-stone-950">APA citation</h2>
          <div className="mt-2 rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-700">{record.citation.apa}</div>
          <button type="button" onClick={handleCopy} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy citation'}
          </button>
        </article>

        <aside className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-stone-950">Metadata</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <Meta label="Authors" value={record.authors.join(', ')} />
            <Meta label="Academic Unit" value={record.department} />
            <Meta label="Program" value={record.program} />
            <Meta label="Year" value={String(record.year)} />
            <Meta label="Adviser" value={record.adviser} />
            <Meta label="Theme" value={record.researchTheme} />
            <Meta label="Publication source" value={record.publicationSource} />
            <Meta label="Provenance" value={record.provenanceNotes} />
          </dl>
        </aside>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center gap-2 text-lg font-bold text-stone-950"><ExternalLink className="h-5 w-5" /> Related validated studies</div>
        <div className="grid gap-4 lg:grid-cols-2">{related.map((item) => <ResearchCard key={item!.id} record={item!} />)}</div>
        {related.length === 0 ? <p className="text-sm text-stone-500">No related validated records are listed in the temporary metadata.</p> : null}
      </section>
      <div className="mt-6"><Link to="/browse" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">Back to browse</Link></div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-xs font-bold uppercase tracking-wide text-stone-500">{label}</dt><dd className="mt-1 text-stone-800">{value}</dd></div>
}
