import type { Shift } from './shiftTypes';

function encodeMailto(address: string, subject: string, body: string) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${address}?${params.toString()}`;
}

export function buildDispoMail(shift: Shift) {
  const subject = `Disposition | ${shift.date} ${shift.timeRange}`;
  const body = `Hallo Dispo,%0D%0A%0D%0Aich habe eine Rückfrage zu diesem Einsatz:%0D%0A${shift.eventName} | ${shift.locationName}%0D%0A${shift.date} ${shift.weekday} ${shift.timeRange}`;
  return encodeMailto('dispo@example.com', subject, body);
}

export function buildLocationMail(shift: Shift) {
  const subject = `Rückfrage | ${shift.eventName}`;
  const body = `Hallo,%0D%0A%0D%0Aich habe eine Rückfrage zum Standort ${shift.locationName} (${shift.date} ${shift.timeRange}).`;
  return encodeMailto(shift.locationContactEmail, subject, body);
}
