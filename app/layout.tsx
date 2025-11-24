import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Lou's Team PWA",
  description: "Team-App für Lou's Foodtruck - Schichten verwalten, Feedback geben und Reparaturen melden",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Lou's Team"
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f172a'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full bg-slate-50 text-slate-900">
        <main>{children}</main>
      </body>
    </html>
  );
}
