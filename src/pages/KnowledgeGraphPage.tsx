import '@xyflow/react/dist/style.css'
import { Background, Controls, MiniMap, ReactFlow } from '@xyflow/react'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { GraphLegend } from '../components/graph/GraphLegend'
import { graphEdges, graphNodes } from '../data/graphData'

export function KnowledgeGraphPage() {
  return (
    <div>
      <PageHeader eyebrow="Relationship exploration" title="Knowledge Graph" description="Static graph generated from temporary prototype metadata. Nodes represent papers, authors, departments, themes, and keywords." />
      <SimulationNotice>The graph is generated from temporary prototype metadata and is not connected to a live repository or AI graph service.</SimulationNotice>
      <div className="mt-5"><GraphLegend /></div>
      <section className="mt-5 h-[680px] overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
        <ReactFlow nodes={graphNodes} edges={graphEdges} fitView minZoom={0.15} maxZoom={1.5}>
          <Background />
          <MiniMap pannable zoomable />
          <Controls />
        </ReactFlow>
      </section>
    </div>
  )
}
