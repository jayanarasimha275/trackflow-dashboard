"use client";

import { CalendarDays, Clock3, Gauge } from "lucide-react";

export default function OfferScheduleCard({ offer }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Schedule & Capping
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-blue-400"
            />
            <span className="text-slate-400">
              Start Date
            </span>
          </div>

          <span className="font-medium text-white">
            {offer.startDate
              ? new Date(offer.startDate).toLocaleDateString()
              : "Not Set"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays
              size={18}
              className="text-red-400"
            />
            <span className="text-slate-400">
              End Date
            </span>
          </div>

          <span className="font-medium text-white">
            {offer.endDate
              ? new Date(offer.endDate).toLocaleDateString()
              : "No Expiry"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock3
              size={18}
              className="text-purple-400"
            />
            <span className="text-slate-400">
              Timezone
            </span>
          </div>

          <span className="font-medium text-white">
            {offer.timezone || "UTC"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gauge
              size={18}
              className="text-emerald-400"
            />
            <span className="text-slate-400">
              Cap
            </span>
          </div>

          <span className="font-medium text-white">
            {offer.capValue || "Unlimited"}{" "}
            {offer.capType || ""}
          </span>
        </div>

        <div className="pt-3">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">
              Cap Usage
            </span>

            <span className="text-white">
              0%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
