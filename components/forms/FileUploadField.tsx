const MAX_SIZE = 128 * 1024 * 1024;

export default function FileUploadField({
  label,
  name,
  file,
  onChange
}: {
  label: string;
  name: string;
  file?: File;
  onChange: (file?: File) => void;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span>{label}</span>
      <input
        type="file"
        name={name}
        accept="image/*,video/*"
        className="mt-1 block w-full text-sm text-slate-600"
        onChange={(e) => {
          const selected = e.target.files?.[0];
          if (selected && selected.size > MAX_SIZE) {
            alert('Datei ist größer als 128 MB. Bitte wähle eine kleinere Datei.');
            e.target.value = '';
            return;
          }
          onChange(selected ?? undefined);
        }}
      />
      <span className="mt-1 block text-xs text-slate-500">Bis zu 128 MB, Bilder oder Videos.</span>
      {file ? <span className="mt-1 block text-xs text-slate-500">Ausgewählt: {file.name}</span> : null}
    </label>
  );
}
