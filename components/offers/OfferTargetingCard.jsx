"use client";

export default function OfferTargetingCard({ offer }) {
  const rows = [
    {
      label: "Geo",
      value: offer.geo || "All Countries",
    },
    {
      label: "Operating System",
      value: offer.os || "All",
    },
    {
      label: "Browser",
      value: offer.browser || "All",
    },
    {
      label: "Device",
      value: offer.device || "All",
    },
    {
      label: "ISP",
      value: offer.isp || "All",
    },
    {
      label: "Assigned Affiliate",
      value: offer.assignedAffiliate || "Open to Everyone",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Targeting & Restrictions
      </h2>

      <div className="space-y-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-none last:pb-0"
          >
            <span className="text-sm text-slate-400">
              {row.label}
            </span>

            <span className="text-right font-medium text-white">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
