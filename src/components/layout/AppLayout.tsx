import clsx from 'clsx'
import { LogIn, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Search, UserPlus, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router'
import { navItems, roleDescriptions, type PrototypeRole } from '../../data/users'
import { clearSimulatedSession, getSidebarCollapsed, getSimulatedSession, getStoredRole, setSidebarCollapsed, type SimulatedSession } from '../../utils/localStorage'

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(() => getSidebarCollapsed())
  const [session, setSession] = useState<SimulatedSession | null>(() => getSimulatedSession())
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

  useEffect(() => {
    const syncSession = () => setSession(getSimulatedSession())
    window.addEventListener('storage', syncSession)
    window.addEventListener('suluan-session-change', syncSession)
    return () => {
      window.removeEventListener('storage', syncSession)
      window.removeEventListener('suluan-session-change', syncSession)
    }
  }, [])

  function toggleSidebar() {
    setCollapsed((value) => {
      const nextValue = !value
      setSidebarCollapsed(nextValue)
      return nextValue
    })
  }

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-stone-900">
      <aside className={clsx('fixed inset-y-0 left-0 z-30 hidden border-r border-stone-200 bg-white transition-[width] duration-200 lg:flex lg:flex-col', collapsed ? 'w-20' : 'w-80')}>
        <Brand collapsed={collapsed} />
        <button
          type="button"
          onClick={toggleSidebar}
          className="mx-4 mb-3 inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm font-bold text-stone-700 shadow-sm transition hover:bg-stone-50"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" aria-hidden="true" /> : <PanelLeftClose className="h-4 w-4" aria-hidden="true" />}
          {collapsed ? null : <span>Collapse</span>}
        </button>
        <Navigation items={visibleNav} role={role} collapsed={collapsed} />
        <AccountPanel session={session} onSignOut={clearSimulatedSession} collapsed={collapsed} />
      </aside>

      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Brand compact />
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-lg border border-stone-200 p-2 text-stone-700" aria-label="Toggle navigation">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {menuOpen ? (
          <div className="border-t border-stone-200 px-4 py-3">
            <Navigation items={visibleNav} role={role} mobile />
            <AccountPanel session={session} onSignOut={clearSimulatedSession} mobile />
          </div>
        ) : null}
      </header>

      <main className={clsx('flex min-h-screen flex-col transition-[padding] duration-200', collapsed ? 'lg:pl-20' : 'lg:pl-80')}>
        <div className="border-b border-stone-200 bg-[#002D72] px-4 py-2 text-xs font-semibold text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <span>University of the Assumption research intelligence prototype</span>
            <span className="text-white/75">Static frontend demo / sample metadata only</span>
          </div>
        </div>
        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-5 flex flex-col gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0038A8]">Active prototype role</p>
              <p className="text-sm leading-6 text-stone-600">{roleDescriptions[role]}</p>
              {session ? <p className="mt-1 text-xs font-bold text-[#002D72]">Signed in: {session.role}</p> : <p className="mt-1 text-xs text-stone-500">Not signed in. Account pages are prototype simulations only.</p>}
            </div>
            <Link to="/semantic-search" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0038A8] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#002D72]">
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

function Brand({ compact = false, collapsed = false }: { compact?: boolean; collapsed?: boolean }) {
  return (
    <Link to="/" className={clsx('block', compact ? 'p-0' : collapsed ? 'border-b border-stone-200 px-2 py-6 text-center' : 'border-b border-stone-200 px-5 py-6')} title="SULUAN">
      <p className={clsx('font-black tracking-wide text-stone-950', compact ? 'text-lg' : collapsed ? 'text-sm' : 'text-2xl')}>SULUAN</p>
      {collapsed ? null : (
        <p className={clsx('mt-1 max-w-56 font-semibold leading-snug text-stone-500', compact ? 'text-xs' : 'text-sm')}>
          AI-Assisted Institutional Research Intelligence Platform
        </p>
      )}
    </Link>
  )
}

