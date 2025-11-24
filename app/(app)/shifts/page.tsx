'use client';

import { useCallback, useEffect, useState } from 'react';
import ShiftTable from '@/components/shifts/ShiftTable';
import ShiftFilters from '@/components/shifts/ShiftFilters';
import PageHeader from '@/components/layout/PageHeader';
import type { Shift } from '@/lib/shiftTypes';

function dateRange(daysAhead: number) {
  const now = new Date();
  const from = now.toISOString().slice(0, 10);
  const to = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  return { from, to };
}

export default function ShiftsPage() {
  const [range, setRange] = useState(dateRange(14));
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const loadShifts = useCallback(async () => {
    setStatus('loading');
    try {
      const params = new URLSearchParams({ from: range.from, to: range.to });
      const res = await fetch(`/api/shifts?${params.toString()}`);
      const data = await res.json();
      setShifts(data.shifts ?? []);
      setStatus('idle');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  }, [range.from, range.to]);

  useEffect(() => {
    loadShifts();
  }, [loadShifts]);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Schichten"
        description="Tippe auf Datum/Zeit, Standort, Event oder Team, um Kontakt aufzunehmen oder Infos zu öffnen."
      />
      <ShiftFilters from={range.from} to={range.to} onChange={setRange} />
      {status === 'loading' && <div className="text-sm text-slate-600">Schichten werden geladen…</div>}
      {status === 'error' && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          Fehler beim Laden. <button onClick={loadShifts}>Erneut versuchen</button>
        </div>
      )}
      <ShiftTable shifts={shifts} />
    </div>
  );
}
