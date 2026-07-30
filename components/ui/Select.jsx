"use client";

export default function Select({
  label,
  value,
  onChange,
  options = [],
  className = "",
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl border border-slate-700 bg-[#0B1220] px-4 py-3 text-white outline-none transition focus:border-blue-500 ${className}`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-[#0B1220]"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