function Navigation({ items, role, collapsed = false, mobile = false }: { items: typeof navItems; role: PrototypeRole; collapsed?: boolean; mobile?: boolean }) {
  const compact = collapsed && !mobile

  return (
    <nav className={clsx('flex-1 space-y-1 overflow-y-auto', mobile ? 'pb-3' : compact ? 'px-3 py-2' : 'px-4 py-2')} aria-label="SULUAN navigation">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <NavLink
            key={item.path}
            to={item.path}
            title={compact ? item.label : undefined}
            aria-label={compact ? item.label : undefined}
            className={({ isActive }) =>
              clsx(
                'flex items-center rounded-lg text-sm font-bold transition',
                compact ? 'justify-center px-2 py-3' : 'gap-3 px-3 py-2.5',
                isActive ? 'bg-[#0038A8] text-white shadow-sm' : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950',
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {compact ? null : <span>{item.label}</span>}
          </NavLink>
        )
      })}
      <div className={clsx('mt-5 rounded-xl border border-[#c7d8f5] bg-[#edf4ff] text-xs leading-5 text-[#002D72]', compact ? 'px-2 py-3 text-center' : 'p-3')} title={compact ? `Navigation shown for ${role}. Role access is simulated with localStorage only.` : undefined}>
        {compact ? <span className="font-black">{role.slice(0, 1)}</span> : <>Navigation shown for <span className="font-black">{role}</span>. Role access is simulated with localStorage only.</>}
      </div>
    </nav>
  )
}

function AccountPanel({ session, onSignOut, collapsed = false, mobile = false }: { session: SimulatedSession | null; onSignOut: () => void; collapsed?: boolean; mobile?: boolean }) {
  const compact = collapsed && !mobile

  return (
    <div className={clsx('border-t border-stone-200', mobile ? 'pt-3' : compact ? 'px-3 py-4' : 'px-4 py-5')}>
      {session ? (
        <div className="space-y-2">
          <div className={clsx('rounded-xl border border-[#c7d8f5] bg-[#edf4ff] text-[#002D72]', compact ? 'px-2 py-3 text-center' : 'p-3')} title={compact ? `Signed in: ${session.role}` : undefined}>
            {compact ? <span className="text-xs font-black">{session.role.slice(0, 1)}</span> : (
              <>
                <p className="text-xs font-black uppercase tracking-[0.14em]">Signed in</p>
                <p className="mt-1 text-sm font-bold">{session.role}</p>
                <p className="mt-1 truncate text-xs text-[#002D72]/75">{session.emailOrUaId}</p>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className={clsx('flex w-full items-center rounded-lg border border-stone-200 bg-white text-sm font-bold text-stone-700 transition hover:bg-stone-50', compact ? 'justify-center px-2 py-3' : 'gap-2 px-3 py-2.5')}
            title={compact ? 'Sign Out' : undefined}
            aria-label={compact ? 'Sign Out' : undefined}
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            {compact ? null : 'Sign Out'}
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <AccountLink to="/login" icon={LogIn} label="Login" compact={compact} />
          <AccountLink to="/create-account" icon={UserPlus} label="Create Account" compact={compact} />
          {compact ? null : <p className="text-xs leading-5 text-stone-500">Account pages simulate interface flow only.</p>}
        </div>
      )}
    </div>
  )
}

function AccountLink({ to, icon: Icon, label, compact }: { to: string; icon: LucideIcon; label: string; compact: boolean }) {
  return (
    <NavLink
      to={to}
      title={compact ? label : undefined}
      aria-label={compact ? label : undefined}
      className={({ isActive }) => clsx('flex items-center rounded-lg text-sm font-bold transition', compact ? 'justify-center px-2 py-3' : 'gap-2 px-3 py-2.5', isActive ? 'bg-[#0038A8] text-white shadow-sm' : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950')}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {compact ? null : label}
    </NavLink>
  )
}
