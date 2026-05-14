export default function EmptyState({ title, description, icon = '📭' }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-16 text-center ring-1 ring-neutral-100">
      <div className="mb-3 text-4xl">{icon}</div>
      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-neutral-500">{description}</p>}
    </div>
  )
}
