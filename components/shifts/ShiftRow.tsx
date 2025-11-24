import { buildDispoMail, buildLocationMail } from '@/lib/mailto';
import { buildStaffWhatsApp } from '@/lib/whatsapp';
import type { Shift } from '@/lib/shiftTypes';

export default function ShiftRow({ shift }: { shift: Shift }) {
  return (
    <tr className="border-b border-slate-200 last:border-none">
      <td className="px-3 py-3 align-top text-sm text-slate-800">
        <a href={buildDispoMail(shift)} className="font-semibold text-slate-900 hover:underline">
          {shift.date} {shift.weekday}
        </a>
        <div className="text-slate-600">{shift.timeRange}</div>
      </td>
      <td className="px-3 py-3 align-top text-sm text-slate-800">
        <a href={buildLocationMail(shift)} className="hover:underline">
          {shift.locationName}
        </a>
      </td>
      <td className="px-3 py-3 align-top text-sm text-slate-800">
        {shift.detailsPdfUrl ? (
          <a href={shift.detailsPdfUrl} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
            {shift.eventName}
          </a>
        ) : (
          <span className="text-slate-700">{shift.eventName}</span>
        )}
      </td>
      <td className="px-3 py-3 align-top text-sm text-slate-800">
        <div className="flex flex-wrap gap-2">
          {shift.staff.map((member) => {
            const href = buildStaffWhatsApp(shift, member);
            const clickable = Boolean(member.whatsappNumber);
            const className = clickable
              ? 'rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100'
              : 'rounded-full bg-slate-100 px-3 py-1 text-slate-500 ring-1 ring-slate-200';
            return clickable ? (
              <a key={member.name} href={href} className={className}>
                {member.name}
              </a>
            ) : (
              <span key={member.name} className={className}>
                {member.name}
              </span>
            );
          })}
        </div>
      </td>
    </tr>
  );
}
