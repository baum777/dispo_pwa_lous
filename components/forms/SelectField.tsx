export default function SelectField({
  label,
  name,
  required,
  value,
  onChange,
  options
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>{label}</span>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none"
      >
        <option value="" disabled>
          Bitte auswählen
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
