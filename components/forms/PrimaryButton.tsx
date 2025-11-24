export default function PrimaryButton({ children, type = 'button', disabled }: { children: React.ReactNode; type?: 'button' | 'submit'; disabled?: boolean }) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
