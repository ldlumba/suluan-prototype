import clsx from 'clsx'
import { Menu, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import { navItems, roleDescriptions, type PrototypeRole } from '../../data/users'
import { getStoredRole } from '../../utils/localStorage'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [role, setRole] = useState<PrototypeRole>(() => getStoredRole())
  const visibleNav = navItems.filter((item) => item.roles.includes(role))

  useEffect(() => {
    const syncRole = () => setRole(getStoredRole())
    window.addEventListener('storage', syncRole)
    window.addEventListener('suluan-role-change', syncRole)
    return () => {
      window.removeEventListener('storage', syncRole)
      window.removeEventListener('suluan-role-change', syncRole)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-stone-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-80 border-r border-stone-200 bg-white lg:block">
        <Brand />
        <Navigation items={visibleNav} role={role} />
      </aside>

      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Brand compact />
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-lg border border-stone-200 p-2 text-stone-700" aria-label="Toggle navigation">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {menuOpen ? <Navigation items={visibleNav} role={role} mobile /> : null}
      </header>

      <main className="flex min-h-screen flex-col lg:pl-80">
        <div className="border-b border-stone-200 bg-[#062f6f] px-4 py-2 text-xs font-semibold text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span>University of the Assumption research intelligence prototype</span>
            <span className="text-white/75">Static frontend demo / sample metadata only</span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Active prototype role</p>
              <p className="text-sm leading-6 text-stone-600">{roleDescriptions[role]}</p>
            </div>
            <Link to="/semantic-search" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search repository
            </Link>
          </div>
          <Outlet />
        </div>
        <SiteFooter />
      </main>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-800 bg-stone-950 text-white">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-7 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-xl font-black tracking-wide">SULUAN</h2>
          <p className="mt-1 text-sm font-semibold text-stone-300">AI-Assisted Institutional Research Intelligence Platform</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-stone-400">A static academic demonstration for metadata visibility, discovery, provenance review, validation workflow simulation, and descriptive analytics.</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-stone-300">Sample contact</h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">Research Repository Help Desk<br />University of the Assumption</p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wide text-stone-300">Prototype support</h3>
          <p className="mt-2 text-sm leading-6 text-stone-400">suluan.prototype@example.edu<br />Office of Research Metadata Support</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 text-xs leading-5 text-stone-500 sm:px-6 lg:px-8">
          Copyright 2026 SULUAN Prototype Team. This site is a sample-only academic demonstration and is not the final production system.
        </div>
      </div>
    </footer>
  )
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className={clsx('block', compact ? 'p-0' : 'border-b border-stone-200 px-5 py-6')}>
      <p className={clsx('font-black tracking-wide text-stone-950', compact ? 'text-lg' : 'text-2xl')}>SULUAN</p>
      <p className={clsx('mt-1 max-w-56 font-semibold leading-snug text-stone-500', compact ? 'text-xs' : 'text-sm')}>
        AI-Assisted Institutional Research Intelligence Platform
      </p>
    </Link>
  )
}

function Navigation({ items, role, mobile = false }: { items: typeof navItems; role: PrototypeRole; mobile?: boolean }) {
  return (
    <nav className={clsx('space-y-1', mobile ? 'border-t border-stone-200 px-4 py-3' : 'px-4 py-5')} aria-label="SULUAN navigation">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition',
                isActive ? 'bg-emerald-700 text-white shadow-sm' : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950',
              )
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </NavLink>
        )
      })}
      <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-xs leading-5 text-emerald-950">
        Navigation shown for <span className="font-black">{role}</span>. Role access is simulated with localStorage only.
      </div>
    </nav>
  )
}