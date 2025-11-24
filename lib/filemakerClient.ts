import { mapFileMakerRecordToShift } from './shiftMapper';
import type { Shift } from './shiftTypes';

const { FM_BASE_URL, FM_USER, FM_PASSWORD } = process.env;

async function fetchFromFileMaker(url: string) {
  if (!FM_BASE_URL) {
    return null;
  }

  const authHeader = Buffer.from(`${FM_USER}:${FM_PASSWORD}`).toString('base64');
  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${authHeader}`
    }
  });

  if (!response.ok) {
    throw new Error(`FileMaker request failed with ${response.status}`);
  }

  return response.json();
}

export async function fetchShifts({ from, to }: { from: string; to: string }): Promise<Shift[]> {
  // TODO: real FileMaker integration once credentials are available
  const queryUrl = `${FM_BASE_URL ?? ''}/shifts?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

  try {
    const data = await fetchFromFileMaker(queryUrl);
    if (data && Array.isArray(data.records)) {
      return data.records.map(mapFileMakerRecordToShift);
    }
  } catch (error) {
    console.warn('Falling back to mocked shifts because FileMaker call failed', error);
  }

  const today = new Date();
  const sample: Shift[] = [
    {
      id: 'demo-1',
      date: from,
      weekday: 'Mo',
      timeRange: '08:30 bis 13:30',
      locationName: 'Mercedes-Benz - Eichner - Ulm',
      locationContactEmail: 'standort@example.com',
      eventName: 'LMT Loudwig',
      detailsPdfUrl: 'https://example.com/event.pdf',
      staff: [
        { name: 'Julian G', whatsappNumber: '+491701234567' },
        { name: 'Dana M', whatsappNumber: '+4915112345678' }
      ]
    },
    {
      id: 'demo-2',
      date: new Date(today.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      weekday: 'Di',
      timeRange: '12:00 bis 17:00',
      locationName: 'Stadtfest Augsburg',
      locationContactEmail: 'kontakt@augsburg.de',
      eventName: 'Street Food Festival',
      staff: [{ name: 'Alex K' }]
    }
  ];

  return sample.filter((shift) => shift.date >= from && shift.date <= to);
}
