import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Lou's Team PWA",
  description: 'Team PWA for Lou’s Foodtruck'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <body className="min-h-full bg-slate-50 text-slate-900">
        <main>{children}</main>
      </body>
    </html>
  );
}
