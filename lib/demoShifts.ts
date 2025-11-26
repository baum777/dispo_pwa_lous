import type { Shift } from './shiftTypes';

type DateRange = {
  from: string;
  to: string;
};

const WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];

const SHIFT_TEMPLATES: Array<Omit<Shift, 'date' | 'weekday'> & { dayOffset: number }> = [
  {
    id: 'demo-1',
    dayOffset: 0,
    timeRange: '08:30 bis 13:30',
    locationName: "Lou's Truck Süd",
    locationContactEmail: 'truck-sued@lous.team',
    eventName: 'Frühschicht City Süd',
    detailsPdfUrl: 'https://example.com/demo-shift-1.pdf',
    staff: [
      { name: 'Alex K', whatsappNumber: '+4915112345678' },
      { name: 'Dana M', whatsappNumber: '+491701234567' }
    ]
  },
  {
    id: 'demo-2',
    dayOffset: 1,
    timeRange: '12:00 bis 18:00',
    locationName: 'Stadtfest Augsburg',
    locationContactEmail: 'kontakt@augsburg.de',
    eventName: 'Street Food Festival',
    staff: [{ name: 'Julian G', whatsappNumber: '+491601112233' }]
  },
  {
    id: 'demo-3',
    dayOffset: 3,
    timeRange: '09:00 bis 15:00',
    locationName: 'Werk Canteen',
    locationContactEmail: 'werk@lous.team',
    eventName: 'Lunch & Learn',
    detailsPdfUrl: 'https://example.com/demo-shift-3.pdf',
    staff: [
      { name: 'Mira S' },
      { name: 'Lukas T', whatsappNumber: '+4917676543210' }
    ]
  },
  {
    id: 'demo-4',
    dayOffset: 5,
    timeRange: '16:00 bis 22:30',
    locationName: 'Allianz Campus',
    locationContactEmail: 'campus@allianz.de',
    eventName: 'Afterwork Pop-Up',
    staff: [
      { name: 'Svenja L', whatsappNumber: '+491521998877' },
      { name: 'Omar R' }
    ]
  }
];

function parseDate(value: string) {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getDemoShifts(range: DateRange): Shift[] {
  const startDate = parseDate(range.from);
  const endDate = parseDate(range.to);

  const generated = SHIFT_TEMPLATES.map((template) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + template.dayOffset);
    return {
      ...template,
      date: formatDate(date),
      weekday: WEEKDAYS[date.getDay()]
    };
  });

  return generated.filter((shift) => {
    const shiftDate = new Date(shift.date);
    return shiftDate >= startDate && shiftDate <= endDate;
  });
}
