import { ArrowRight, BarChart3, BookOpen, Brain, Database, Network, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router'
import { AccessBadge, Badge, ValidationBadge } from '../components/common/Badge'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { StatCard } from '../components/common/StatCard'
import { researchRecords, schoolCollegeUnits } from '../data/researchRecords'

const featureCards = [
  { title: 'Simulated Semantic Search', description: 'Predefined scenarios and fallback matching demonstrate concept-based discovery over validated sample metadata.', icon: Brain, href: '/semantic-search' },
  { title: 'Knowledge Graph', description: 'Explore paper, author, academic unit, theme, keyword, and related-record relationships generated from sample metadata.', icon: Network, href: '/knowledge-graph' },
  { title: 'Descriptive Analytics', description: 'Review repository distribution patterns by academic unit, year, theme, validation status, and access status.', icon: BarChart3, href: '/analytics' },
  { title: 'Repository Management', description: 'Demonstrate metadata intake, provenance review, and validation workflow states with localStorage only.', icon: Database, href: '/admin' },
]

const unitAccents = [
  { background: '#f4d600', foreground: '#111827', ring: 'rgba(255,255,255,0.78)' },
  { background: '#ef4b26', foreground: '#ffffff', ring: 'rgba(255,255,255,0.72)' },
  { background: '#e91469', foreground: '#ffffff', ring: 'rgba(255,255,255,0.72)' },
  { background: '#9da29e', foreground: '#ffffff', ring: 'rgba(255,255,255,0.78)' },
  { background: '#347d38', foreground: '#ffffff', ring: 'rgba(255,255,255,0.72)' },
  { background: '#f7f7f4', foreground: '#062f6f', ring: 'rgba(255,255,255,0.92)' },
  { background: '#f4d600', foreground: '#111827', ring: 'rgba(255,255,255,0.78)' },
  { background: '#211982', foreground: '#ffffff', ring: 'rgba(255,255,255,0.72)' },
]

export function HomePage() {
  const validatedRecords = researchRecords.filter((record) => record.validationStatus === 'Validated')
  const featuredRecords = validatedRecords.filter((record) => record.featured).slice(0, 6)
  const academicUnits = new Set(validatedRecords.map((record) => record.department)).size
  const themes = new Set(validatedRecords.map((record) => record.researchTheme)).size
  const workflowRecords = researchRecords.filter((record) => record.validationStatus !== 'Validated').length
  const unitCounts = schoolCollegeUnits.reduce<Record<string, number>>((acc, unit) => ({ ...acc, [unit]: validatedRecords.filter((record) => record.department === unit).length }), {})

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-white/10 bg-[#062f6f] px-6 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white/80">
          University of the Assumption / Static proposal defense prototype
        </div>
        <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr] lg:p-8">
          <div>
            <Badge tone="blue">Prototype simulation</Badge>
            <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight text-stone-950 sm:text-4xl lg:text-5xl">SULUAN</h1>
            <p className="mt-2 text-lg font-bold text-emerald-800">AI-Assisted Institutional Research Intelligence Platform</p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600">
              A high-fidelity frontend prototype for research metadata visibility, governed discovery, provenance review, validation workflow simulation, Knowledge Graph exploration, and descriptive analytics using fictional sample records only.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/semantic-search" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800">
                <Brain className="h-4 w-4" aria-hidden="true" />
                Try simulated search
              </Link>
              <Link to="/browse" className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-bold text-stone-800 transition hover:bg-stone-50">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Browse validated records
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.16em] text-stone-500">Prototype scope</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
              <p><span className="font-bold text-stone-950">Uses:</span> static TypeScript data and localStorage.</p>
              <p><span className="font-bold text-stone-950">Shows:</span> validated sample records for normal discovery.</p>
              <p><span className="font-bold text-stone-950">Does not use:</span> real AI, backend, authentication, databases, paid APIs, or confidential UA records.</p>
            </div>
          </div>
        </div>
      </section>

      <SimulationNotice>
        <strong>Prototype simulation:</strong> normal discovery uses validated fictional sample metadata only. AI, authentication, database storage, role access, metadata submissions, and validation workflows are simulated for demonstration only.
      </SimulationNotice>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Validated records" value={validatedRecords.length} detail="Normal discovery dataset" icon={BookOpen} />
        <StatCard label="Academic units" value={academicUnits} detail="Schools, colleges, and faculty samples" icon={Database} />
        <StatCard label="Research themes" value={themes} detail="Used by filters and graph" icon={Network} />
        <StatCard label="Admin workflow" value={workflowRecords} detail="Pending, revision, or rejected samples" icon={ShieldCheck} />
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Discovery sample</p>
            <h2 className="mt-1 text-2xl font-black text-stone-950">Featured Research Records</h2>
            <p className="mt-1 text-sm leading-6 text-stone-600">Selected validated sample records for visibility and discovery demonstration, not automatic ranking, awards, or quality judgment.</p>
          </div>
          <Link to="/browse" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900">
            View all records <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {featuredRecords.map((record) => (
            <Link key={record.id} to={`/records/${record.id}`} className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
              <div className="mb-3 flex flex-wrap gap-2"><AccessBadge status={record.accessStatus} /><ValidationBadge status={record.validationStatus} /></div>
              <h3 className="text-base font-black leading-6 text-stone-950 group-hover:text-emerald-800">{record.title}</h3>
              <p className="mt-2 text-sm font-semibold text-stone-600">{record.department}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{record.abstract}</p>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Academic unit browsing</p>
          <h2 className="mt-1 text-2xl font-black text-stone-950">Browse by School and College</h2>
          <p className="mt-1 text-sm leading-6 text-stone-600">Open the Browse Research Records page with validated sample records prefiltered by academic unit. Circular spaces are blank placeholders only.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {schoolCollegeUnits.map((unit, index) => {
            const accent = unitAccents[index % unitAccents.length]
            return (
              <Link
                key={unit}
                to={`/browse?academicUnit=${encodeURIComponent(unit)}`}
                className="group flex min-h-52 flex-col justify-between rounded-xl border border-stone-200 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{ backgroundColor: accent.background, color: accent.foreground }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="h-20 w-20 rounded-full border-2 bg-white/45 shadow-inner" style={{ borderColor: accent.ring }} aria-hidden="true" />
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-black text-emerald-700 shadow-sm">+</span>
                </div>
                <div>
                  <h3 className="max-w-56 text-sm font-black leading-tight">{unit}</h3>
                  <p className="mt-2 text-xs font-semibold leading-5 opacity-85">{unitCounts[unit]} validated sample record{unitCounts[unit] === 1 ? '' : 's'}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-5">
          <Link to="/browse" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800">
            View All Records <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((card) => {
          const Icon = card.icon
          return (
            <Link key={card.title} to={card.href} className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-emerald-50 p-2.5 text-emerald-700 ring-1 ring-emerald-100"><Icon className="h-5 w-5" aria-hidden="true" /></div>
              <h3 className="font-black text-stone-950">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{card.description}</p>
            </Link>
          )
        })}
      </section>
    </div>
  )
}