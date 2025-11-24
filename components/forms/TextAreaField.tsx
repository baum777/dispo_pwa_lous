export default function TextAreaField({
  label,
  name,
  required,
  value,
  onChange,
  placeholder,
  maxLength
}: {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>{label}</span>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm focus:border-slate-500 focus:outline-none"
        rows={5}
      />
      {maxLength ? (
        <span className="mt-1 block text-xs text-slate-500">
          {value.length}/{maxLength} Zeichen
        </span>
      ) : null}
    </label>
  );
}
