'use client';

import Link from 'next/link';
import clsx from 'clsx';

export type TabNavItem = {
  label: string;
  href: string;
};

export default function TabNav({ items, activePath }: { items: TabNavItem[]; activePath: string }) {
  return (
    <nav className="border-t border-slate-200 bg-white/90 px-2 pb-2 sm:px-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 pt-2 text-sm font-medium sm:gap-4">
        {items.map((item) => {
          const isActive = activePath === item.href || activePath.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex-1 rounded-md px-3 py-2 text-center transition-colors sm:flex-none sm:px-4 sm:py-2.5',
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
