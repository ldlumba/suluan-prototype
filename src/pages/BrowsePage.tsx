import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { Field, SelectInput, TextInput } from '../components/common/FormControls'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { ValidationStatusGuide } from '../components/common/ValidationStatusGuide'
import { ResearchCard } from '../components/research/ResearchCard'
import { departments, researchRecords, themes, years } from '../data/researchRecords'
import { emptyFilters, filterRecords, type RecordFilters } from '../utils/filters'
import { applyStatusOverrides, getSubmittedRecords } from '../utils/localStorage'

export function BrowsePage() {
  const [searchParams] = useSearchParams()
  const academicUnit = searchParams.get('academicUnit')
  const [filters, setFilters] = useState<RecordFilters>({ ...emptyFilters, department: academicUnit ?? 'All', validationStatus: 'Validated' })
  const [records, setRecords] = useState(() => applyStatusOverrides([...getSubmittedRecords(), ...researchRecords]))

  useEffect(() => {
    setRecords(applyStatusOverrides([...getSubmittedRecords(), ...researchRecords]))
  }, [])

  useEffect(() => {
    setFilters((current) => ({ ...current, department: academicUnit ?? 'All', validationStatus: 'Validated' }))
  }, [academicUnit])

  const discoverableRecords = useMemo(() => records.filter((record) => record.validationStatus === 'Validated'), [records])
  const filteredRecords = useMemo(() => filterRecords(discoverableRecords, { ...filters, validationStatus: 'Validated' }), [filters, discoverableRecords])

  function updateFilter(key: keyof RecordFilters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <div>
      <PageHeader eyebrow="Repository" title="Browse Research Records" description="Search and filter validated fictional sample metadata by academic unit, year, theme, and access status." />
      <SimulationNotice>
        Normal browsing shows validated sample records only. Pending and revision records are available in the Admin Dashboard for validation workflow demonstration.
      </SimulationNotice>
      <div className="mt-5"><ValidationStatusGuide /></div>

      <section className="mt-5 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Field label="Keyword search"><TextInput value={filters.query} onChange={(event) => updateFilter('query', event.target.value)} placeholder="Search title, author, theme..." /></Field>
          <Field label="Academic Unit"><SelectInput value={filters.department} onChange={(event) => updateFilter('department', event.target.value)}><option>All</option>{departments.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Year"><SelectInput value={filters.year} onChange={(event) => updateFilter('year', event.target.value)}><option>All</option>{years.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Theme"><SelectInput value={filters.theme} onChange={(event) => updateFilter('theme', event.target.value)}><option>All</option>{themes.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Access"><SelectInput value={filters.accessStatus} onChange={(event) => updateFilter('accessStatus', event.target.value)}><option>All</option><option>Open</option><option>Campus Only</option><option>Restricted</option></SelectInput></Field>
        </div>
        <p className="mt-4 text-sm text-stone-600">Showing <strong>{filteredRecords.length}</strong> of {discoverableRecords.length} validated records{filters.department !== 'All' ? ` for ${filters.department}` : ''}.</p>
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-2">
        {filteredRecords.map((record) => <ResearchCard key={record.id} record={record} />)}
      </section>
    </div>
  )
}
