import { MarkerType, type Edge, type Node } from '@xyflow/react'
import { researchRecords } from './researchRecords'

const graphRecords = researchRecords.filter((record) => record.validationStatus === 'Validated').slice(0, 14)
const palette = { paper: '#1f6f5b', author: '#28536b', department: '#8a5a24', theme: '#7c3f58', keyword: '#4f6f2f' }

function dataNode(id: string, label: string, type: keyof typeof palette, x: number, y: number): Node {
  return {
    id,
    position: { x, y },
    data: { label },
    style: {
      border: `1px solid ${palette[type]}`,
      background: '#ffffff',
      color: '#16202a',
      borderRadius: 8,
      fontSize: 12,
      padding: 10,
      width: type === 'paper' ? 220 : 170,
    },
  }
}

const paperNodes = graphRecords.map((record, index) => dataNode(`paper-${record.id}`, record.title, 'paper', (index % 4) * 270, Math.floor(index / 4) * 180))
const authorNames = Array.from(new Set(graphRecords.flatMap((record) => record.authors))).slice(0, 12)
const departmentNames = Array.from(new Set(graphRecords.map((record) => record.department)))
const themeNames = Array.from(new Set(graphRecords.map((record) => record.researchTheme)))
const keywordNames = Array.from(new Set(graphRecords.flatMap((record) => record.keywords))).slice(0, 14)

export const graphNodes: Node[] = [
  ...paperNodes,
  ...authorNames.map((author, index) => dataNode(`author-${author}`, author, 'author', 1150, index * 90)),
  ...departmentNames.map((department, index) => dataNode(`department-${department}`, department, 'department', -260, index * 120)),
  ...themeNames.map((theme, index) => dataNode(`theme-${theme}`, theme, 'theme', index * 220, 720)),
  ...keywordNames.map((keyword, index) => dataNode(`keyword-${keyword}`, keyword, 'keyword', 1160, 580 + index * 70)),
]

const baseEdge = { markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#6b776f' } }

export const graphEdges: Edge[] = graphRecords.flatMap((record) => {
  const paperId = `paper-${record.id}`
  const authorEdges = record.authors.filter((author) => authorNames.includes(author)).map((author) => ({ id: `${paperId}-author-${author}`, source: paperId, target: `author-${author}`, label: 'author', ...baseEdge }))
  const keywordEdges = record.keywords.filter((keyword) => keywordNames.includes(keyword)).map((keyword) => ({ id: `${paperId}-keyword-${keyword}`, source: paperId, target: `keyword-${keyword}`, label: 'keyword', ...baseEdge }))
  const relatedEdges = record.relatedRecordIds
    .filter((relatedId) => graphRecords.some((item) => item.id === relatedId))
    .map((relatedId) => ({ id: `${paperId}-related-${relatedId}`, source: paperId, target: `paper-${relatedId}`, label: 'related', style: { stroke: '#b88a1d', strokeDasharray: '5 5' }, markerEnd: { type: MarkerType.ArrowClosed } }))

  return [
    { id: `${paperId}-department`, source: paperId, target: `department-${record.department}`, label: 'department', ...baseEdge },
    { id: `${paperId}-theme`, source: paperId, target: `theme-${record.researchTheme}`, label: 'theme', ...baseEdge },
    ...authorEdges,
    ...keywordEdges,
    ...relatedEdges,
  ]
})

