export default function Panel({ titulo, conclusion, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-superficie p-6">
      <h2 className="text-lg font-bold text-black">{titulo}</h2>
      {conclusion && <p className="mt-1 text-sm text-slate-600">{conclusion}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}
