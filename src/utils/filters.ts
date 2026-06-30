import type { AccessStatus, ResearchRecord, ValidationStatus } from '../data/researchRecords'

export type RecordFilters = {
  query: string
  department: string
  year: string
  theme: string
  accessStatus: string
  validationStatus: string
}

export const emptyFilters: RecordFilters = {
  query: '',
  department: 'All',
  year: 'All',
  theme: 'All',
  accessStatus: 'All',
  validationStatus: 'All',
}

export function filterRecords(records: ResearchRecord[], filters: RecordFilters) {
  const normalizedQuery = filters.query.trim().toLowerCase()

  return records.filter((record) => {
    const searchable = [record.title, record.abstract, record.department, record.program, record.researchTheme, record.adviser, record.authors.join(' '), record.keywords.join(' ')]
      .join(' ')
      .toLowerCase()

    return (
      (!normalizedQuery || searchable.includes(normalizedQuery)) &&
      (filters.department === 'All' || record.department === filters.department) &&
      (filters.year === 'All' || String(record.year) === filters.year) &&
      (filters.theme === 'All' || record.researchTheme === filters.theme) &&
      (filters.accessStatus === 'All' || record.accessStatus === (filters.accessStatus as AccessStatus)) &&
      (filters.validationStatus === 'All' || record.validationStatus === (filters.validationStatus as ValidationStatus))
    )
  })
}

export function countBy<T extends string | number>(values: T[]) {
  return values.reduce<Record<string, number>>((counts, value) => {
    counts[String(value)] = (counts[String(value)] ?? 0) + 1
    return counts
  }, {})
}
