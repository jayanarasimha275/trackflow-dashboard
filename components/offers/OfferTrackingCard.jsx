"use client";

import { Copy, ExternalLink } from "lucide-react";

export default function OfferTrackingCard({ offer }) {
  async function copy(text) {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  }

  const links = [
    {
      label: "Preview URL",
      value: offer.previewUrl,
    },
    {
      label: "Tracking URL",
      value: offer.trackingUrl,
    },
    {
      label: "Fallback URL",
      value: offer.fallbackUrl,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Tracking Links
      </h2>

      <div className="space-y-5">
        {links.map((link) => (
          <div key={link.label}>
            <p className="mb-2 text-sm text-slate-400">
              {link.label}
            </p>

            <div className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 p-3">
              <input
                readOnly
                value={link.value || ""}
                className="flex-1 bg-transparent text-sm text-white outline-none"
              />

              {link.value && (
                <>
                  <button
                    onClick={() => copy(link.value)}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Copy size={18} />
                  </button>

                  <a
                    href={link.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <ExternalLink size={18} />
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
