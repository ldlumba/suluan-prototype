export function ChartFrame({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-4 border-b border-stone-100 pb-3">
        <h2 className="text-base font-black text-stone-950">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm leading-6 text-stone-500">{subtitle}</p> : null}
      </div>
      <div className="h-72">{children}</div>
    </section>
  )
}