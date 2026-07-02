import type { LucideIcon } from 'lucide-react'
import { BarChart3, BookOpen, Brain, FilePlus2, LayoutDashboard, Network, Search, Settings2, UserRoundCog } from 'lucide-react'

export type PrototypeRole = 'Student' | 'Faculty' | 'Repository Manager' | 'Admin'

export type NavItem = {
  label: string
  path: string
  icon: LucideIcon
  roles: PrototypeRole[]
}

export const prototypeRoles: PrototypeRole[] = ['Student', 'Faculty', 'Repository Manager', 'Admin']

export const navItems: NavItem[] = [
  { label: 'Home', path: '/', icon: LayoutDashboard, roles: prototypeRoles },
  { label: 'Browse Records', path: '/browse', icon: BookOpen, roles: prototypeRoles },
  { label: 'Simulated Semantic Search', path: '/semantic-search', icon: Brain, roles: prototypeRoles },
  { label: 'Knowledge Graph', path: '/knowledge-graph', icon: Network, roles: prototypeRoles },
  { label: 'Analytics', path: '/analytics', icon: BarChart3, roles: ['Faculty', 'Repository Manager', 'Admin'] },
  { label: 'Submit / Import Metadata', path: '/submit', icon: FilePlus2, roles: ['Faculty', 'Repository Manager', 'Admin'] },
  { label: 'Admin Dashboard', path: '/admin', icon: Settings2, roles: ['Repository Manager', 'Admin'] },
  { label: 'Role Demo', path: '/roles', icon: UserRoundCog, roles: prototypeRoles },
]

export const roleDescriptions: Record<PrototypeRole, string> = {
  Student: 'Can browse open and campus-labeled metadata, use simulated semantic search, and explore related work.',
  Faculty: 'Can browse, search, view analytics, and create prototype-only metadata submissions.',
  'Repository Manager': 'Can review validation queues, adjust simulated statuses, and inspect metadata provenance.',
  Admin: 'Can access all prototype navigation areas and demonstrate administrative review behavior.',
}

export const defaultRole: PrototypeRole = 'Student'
export const searchableRole = { label: 'Repository Search', path: '/browse', icon: Search, roles: prototypeRoles }

