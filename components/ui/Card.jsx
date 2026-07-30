export default function Card({
  title,
  subtitle,
  icon: Icon,
  children,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#111827] shadow-xl">
      <div className="border-b border-slate-800 bg-slate-900/50 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-blue-600/20 p-3">
            {Icon && (
              <Icon
                className="text-blue-400"
                size={24}
              />
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="p-8">{children}</div>
    </div>
  );
}
