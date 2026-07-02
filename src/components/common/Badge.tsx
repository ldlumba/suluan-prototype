import clsx from 'clsx'
import type { AccessStatus, ValidationStatus } from '../../data/researchRecords'

type BadgeTone = 'green' | 'amber' | 'red' | 'blue' | 'gray' | 'violet'

const toneClasses: Record<BadgeTone, string> = {
  green: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  amber: 'border-amber-200 bg-amber-50 text-amber-800',
  red: 'border-rose-200 bg-rose-50 text-rose-800',
  blue: 'border-sky-200 bg-sky-50 text-sky-800',
  gray: 'border-stone-200 bg-stone-50 text-stone-700',
  violet: 'border-violet-200 bg-violet-50 text-violet-800',
}

export function Badge({ children, tone = 'gray' }: { children: React.ReactNode; tone?: BadgeTone }) {
  return <span className={clsx('inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide', toneClasses[tone])}>{children}</span>
}

export function AccessBadge({ status }: { status: AccessStatus }) {
  const tone: Record<AccessStatus, BadgeTone> = { Open: 'green', 'Campus Only': 'blue', Restricted: 'red' }
  return <Badge tone={tone[status]}>{status}</Badge>
}

export function ValidationBadge({ status }: { status: ValidationStatus }) {
  const tone: Record<ValidationStatus, BadgeTone> = { Validated: 'green', 'Pending Review': 'amber', 'Needs Revision': 'violet', Rejected: 'red' }
  return <Badge tone={tone[status]}>{status}</Badge>
}