const truthyDemoFlags = new Set(['1', 'true', 'on', 'yes']);

export const isDemoMode =
  truthyDemoFlags.has((process.env.NEXT_PUBLIC_DEMO_MODE ?? '').toLowerCase()) ||
  false;

type FmBaseUrlOptions = {
  required?: boolean;
  fallback?: string;
};

export function getFmBaseUrl(options?: FmBaseUrlOptions) {
  const value = process.env.FM_BASE_URL;
  if (value) {
    return value;
  }

  const shouldThrow = options?.required ?? !isDemoMode;
  if (shouldThrow) {
    throw new Error('FM_BASE_URL is not set. Configure it or enable demo mode.');
  }

  return options?.fallback ?? 'https://demo.invalid';
}

type FileMakerCredentials = {
  username: string;
  password: string;
};

export function getFileMakerCredentials(): FileMakerCredentials {
  const username = process.env.FM_USER;
  const password = process.env.FM_PASSWORD;

  if (username && password) {
    return { username, password };
  }

  if (isDemoMode) {
    return {
      username: username ?? 'demo-user',
      password: password ?? 'demo-password'
    };
  }

  throw new Error('FM_USER and FM_PASSWORD must be set unless demo mode is enabled.');
}
