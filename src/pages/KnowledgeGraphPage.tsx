import '@xyflow/react/dist/style.css'
import { Background, Controls, ReactFlow } from '@xyflow/react'
import { BookOpen, GitBranch, Info, Network } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Field, SelectInput } from '../components/common/FormControls'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { GraphLegend } from '../components/graph/GraphLegend'
import { buildFocusedGraph, graphRecords } from '../data/graphData'

export function KnowledgeGraphPage() {
  const [selectedRecordId, setSelectedRecordId] = useState(graphRecords[0]?.id ?? '')
  const focusedGraph = useMemo(() => buildFocusedGraph(selectedRecordId), [selectedRecordId])
  const { selectedRecord, relatedRecords, nodes, edges } = focusedGraph

  return (
    <div>
      <PageHeader
        eyebrow="Relationship exploration"
        title="Knowledge Graph Explorer"
        description="Explore validated sample relationships among research records, authors, academic units, themes, keywords, and related studies."
      />
      <SimulationNotice>
        <strong>Prototype simulation:</strong> this Knowledge Graph is generated from temporary sample metadata. In the full system, relationships require validated records and provenance review.
      </SimulationNotice>

      <section className="mt-5 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <Field label="Choose a validated sample research record">
            <SelectInput value={selectedRecordId} onChange={(event) => setSelectedRecordId(event.target.value)}>
              {graphRecords.map((record) => (
                <option key={record.id} value={record.id}>{record.title}</option>
              ))}
            </SelectInput>
          </Field>
          <div className="rounded-lg border border-[#c7d8f5] bg-[#edf4ff] px-4 py-3 text-sm leading-6 text-[#002D72]">
            Showing one focused graph from validated sample metadata only.
          </div>
        </div>
      </section>

      <div className="mt-5"><GraphLegend /></div>

      <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="h-[560px] overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.35}
            maxZoom={1.25}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
          >
            <Background gap={24} size={1} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>

        <aside className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-lg bg-[#edf4ff] p-2 text-[#0038A8]"><GitBranch className="h-4 w-4" aria-hidden="true" /></span>
            <div>
              <h2 className="text-lg font-black text-stone-950">Relationship Details</h2>
              <p className="text-xs text-stone-500">Reviewable metadata connections</p>
            </div>
          </div>

          <div className="space-y-4 text-sm leading-6 text-stone-700">
            <RelationshipBlock title="Authors" items={selectedRecord.authors} />
            <RelationshipBlock title="Academic Unit" items={[selectedRecord.department]} />
            <RelationshipBlock title="Research Theme" items={[selectedRecord.researchTheme]} />
            <RelationshipBlock title="Shared Keywords" items={selectedRecord.keywords} />
            <RelationshipBlock title="Related Records" items={relatedRecords.map((record) => record.title)} />
            <div>
              <h3 className="font-black text-stone-950">Provenance / Why These Appear</h3>
              <p className="mt-1 text-stone-600">{selectedRecord.provenanceNotes}</p>
              <p className="mt-2 text-stone-600">Connections are drawn from sample metadata fields: authors, academic unit, research theme, keywords, and relatedRecordIds. Related records may also appear when validated sample records share themes or keywords.</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <span className="rounded-lg bg-[#edf4ff] p-2 text-[#0038A8]"><BookOpen className="h-4 w-4" aria-hidden="true" /></span>
          <div>
            <h2 className="text-lg font-black text-stone-950">Relationship Summary</h2>
            <p className="text-sm text-stone-600">Plain-text fallback for the focused graph.</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <SummaryCard icon={<Info className="h-4 w-4" aria-hidden="true" />} title="Selected Record">
            <p><span className="font-bold text-stone-950">{selectedRecord.title}</span> is a validated sample record from {selectedRecord.department} under the {selectedRecord.researchTheme} theme.</p>
            <p className="mt-2">Its sample metadata lists {selectedRecord.authors.join(', ')} as author{selectedRecord.authors.length === 1 ? '' : 's'} and uses keywords such as {selectedRecord.keywords.slice(0, 4).join(', ')}.</p>
          </SummaryCard>

          <SummaryCard icon={<Network className="h-4 w-4" aria-hidden="true" />} title="Related Studies">
            {relatedRecords.length > 0 ? (
              <ul className="space-y-2">
                {relatedRecords.map((record) => (
                  <li key={record.id}>
                    <span className="font-bold text-stone-950">{record.title}</span> appears because it {record.relationshipReason}.
                  </li>
                ))}
              </ul>
            ) : (
              <p>No related validated sample records are available for this selected record.</p>
            )}
          </SummaryCard>
        </div>
      </section>
    </div>
  )
}

function RelationshipBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="font-black text-stone-950">{title}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-semibold text-stone-700">{item}</span>
        ))}
      </div>
    </div>
  )
}

function SummaryCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-700">
      <div className="mb-2 flex items-center gap-2 text-[#0038A8]">
        {icon}
        <h3 className="font-black text-stone-950">{title}</h3>
      </div>
      {children}
    </article>
  )
}
