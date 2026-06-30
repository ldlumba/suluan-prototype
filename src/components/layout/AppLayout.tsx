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
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-stone-200 bg-white lg:block">
        <Brand />
        <Navigation items={visibleNav} role={role} />
      </aside>

      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Brand compact />
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="rounded-md border border-stone-200 p-2 text-stone-700" aria-label="Toggle navigation">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        {menuOpen ? <Navigation items={visibleNav} role={role} mobile /> : null}
      </header>

      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mb-5 flex flex-col gap-3 rounded-lg border border-stone-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Active prototype role</p>
              <p className="text-sm text-stone-600">{roleDescriptions[role]}</p>
            </div>
            <Link to="/semantic-search" className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
              <Search className="h-4 w-4" aria-hidden="true" />
              Search repository
            </Link>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className={clsx('flex items-center gap-3', compact ? 'p-0' : 'border-b border-stone-200 px-5 py-5')}>
      <img src="/suluan-logo-placeholder.svg" alt="SULUAN logo placeholder" className="h-11 w-11 rounded-lg" />
      <div>
        <p className="text-lg font-black tracking-wide text-stone-950">SULUAN</p>
        <p className="text-xs font-medium text-stone-500">Research Intelligence Prototype</p>
      </div>
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
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition',
                isActive ? 'bg-emerald-700 text-white shadow-sm' : 'text-stone-700 hover:bg-stone-100 hover:text-stone-950',
              )
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {item.label}
          </NavLink>
        )
      })}
      <div className="mt-5 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-xs text-emerald-900">
        Navigation shown for <span className="font-bold">{role}</span>. Role access is simulated with localStorage only.
      </div>
    </nav>
  )
}
