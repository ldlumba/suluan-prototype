import { BarChart3, BookOpen, Brain, Database, Network, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { Badge } from '../components/common/Badge'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { StatCard } from '../components/common/StatCard'
import { researchRecords } from '../data/researchRecords'

const cards = [
  { title: 'Semantic Search', description: 'Prototype AI-like discovery using predefined temporary scenarios.', icon: Brain, href: '/semantic-search' },
  { title: 'Knowledge Graph', description: 'Explore paper, author, department, theme, and keyword relationships.', icon: Network, href: '/knowledge-graph' },
  { title: 'Analytics', description: 'View repository patterns from fictional sample metadata.', icon: BarChart3, href: '/analytics' },
  { title: 'Repository Management', description: 'Review validation queues and prototype-only metadata submissions.', icon: Database, href: '/admin' },
]

export function HomePage() {
  const departments = new Set(researchRecords.map((record) => record.department)).size
  const themes = new Set(researchRecords.map((record) => record.researchTheme)).size
  const pending = researchRecords.filter((record) => record.validationStatus === 'Pending Review').length

  return (
    <div>
      <PageHeader
        eyebrow="University of the Assumption"
        title="SULUAN Research Intelligence Prototype"
        description="A high-fidelity static prototype for discovering, reviewing, and explaining institutional research metadata without backend services, real AI, external databases, paid APIs, or confidential records."
        action={<Badge tone="amber">Prototype simulation</Badge>}
      />

      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-stone-950">Research discovery for proposal defense</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">
            SULUAN presents the intended behavior of an AI-assisted institutional research platform: searchable metadata, simulated semantic discovery, relationship mapping, administrative validation, and summary analytics.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/semantic-search" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
              <Brain className="h-4 w-4" aria-hidden="true" />
              Try semantic search
            </Link>
            <Link to="/browse" className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Browse records
            </Link>
          </div>
        </div>
        <SimulationNotice>
          <strong>Prototype simulation:</strong> all records are fictional sample metadata. AI, authentication, database storage, role access, submissions, and validation workflows are simulated for demonstration only.
        </SimulationNotice>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Sample records" value={researchRecords.length} detail="Fictional metadata only" icon={BookOpen} />
        <StatCard label="Departments" value={departments} detail="Prototype distribution" icon={Database} />
        <StatCard label="Research themes" value={themes} detail="Used by filters and graph" icon={Network} />
        <StatCard label="Pending review" value={pending} detail="Queue state simulation" icon={ShieldCheck} />
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.title} to={card.href} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-md bg-emerald-50 p-2 text-emerald-700"><Icon className="h-5 w-5" aria-hidden="true" /></div>
              <h3 className="font-bold text-stone-950">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{card.description}</p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
