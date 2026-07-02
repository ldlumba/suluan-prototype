import { FlaskConical } from 'lucide-react'

export function SimulationNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-sm leading-6 text-amber-950 shadow-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
        <FlaskConical className="h-4 w-4" aria-hidden="true" />
      </div>
      <div>{children}</div>
    </div>
  )
}