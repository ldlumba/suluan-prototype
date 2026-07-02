import type { LucideIcon } from 'lucide-react'

export function StatCard({ label, value, detail, icon: Icon }: { label: string; value: string | number; detail?: string; icon: LucideIcon }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#9ebbe5] hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-stone-500">{label}</p>
          <p className="mt-2 text-3xl font-black text-stone-950">{value}</p>
        </div>
        <div className="rounded-lg bg-[#eef5ff] p-2.5 text-[#063b82] ring-1 ring-[#c9d9f2]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      {detail ? <p className="mt-3 text-xs leading-5 text-stone-500">{detail}</p> : null}
    </div>
  )
}
