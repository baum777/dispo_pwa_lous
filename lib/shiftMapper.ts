import type { Shift } from './shiftTypes';

type FileMakerRecord = {
  recordId: string;
  fieldData: Record<string, unknown>;
};

export function mapFileMakerRecordToShift(record: FileMakerRecord): Shift {
  const fields = record.fieldData;
  return {
    id: record.recordId,
    date: String(fields['date'] ?? ''),
    weekday: String(fields['weekday'] ?? ''),
    timeRange: String(fields['timeRange'] ?? ''),
    locationName: String(fields['locationName'] ?? ''),
    locationContactEmail: String(fields['locationContactEmail'] ?? 'dispo@example.com'),
    eventName: String(fields['eventName'] ?? ''),
    detailsPdfUrl: fields['detailsPdfUrl'] ? String(fields['detailsPdfUrl']) : undefined,
    staff: Array.isArray(fields['staff'])
      ? (fields['staff'] as unknown[]).map((entry, idx) => {
          if (typeof entry === 'string') {
            return { name: entry };
          }
          if (entry && typeof entry === 'object') {
            const obj = entry as Record<string, unknown>;
            return {
              name: String(obj.name ?? `Mitarbeiter ${idx + 1}`),
              whatsappNumber: obj.whatsappNumber ? String(obj.whatsappNumber) : undefined
            };
          }
          return { name: `Mitarbeiter ${idx + 1}` };
        })
      : []
  };
}
