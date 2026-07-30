"use client";

import {
  DollarSign,
  Globe,
  Users,
  BarChart3,
} from "lucide-react";

export default function OfferSummaryCards({ offer }) {
  const profit =
    (offer.advertiserPayout || 0) -
    (offer.affiliatePayout || 0);

  const cards = [
    {
      title: "Advertiser Payout",
      value: `₹${offer.advertiserPayout ?? 0}`,
      icon: DollarSign,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Affiliate Payout",
      value: `₹${offer.affiliatePayout ?? 0}`,
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Profit",
      value: `₹${profit}`,
      icon: BarChart3,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Visibility",
      value: offer.visibility || "Public",
      icon: Globe,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-800 bg-[#111827] p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-white">
                  {card.value}
                </h3>
              </div>

              <div
                className={`rounded-xl p-3 ${card.bg}`}
              >
                <Icon
                  className={card.color}
                  size={22}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
