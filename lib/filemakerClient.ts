import { getDemoShifts } from './demoShifts';
import { getFileMakerCredentials, getFmBaseUrl, isDemoMode } from './env';
import { mapFileMakerRecordToShift } from './shiftMapper';
import type { Shift } from './shiftTypes';

type DateRange = { from: string; to: string };

function normalizePath(path: string) {
  if (!path.startsWith('/')) {
    return `/${path}`;
  }
  return path;
}

async function fetchFromFileMaker(path: string) {
  const baseUrl = getFmBaseUrl({ required: true });
  const { username, password } = getFileMakerCredentials();
  const requestUrl = `${baseUrl.replace(/\/$/, '')}${normalizePath(path)}`;

  const authHeader = Buffer.from(`${username}:${password}`).toString('base64');
  const response = await fetch(requestUrl, {
    headers: {
      Authorization: `Basic ${authHeader}`
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`FileMaker request failed with ${response.status}`);
  }

  return response.json();
}

function isConfigError(error: unknown) {
  if (!(error instanceof Error)) return false;
  return (
    error.message.includes('FM_BASE_URL is not set') ||
    error.message.includes('FM_USER and FM_PASSWORD must be set')
  );
}

export async function fetchShifts({ from, to }: DateRange): Promise<Shift[]> {
  if (isDemoMode) {
    return getDemoShifts({ from, to });
  }

  const queryPath = `/shifts?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

  try {
    const data = await fetchFromFileMaker(queryPath);
    if (data && Array.isArray(data.records)) {
      return data.records.map(mapFileMakerRecordToShift);
    }
    return [];
  } catch (error) {
    if (isConfigError(error)) {
      throw error;
    }
    console.warn('FileMaker call failed. Falling back to demo shifts.', error);
    return getDemoShifts({ from, to });
  }
}
