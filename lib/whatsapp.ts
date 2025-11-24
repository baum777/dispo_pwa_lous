import type { Shift, ShiftStaffMember } from './shiftTypes';

function encodeWhatsApp(number: string, text: string) {
  const params = new URLSearchParams({ text });
  return `https://wa.me/${number.replace(/[^\d+]/g, '')}?${params.toString()}`;
}

export function buildStaffWhatsApp(shift: Shift, member: ShiftStaffMember) {
  if (!member.whatsappNumber) return '';
  const text = `Hi ${member.name}, ich habe eine kurze Frage zu ${shift.eventName} (${shift.date} ${shift.timeRange}).`;
  return encodeWhatsApp(member.whatsappNumber, text);
}
