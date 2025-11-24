export default function PageHeader({
  title,
  description
}: {
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h1>
      {description ? <div className="text-sm text-slate-600 sm:text-base">{description}</div> : null}
    </div>
  );
}
