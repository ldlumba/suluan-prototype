import type { ResearchRecord } from '../data/researchRecords'

export function getApaCitation(record: ResearchRecord) {
  return record.citation.apa
}

export async function copyText(text: string) {
  if (!navigator.clipboard) {
    return false
  }

  await navigator.clipboard.writeText(text)
  return true
}
