"use client";

import { DollarSign } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function OfferPayout({
  formData,
  handleChange,
}) {
  const advertiser = Number(formData.advertiserPayout || 0);
  const affiliate = Number(formData.affiliatePayout || 0);
  const profit = advertiser - affiliate;

  return (
    <Card
      title="Payout Configuration"
      subtitle="Configure advertiser and affiliate payouts."
      icon={DollarSign}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Input
          label="Advertiser Payout (₹)"
          type="number"
          min="0"
          step="0.01"
          placeholder="100.00"
          value={formData.advertiserPayout}
          onChange={(e) =>
            handleChange(
              "advertiserPayout",
              e.target.value
            )
          }
        />

        <Input
          label="Affiliate Payout (₹)"
          type="number"
          min="0"
          step="0.01"
          placeholder="80.00"
          value={formData.affiliatePayout}
          onChange={(e) =>
            handleChange(
              "affiliatePayout",
              e.target.value
            )
          }
        />
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
        <div className="text-sm text-slate-400">
          Estimated Profit
        </div>

        <div className="mt-1 text-3xl font-bold text-emerald-400">
          ₹{profit.toFixed(2)}
        </div>
      </div>
    </Card>
  );
}
