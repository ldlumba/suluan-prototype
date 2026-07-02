import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Badge } from '../components/common/Badge'
import { PageHeader } from '../components/common/PageHeader'
import { SimulationNotice } from '../components/common/SimulationNotice'
import { navItems, prototypeRoles, roleDescriptions, type PrototypeRole } from '../data/users'
import { getStoredRole, setStoredRole } from '../utils/localStorage'

export function RoleDemoPage() {
  const [role, setRole] = useState<PrototypeRole>(() => getStoredRole())
  const allowed = navItems.filter((item) => item.roles.includes(role))
  const locked = navItems.filter((item) => !item.roles.includes(role))

  useEffect(() => {
    setStoredRole(role)
    window.dispatchEvent(new Event('suluan-role-change'))
  }, [role])

  return (
    <div>
      <PageHeader eyebrow="Access demonstration" title="Role Demo" description="Switch between Student, Faculty, Repository Manager, and Admin to show how navigation and available actions can change in the prototype." />
      <SimulationNotice>This is simulated role-based access only. It uses localStorage and does not authenticate real users.</SimulationNotice>

      <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {prototypeRoles.map((item) => (
          <button key={item} type="button" onClick={() => setRole(item)} className={`rounded-lg border p-4 text-left shadow-sm ${role === item ? 'border-[#0038A8] bg-[#edf4ff]' : 'border-stone-200 bg-white hover:border-[#9bb9ee]'}`}>
            <div className="flex items-center justify-between gap-3"><span className="font-bold text-stone-950">{item}</span>{role === item ? <CheckCircle2 className="h-5 w-5 text-[#0038A8]" /> : null}</div>
            <p className="mt-2 text-sm leading-6 text-stone-600">{roleDescriptions[item]}</p>
          </button>
        ))}
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-stone-950">Available navigation</h2>
          <div className="mt-4 flex flex-wrap gap-2">{allowed.map((item) => <Badge key={item.path} tone="primary">{item.label}</Badge>)}</div>
        </div>
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-stone-950">Hidden for selected role</h2>
          <div className="mt-4 flex flex-wrap gap-2">{locked.length ? locked.map((item) => <Badge key={item.path} tone="gray">{item.label}</Badge>) : <Badge tone="blue">All prototype areas visible</Badge>}</div>
        </div>
      </section>
    </div>
  )
}
