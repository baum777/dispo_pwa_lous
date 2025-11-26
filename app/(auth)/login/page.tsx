// app/(auth)/login/page.tsx
export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">Login</h1>
        <p className="text-sm text-slate-600 mb-6">
          TODO: protect route via auth. Dieses Placeholder-Login wird ersetzt, sobald die
          Authentifizierung angebunden ist.
        </p>
        <div className="flex flex-col gap-3">
          <a 
            href="/shifts" 
            className="w-full px-4 py-3 rounded bg-slate-900 text-white text-center hover:bg-slate-800 transition-colors"
          >
            Zur Schichten-Übersicht
          </a>
          <a 
            href="/repair" 
            className="w-full px-4 py-3 rounded border border-slate-300 text-slate-700 text-center hover:bg-slate-50 transition-colors"
          >
            Reparatur melden
          </a>
          <a 
            href="/feedback" 
            className="w-full px-4 py-3 rounded border border-slate-300 text-slate-700 text-center hover:bg-slate-50 transition-colors"
          >
            Feedback geben
          </a>
        </div>
      </div>
    </main>
  );
}
