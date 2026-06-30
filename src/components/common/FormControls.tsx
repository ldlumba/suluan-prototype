export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-600/20 focus:border-emerald-700 focus:ring-4 ${props.className ?? ''}`} />
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-600/20 focus:border-emerald-700 focus:ring-4 ${props.className ?? ''}`} />
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm outline-none ring-emerald-600/20 focus:border-emerald-700 focus:ring-4 ${props.className ?? ''}`} />
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-stone-700">
      <span className="mb-1 block">{label}</span>
      {children}
    </label>
  )
}
