import { ArrowRight, BarChart3, BookOpen, Brain, Database, Network, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { AccessBadge, Badge, ValidationBadge } from '../components/common/Badge'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { StatCard } from '../components/common/StatCard'
import { researchRecords, schoolCollegeUnits } from '../data/researchRecords'

const featureCards = [
  { title: 'Simulated Semantic Search', description: 'Simulated semantic discovery using predefined temporary scenarios.', icon: Brain, href: '/semantic-search' },
  { title: 'Knowledge Graph', description: 'Explore paper, author, academic unit, theme, and keyword relationships.', icon: Network, href: '/knowledge-graph' },
  { title: 'Analytics', description: 'View descriptive repository patterns from fictional sample metadata.', icon: BarChart3, href: '/analytics' },
  { title: 'Repository Management', description: 'Review validation queues and prototype-only metadata submissions.', icon: Database, href: '/admin' },
]

const unitAccents = ['#f4d600', '#ef4b26', '#e91469', '#9da29e', '#347d38', '#f4f4f2', '#f4d600', '#211982']
const darkTextUnits = new Set(['College of Accountancy', 'School of Arts and Sciences', 'School of Business and Public Administration'])

export function HomePage() {
  const validatedRecords = researchRecords.filter((record) => record.validationStatus === 'Validated')
  const featuredRecords = validatedRecords.filter((record) => record.featured).slice(0, 6)
  const academicUnits = new Set(validatedRecords.map((record) => record.department)).size
  const themes = new Set(validatedRecords.map((record) => record.researchTheme)).size
  const workflowRecords = researchRecords.filter((record) => record.validationStatus !== 'Validated').length

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
            SULUAN presents the approved prototype behavior of a UA-governed research intelligence platform: centralized validated sample metadata, reviewable provenance, simulated semantic discovery, Knowledge Graph exploration, administrative validation simulation, and descriptive analytics.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/semantic-search" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
              <Brain className="h-4 w-4" aria-hidden="true" />
              Try simulated search
            </Link>
            <Link to="/browse" className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Browse records
            </Link>
          </div>
        </div>
        <SimulationNotice>
          <strong>Prototype simulation:</strong> normal discovery uses validated fictional sample metadata only. AI, authentication, database storage, role access, metadata submissions, and validation workflows are simulated for demonstration only.
        </SimulationNotice>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Validated discovery records" value={validatedRecords.length} detail="Fictional metadata only" icon={BookOpen} />
        <StatCard label="Academic units" value={academicUnits} detail="Prototype distribution" icon={Database} />
        <StatCard label="Research themes" value={themes} detail="Used by filters and graph" icon={Network} />
        <StatCard label="Admin workflow records" value={workflowRecords} detail="Pending, revision, or rejected samples" icon={ShieldCheck} />
      </section>

      <section className="mt-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Discovery sample</p>
            <h2 className="text-xl font-bold text-stone-950">Featured Research Records</h2>
            <p className="mt-1 text-sm text-stone-600">Selected validated sample records for visibility and discovery demonstration, not automatic ranking or awards.</p>
          </div>
          <Link to="/browse" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900">
            View all records <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {featuredRecords.map((record) => (
            <Link key={record.id} to={`/records/${record.id}`} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
              <div className="mb-3 flex flex-wrap gap-2"><AccessBadge status={record.accessStatus} /><ValidationBadge status={record.validationStatus} /></div>
              <h3 className="text-base font-bold leading-6 text-stone-950">{record.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{record.department}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{record.abstract}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Academic unit browsing</p>
          <h2 className="text-xl font-bold text-stone-950">Browse by School and College</h2>
          <p className="mt-1 text-sm text-stone-600">Choose an academic unit to open validated sample records prefiltered on the Browse page. Logo spaces are placeholders for this prototype.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {schoolCollegeUnits.map((unit, index) => {
            const background = unitAccents[index % unitAccents.length]
            const darkText = darkTextUnits.has(unit)
            return (
              <Link
                key={unit}
                to={`/browse?academicUnit=${encodeURIComponent(unit)}`}
                className="group flex min-h-48 flex-col justify-between rounded-lg border border-stone-200 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ backgroundColor: background, color: darkText ? '#14213d' : '#ffffff' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-white/80 text-xs font-bold text-stone-400 shadow-inner">Logo</div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-emerald-700 shadow-sm">+</span>
                </div>
                <div>
                  <h3 className="text-sm font-black leading-tight">{unit}</h3>
                  <p className={`mt-2 text-xs leading-5 ${darkText ? 'text-stone-700' : 'text-white/85'}`}>Validated sample metadata</p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-5">
          <Link to="/browse" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
            View All Records <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => {
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
