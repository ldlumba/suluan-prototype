import { Save } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Field, SelectInput, TextArea, TextInput } from '../components/common/FormControls'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import type { AccessStatus, RecordType, ResearchRecord } from '../data/researchRecords'
import { departments, themes } from '../data/researchRecords'
import { saveSubmittedRecord } from '../utils/localStorage'

const recordTypes: RecordType[] = ['Thesis', 'Capstone', 'Faculty Research', 'Case Study']
const accessStatuses: AccessStatus[] = ['Open', 'Campus Only', 'Restricted']

export function SubmitRecordPage() {
  const [savedId, setSavedId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', authors: '', department: departments[0], program: '', year: String(new Date().getFullYear()), abstract: '', keywords: '', researchTheme: themes[0], adviser: '', accessStatus: 'Campus Only' as AccessStatus, publicationSource: 'Prototype Local Submission', recordType: 'Thesis' as RecordType })

  function update(key: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const id = `LOCAL-${Date.now()}`
    const authors = form.authors.split(',').map((author) => author.trim()).filter(Boolean)
    const record: ResearchRecord = {
      id,
      title: form.title,
      authors: authors.length ? authors : ['Prototype Submitter'],
      department: form.department,
      program: form.program || 'Prototype Program',
      year: Number(form.year) || new Date().getFullYear(),
      abstract: form.abstract,
      keywords: form.keywords.split(',').map((keyword) => keyword.trim()).filter(Boolean),
      researchTheme: form.researchTheme,
      adviser: form.adviser || 'Prototype Adviser',
      accessStatus: form.accessStatus,
      validationStatus: 'Pending Review',
      publicationSource: form.publicationSource,
      recordType: form.recordType,
      citation: {
        apa: `${authors.join(', ') || 'Prototype Submitter'}. (${form.year}). ${form.title}. ${form.publicationSource}.`,
        mla: `${authors.join(', ') || 'Prototype Submitter'}. "${form.title}." ${form.publicationSource}, ${form.year}.`,
      },
      provenanceNotes: 'Submitted through the SULUAN prototype form. Stored in localStorage only.',
      relatedRecordIds: [],
    }
    saveSubmittedRecord(record)
    setSavedId(id)
  }

  return (
    <div>
      <PageHeader eyebrow="Prototype intake" title="Submit / Import Metadata" description="Create a browser-local metadata record for demonstration. This is not a real database, UA repository, or document submission." />
      <SimulationNotice>This form saves to localStorage only. It does not upload files, create a backend record, or store confidential university data.</SimulationNotice>

      <form onSubmit={submit} className="mt-5 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Title"><TextInput required value={form.title} onChange={(event) => update('title', event.target.value)} /></Field>
          <Field label="Authors, comma-separated"><TextInput required value={form.authors} onChange={(event) => update('authors', event.target.value)} /></Field>
          <Field label="Department"><SelectInput value={form.department} onChange={(event) => update('department', event.target.value)}>{departments.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Program"><TextInput value={form.program} onChange={(event) => update('program', event.target.value)} /></Field>
          <Field label="Year"><TextInput type="number" value={form.year} onChange={(event) => update('year', event.target.value)} /></Field>
          <Field label="Theme"><SelectInput value={form.researchTheme} onChange={(event) => update('researchTheme', event.target.value)}>{themes.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Adviser"><TextInput value={form.adviser} onChange={(event) => update('adviser', event.target.value)} /></Field>
          <Field label="Access status"><SelectInput value={form.accessStatus} onChange={(event) => update('accessStatus', event.target.value)}>{accessStatuses.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Publication source"><TextInput value={form.publicationSource} onChange={(event) => update('publicationSource', event.target.value)} /></Field>
          <Field label="Record type"><SelectInput value={form.recordType} onChange={(event) => update('recordType', event.target.value)}>{recordTypes.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field>
          <Field label="Keywords, comma-separated"><TextInput value={form.keywords} onChange={(event) => update('keywords', event.target.value)} /></Field>
          <div className="md:col-span-2"><Field label="Abstract"><TextArea required rows={5} value={form.abstract} onChange={(event) => update('abstract', event.target.value)} /></Field></div>
        </div>
        <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"><Save className="h-4 w-4" /> Save prototype metadata</button>
        {savedId ? <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">Saved locally as {savedId}. It will appear in Browse and Admin Dashboard on this browser only.</p> : null}
      </form>
    </div>
  )
}

