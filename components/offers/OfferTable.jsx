"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function OfferTable({ offers = [] }) {
  if (offers.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-[#111827] py-16 text-center">
        <h3 className="text-xl font-semibold text-white">
          No Offers Found
        </h3>

        <p className="mt-2 text-slate-400">
          Create your first offer to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-800 bg-[#111827] shadow-xl">
      <table className="w-full">
        <thead className="bg-[#0B1220]">
          <tr className="border-b border-slate-800">
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Offer
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Advertiser
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Affiliate
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Payout
            </th>

            <th className="px-6 py-4 text-center text-sm font-medium text-slate-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {offers.map((offer) => (
            <tr
              key={offer.id}
              className="border-b border-slate-800 transition hover:bg-slate-900"
            >
              <td className="px-6 py-5 font-medium text-white">
                {offer.offerName}
              </td>

              <td className="px-6 py-5 text-slate-300">
                {offer.advertiser}
              </td>

              <td className="px-6 py-5 text-slate-300">
                {offer.affiliate || "-"}
              </td>

              <td className="px-6 py-5">
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                  {offer.status}
                </span>
              </td>

              <td className="px-6 py-5 text-slate-300">
                ₹{offer.advertiserPayout}
              </td>

              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  <Link
                    href={`/offers/${offer.id}`}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/offers/edit/${offer.id}`}
                    className="rounded-lg p-2 text-blue-400 transition hover:bg-slate-800"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button className="rounded-lg p-2 text-red-400 transition hover:bg-slate-800">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
