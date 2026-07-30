"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

export default function SearchSelect({
  label,
  placeholder = "Search...",
  value,
  options = [],
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-2" ref={ref}>
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-14 w-full items-center justify-between rounded-2xl border border-slate-700 bg-[#0B1220] px-5 text-white transition hover:border-blue-500"
        >
          <span className={value ? "" : "text-slate-500"}>
            {value || placeholder}
          </span>

          <ChevronDown size={18} />
        </button>

        {open && (
          <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-700 bg-[#111827] shadow-2xl">
            <div className="border-b border-slate-700 p-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-slate-500"
                  size={18}
                />

                <input
                  autoFocus
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) =>
                    setQuery(e.target.value)
                  }
                  className="h-11 w-full rounded-xl bg-[#0B1220] pl-10 pr-4 text-white outline-none"
                />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto">
              {filtered.length === 0 && (
                <div className="p-4 text-center text-slate-500">
                  No results found
                </div>
              )}

              {filtered.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-white transition hover:bg-slate-800"
                >
                  {item}

                  {value === item && (
                    <Check
                      size={18}
                      className="text-blue-400"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
