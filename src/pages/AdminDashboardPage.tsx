import { useMemo, useState } from 'react'
import { AccessBadge, ValidationBadge } from '../components/common/Badge'
import { Field, SelectInput } from '../components/common/FormControls'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { researchRecords, type ValidationStatus } from '../data/researchRecords'
import { applyStatusOverrides, getSubmittedRecords, setStatusOverride } from '../utils/localStorage'

const statuses: ValidationStatus[] = ['Pending Review', 'Validated', 'Needs Revision', 'Rejected']

export function AdminDashboardPage() {
  const [version, setVersion] = useState(0)
  const records = useMemo(() => applyStatusOverrides([...getSubmittedRecords(), ...researchRecords]), [version])
  const queue = records.filter((record) => record.validationStatus !== 'Validated')
  const counts = statuses.reduce<Record<string, number>>((acc, status) => ({ ...acc, [status]: records.filter((record) => record.validationStatus === status).length }), {})

  function changeStatus(recordId: string, status: ValidationStatus) {
    setStatusOverride(recordId, status)
    setVersion((value) => value + 1)
  }

  return (
    <div>
      <PageHeader eyebrow="Repository management" title="Admin Dashboard" description="Review fictional metadata queues and simulate validation status changes with localStorage." />
      <SimulationNotice>Prototype simulation: validation changes are stored only in this browser and do not update any real repository.</SimulationNotice>

      <section className="mt-5 grid gap-4 md:grid-cols-4">
        {statuses.map((status) => <div key={status} className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm"><ValidationBadge status={status} /><p className="mt-3 text-3xl font-bold text-stone-950">{counts[status]}</p></div>)}
      </section>

      <section className="mt-6 space-y-4">
        <h2 className="text-lg font-bold text-stone-950">Validation queue</h2>
        {queue.map((record) => (
          <article key={record.id} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap gap-2"><AccessBadge status={record.accessStatus} /><ValidationBadge status={record.validationStatus} /></div>
                <h3 className="mt-3 text-lg font-bold text-stone-950">{record.title}</h3>
                <p className="mt-1 text-sm text-stone-600">{record.department} / {record.recordType} / {record.year}</p>
                <p className="mt-3 text-sm leading-6 text-stone-600">{record.provenanceNotes}</p>
              </div>
              <div className="w-full lg:w-60">
                <Field label="Simulated status"><SelectInput value={record.validationStatus} onChange={(event) => changeStatus(record.id, event.target.value as ValidationStatus)}>{statuses.map((status) => <option key={status}>{status}</option>)}</SelectInput></Field>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
