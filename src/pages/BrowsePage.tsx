import { useEffect, useMemo, useState } from 'react'
import { Field, SelectInput, TextInput } from '../components/common/FormControls'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { ResearchCard } from '../components/research/ResearchCard'
import { departments, researchRecords, themes, years } from '../data/researchRecords'
import { emptyFilters, filterRecords, type RecordFilters } from '../utils/filters'
import { applyStatusOverrides, getSubmittedRecords } from '../utils/localStorage'

export function BrowsePage() {
  const [filters, setFilters] = useState<RecordFilters>(emptyFilters)
  const [records, setRecords] = useState(() => applyStatusOverrides([...getSubmittedRecords(), ...researchRecords]))

  useEffect(() => {
    setRecords(applyStatusOverrides([...getSubmittedRecords(), ...researchRecords]))
  }, [])

  const filteredRecords = useMemo(() => filterRecords(records, filters), [filters, records])

  function updateFilter(key: keyof RecordFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <div>
      <PageHeader eyebrow="Repository" title="Browse Research Records" description="Search and filter fictional sample metadata by department, year, theme, access status, and validation status." />
      <SimulationNotice>Prototype data only: filters operate on static TypeScript records plus any browser-local submissions.</SimulationNotice>

      <section className="mt-5 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <Field label="Keyword search"><TextInput value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} placeholder="Search title, author, theme..." /></Field>
          <Field label="Department"><SelectInput value={filters.department} onChange={(event) => updateFilter('department', event.target.value)}><option>All</option>{departments.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Year"><SelectInput value={filters.year} onChange={(event) => updateFilter('year', event.target.value)}><option>All</option>{years.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Theme"><SelectInput value={filters.theme} onChange={(event) => updateFilter('theme', event.target.value)}><option>All</option>{themes.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Access"><SelectInput value={filters.accessStatus} onChange={(event) => updateFilter('accessStatus', event.target.value)}><option>All</option><option>Open</option><option>Campus Only</option><option>Restricted</option></SelectInput></Field>
          <Field label="Validation"><SelectInput value={filters.validationStatus} onChange={(event) => updateFilter('validationStatus', event.target.value)}><option>All</option><option>Validated</option><option>Pending Review</option><option>Needs Revision</option><option>Rejected</option></SelectInput></Field>
        </div>
        <p className="mt-4 text-sm text-stone-600">Showing <strong>{filteredRecords.length}</strong> of {records.length} records.</p>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        {filteredRecords.map((record) => <ResearchCard key={record.id} record={record} />)}
      </section>
    </div>
  )
}
