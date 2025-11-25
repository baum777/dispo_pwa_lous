// app/page.tsx
export default function IndexPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-2xl font-semibold text-slate-900 mb-4">
        Lou&apos;s Team PWA
    
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="mt-2 text-sm text-slate-600">
          TODO: protect route via auth. Dieses Placeholder-Login wird ersetzt, sobald die
          Authentifizierung angebunden ist.
        </p>
      <div className="flex gap-4">
        <a href="/shifts" className="px-4 py-2 rounded bg-slate-900 text-white">
          Schichten
        </a>
        <a href="/repair" className="px-4 py-2 rounded border border-slate-300">
          Reparatur
        </a>
        <a href="/feedback" className="px-4 py-2 rounded border border-slate-300">
          Feedback
        </a>
      </div>
    </main>
  );
}
