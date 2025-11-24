'use client';

export default function ShiftFilters({ from, to, onChange }: { from: string; to: string; onChange: (range: { from: string; to: string }) => void }) {
  return (
    <div className="mb-4 flex flex-wrap items-end gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm shadow-sm">
      <label className="flex flex-col text-slate-700">
        <span>Von</span>
        <input
          type="date"
          value={from}
          onChange={(e) => onChange({ from: e.target.value, to })}
          className="mt-1 rounded-md border border-slate-200 px-3 py-2 focus:border-slate-500 focus:outline-none"
        />
      </label>
      <label className="flex flex-col text-slate-700">
        <span>Bis</span>
        <input
          type="date"
          value={to}
          onChange={(e) => onChange({ from, to: e.target.value })}
          className="mt-1 rounded-md border border-slate-200 px-3 py-2 focus:border-slate-500 focus:outline-none"
        />
      </label>
    </div>
  );
}
