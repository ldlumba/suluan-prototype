import { MarkerType, type Edge, type Node } from '@xyflow/react'
import { researchRecords, type ResearchRecord } from './researchRecords'

export const graphRecords = researchRecords.filter((record) => record.validationStatus === 'Validated')

const palette = {
  paper: '#0038A8',
  author: '#1E63B5',
  department: '#CE1126',
  theme: '#FFD100',
  keyword: '#5b6472',
  related: '#002D72',
}

type GraphNodeType = keyof typeof palette

type RelatedRecord = ResearchRecord & { sharedKeywords: string[]; relationshipReason: string }

export type FocusedGraph = {
  selectedRecord: ResearchRecord
  relatedRecords: RelatedRecord[]
  nodes: Node[]
  edges: Edge[]
}

function compactId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function dataNode(id: string, label: string, type: GraphNodeType, x: number, y: number): Node {
  const isDark = type === 'paper' || type === 'related' || type === 'author' || type === 'department'

  return {
    id,
    position: { x, y },
    data: { label },
    type: 'default',
    draggable: false,
    style: {
      border: `1px solid ${palette[type]}`,
      background: isDark ? palette[type] : '#ffffff',
      color: isDark ? '#ffffff' : '#16202a',
      borderRadius: 10,
      fontSize: 12,
      fontWeight: type === 'paper' ? 800 : 700,
      lineHeight: 1.35,
      padding: 10,
      width: type === 'paper' ? 250 : type === 'related' ? 210 : 180,
      boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
    },
  }
}

function sharedKeywordsFor(record: ResearchRecord, other: ResearchRecord) {
  const otherKeywords = new Set(other.keywords.map((keyword) => keyword.toLowerCase()))
  return record.keywords.filter((keyword) => otherKeywords.has(keyword.toLowerCase()))
}

function relatedReason(record: ResearchRecord, other: ResearchRecord, sharedKeywords: string[]) {
  const reasons = []

  if (record.relatedRecordIds.includes(other.id)) {
    reasons.push('listed as a related study in the sample metadata')
  }

  if (record.researchTheme === other.researchTheme) {
    reasons.push(`shares the ${record.researchTheme} theme`)
  }

  if (sharedKeywords.length > 0) {
    reasons.push(`shares ${sharedKeywords.slice(0, 3).join(', ')}`)
  }

  if (record.department === other.department) {
    reasons.push('belongs to the same academic unit')
  }

  if (record.recordType === other.recordType) {
    reasons.push(`uses the same ${record.recordType.toLowerCase()} record type`)
  }

  return reasons.length > 0 ? reasons.join('; ') : 'included as a nearby validated sample record for graph context'
}

function getRelatedRecords(record: ResearchRecord): RelatedRecord[] {
  const directRelated = record.relatedRecordIds
    .map((id) => graphRecords.find((item) => item.id === id))
    .filter((item): item is ResearchRecord => Boolean(item))

  const inferredRelated = graphRecords
    .filter((item) => item.id !== record.id && !directRelated.some((direct) => direct.id === item.id))
    .map((item) => ({ record: item, sharedKeywords: sharedKeywordsFor(record, item) }))
    .filter(({ record: item, sharedKeywords }) => item.researchTheme === record.researchTheme || sharedKeywords.length > 0 || item.department === record.department || item.recordType === record.recordType)
    .sort((a, b) => {
      const themeScore = Number(b.record.researchTheme === record.researchTheme) - Number(a.record.researchTheme === record.researchTheme)
      const unitScore = Number(b.record.department === record.department) - Number(a.record.department === record.department)
      const typeScore = Number(b.record.recordType === record.recordType) - Number(a.record.recordType === record.recordType)
      return themeScore || b.sharedKeywords.length - a.sharedKeywords.length || unitScore || typeScore || b.record.year - a.record.year
    })
    .map(({ record: item }) => item)

  return [...directRelated, ...inferredRelated]
    .slice(0, 5)
    .map((item) => {
      const sharedKeywords = sharedKeywordsFor(record, item)
      return { ...item, sharedKeywords, relationshipReason: relatedReason(record, item, sharedKeywords) }
    })
}

export function buildFocusedGraph(recordId: string): FocusedGraph {
  const selectedRecord = graphRecords.find((record) => record.id === recordId) ?? graphRecords[0]
  const relatedRecords = getRelatedRecords(selectedRecord)
  const centerId = `paper-${selectedRecord.id}`
  const keywords = selectedRecord.keywords.slice(0, 6)

  const nodes: Node[] = [
    dataNode(centerId, selectedRecord.title, 'paper', 400, 240),
    dataNode(`unit-${compactId(selectedRecord.department)}`, selectedRecord.department, 'department', 390, 30),
    dataNode(`theme-${compactId(selectedRecord.researchTheme)}`, selectedRecord.researchTheme, 'theme', 710, 70),
    ...selectedRecord.authors.map((author, index) => dataNode(`author-${compactId(author)}`, author, 'author', 40, 120 + index * 105)),
    ...keywords.map((keyword, index) => dataNode(`keyword-${compactId(keyword)}`, keyword, 'keyword', 760, 180 + index * 72)),
    ...relatedRecords.map((record, index) => dataNode(`related-${record.id}`, record.title, 'related', 80 + index * 230, 480)),
  ]

  const baseEdge = {
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#94a3b8', strokeWidth: 1.5 },
  }

  const relatedEdge = {
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#CE1126', strokeDasharray: '5 5', strokeWidth: 1.8 },
  }

  const edges: Edge[] = [
    { id: `${centerId}-unit`, source: centerId, target: `unit-${compactId(selectedRecord.department)}`, ...baseEdge },
    { id: `${centerId}-theme`, source: centerId, target: `theme-${compactId(selectedRecord.researchTheme)}`, ...baseEdge },
    ...selectedRecord.authors.map((author) => ({ id: `${centerId}-author-${compactId(author)}`, source: centerId, target: `author-${compactId(author)}`, ...baseEdge })),
    ...keywords.map((keyword) => ({ id: `${centerId}-keyword-${compactId(keyword)}`, source: centerId, target: `keyword-${compactId(keyword)}`, ...baseEdge })),
    ...relatedRecords.map((record) => ({ id: `${centerId}-related-${record.id}`, source: centerId, target: `related-${record.id}`, ...relatedEdge })),
  ]

  return { selectedRecord, relatedRecords, nodes, edges }
}




