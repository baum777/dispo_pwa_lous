import type { Shift } from '@/lib/shiftTypes';
import ShiftRow from './ShiftRow';

export default function ShiftTable({ shifts }: { shifts: Shift[] }) {
  if (!shifts.length) {
    return <div className="rounded-md border border-dashed border-slate-200 bg-white p-6 text-center text-slate-600">Keine Schichten gefunden.</div>;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="hidden min-w-full divide-y divide-slate-200 sm:table">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
          <tr>
            <th className="px-3 py-2">Datum</th>
            <th className="px-3 py-2">Standort</th>
            <th className="px-3 py-2">Event</th>
            <th className="px-3 py-2">Team</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <ShiftRow key={shift.id} shift={shift} />
          ))}
        </tbody>
      </table>

      <div className="grid gap-3 p-3 sm:hidden">
        {shifts.map((shift) => (
          <article key={shift.id} className="space-y-2 rounded-md border border-slate-200 p-3 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">
              <a href={shift.detailsPdfUrl ?? '#'} className={shift.detailsPdfUrl ? 'hover:underline' : ''}>
                {shift.eventName}
              </a>
            </div>
            <div className="text-sm text-slate-700">
              <a href={shift.detailsPdfUrl ?? '#'} className={shift.detailsPdfUrl ? 'hover:underline' : ''}>
                {shift.date} {shift.weekday} · {shift.timeRange}
              </a>
            </div>
            <div className="text-sm text-slate-700">
              <a href={`mailto:${shift.locationContactEmail}`}>{shift.locationName}</a>
            </div>
            <div className="flex flex-wrap gap-2">
              {shift.staff.map((member) => (
                <span key={member.name} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                  {member.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
