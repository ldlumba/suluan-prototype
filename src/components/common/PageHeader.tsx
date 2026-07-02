export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-stone-200 bg-white px-5 py-5 shadow-sm sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          {eyebrow ? <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-[#0038A8]">{eyebrow}</p> : null}
          <h1 className="text-2xl font-black leading-tight text-stone-950 sm:text-3xl">{title}</h1>
          {description ? <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-600">{description}</p> : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  )
}
