export default function FormSection({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {title ? <h2 className="mb-4 text-lg font-semibold text-slate-900">{title}</h2> : null}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
