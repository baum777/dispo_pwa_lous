export default function TextField({
  label,
  name,
  required,
  value,
  onChange,
  placeholder,
  type = 'text'
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none"
      />
    </label>
  );
}
