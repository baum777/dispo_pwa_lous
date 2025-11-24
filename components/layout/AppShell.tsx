'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import TabNav from './TabNav';

const navItems = [
  { label: 'Schichten', href: '/shifts' },
  { label: 'Reparatur', href: '/repair' },
  { label: 'Feedback', href: '/feedback' }
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/shifts" className="text-lg font-semibold text-slate-900">
            Lou&apos;s Team PWA
          </Link>
          <div className="hidden text-sm text-slate-500 sm:block">Alle Tools für das Team.</div>
        </div>
        <TabNav items={navItems} activePath={pathname} />
      </header>
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-6">{children}</div>
    </div>
  );
}
