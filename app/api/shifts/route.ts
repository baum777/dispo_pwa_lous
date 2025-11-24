import { NextResponse } from 'next/server';
import { fetchShifts } from '@/lib/filemakerClient';

function parseDate(value: string | null, fallback: Date) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const now = new Date();
  const defaultFrom = now.toISOString().slice(0, 10);
  const defaultTo = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

  const fromDate = parseDate(searchParams.get('from'), new Date(defaultFrom));
  const toDate = parseDate(searchParams.get('to'), new Date(defaultTo));

  const from = fromDate.toISOString().slice(0, 10);
  const to = toDate.toISOString().slice(0, 10);

  const shifts = await fetchShifts({ from, to });
  return NextResponse.json({ shifts });
}
