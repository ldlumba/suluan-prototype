import { Brain, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Field, TextInput } from '../components/common/FormControls'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { ValidationStatusGuide } from '../components/common/ValidationStatusGuide'
import { SearchResultCard } from '../components/search/SearchResultCard'
import { semanticScenarios } from '../data/semanticScenarios'
import { runSemanticSimulation } from '../utils/semanticSimulation'

export function SemanticSearchPage() {
  const [query, setQuery] = useState('repository metadata validation')
  const simulation = useMemo(() => runSemanticSimulation(query), [query])

  return (
    <div>
      <PageHeader eyebrow="Prototype semantic discovery" title="Simulated Semantic Search" description="Enter a topic and the prototype retrieves conceptually related sample records through predefined scenarios or fallback keyword/theme matching." />
      <SimulationNotice><strong>Prototype simulation:</strong> semantic results are generated from validated sample records only. No real AI model or external scholarly service is used.</SimulationNotice>
      <div className="mt-5"><ValidationStatusGuide /></div>

      <section className="mt-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <Field label="Research question or topic">
          <div className="flex flex-col gap-3 sm:flex-row">
            <TextInput value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try: campus service queue, student well-being, disaster preparedness" />
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0038A8] px-4 py-2 text-sm font-semibold text-white">
              <Search className="h-4 w-4" aria-hidden="true" /> Simulate
            </button>
          </div>
        </Field>
        <div className="mt-4 flex flex-wrap gap-2">
          {semanticScenarios.map((scenario) => (
            <button key={scenario.id} type="button" onClick={() => setQuery(scenario.triggers[0])} className="rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:border-[#9bb9ee] hover:bg-[#edf4ff]">
              {scenario.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="mb-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0038A8]"><Brain className="h-4 w-4" /> {simulation.title}</div>
          <p className="mt-2 text-sm leading-6 text-stone-600">{simulation.explanation}</p>
        </div>
        <div className="space-y-4">
          {simulation.results.map((result, index) => <SearchResultCard key={result.record.id} result={result} index={index} />)}
          {simulation.results.length === 0 ? <p className="rounded-xl border border-stone-200 bg-white p-5 text-sm text-stone-600">No prototype matches found. Try repository, student support, campus service, or disaster preparedness.</p> : null}
        </div>
      </section>
    </div>
  )
}
