export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
}) {
  const colors = {
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: "text-blue-400",
      value: "text-blue-400",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      icon: "text-emerald-400",
      value: "text-emerald-400",
    },
    orange: {
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
      icon: "text-orange-400",
      value: "text-orange-400",
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
      icon: "text-purple-400",
      value: "text-purple-400",
    },
  };

  const theme = colors[color];

  return (
    <div
      className={`rounded-3xl border ${theme.border} ${theme.bg} p-6`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400">
            {title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${theme.value}`}>
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div className="rounded-2xl bg-slate-900 p-4">
            <Icon
              size={28}
              className={theme.icon}
            />
          </div>
        )}
      </div>
    </div>
  );
}
