"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import OfferSummaryCards from "@/components/offers/OfferSummaryCards";
import OfferTrackingCard from "@/components/offers/OfferTrackingCard";
import OfferTargetingCard from "@/components/offers/OfferTargetingCard";

import OfferScheduleCard from "@/components/offers/OfferScheduleCard";
import { getOffer } from "@/services/offerService";

export default function OfferDetailsPage() {
  const { id } = useParams();

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffer() {
      try {
        const data = await getOffer(id);
        setOffer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadOffer();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-24 text-center text-slate-400">
        Loading offer...
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-white">
          Offer not found
        </h2>

        <Link
          href="/offers"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Back to Offers
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {offer.offerName}
          </h1>

          <p className="mt-2 text-slate-400">
            Advertiser: {offer.advertiser}
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            offer.status === "ACTIVE"
              ? "bg-emerald-500/20 text-emerald-400"
              : offer.status === "PAUSED"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          {offer.status}
        </span>
      </div>

      <OfferSummaryCards offer={offer} />

<div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Offer Details
          </h3>

          <div className="space-y-3 text-slate-300">
            <p>
              <strong>Status:</strong> {offer.status}
            </p>

            <p>
              <strong>Affiliate:</strong>{" "}
              {offer.affiliate || "-"}
            </p>

            <p>
              <strong>Visibility:</strong>{" "}
              {offer.visibility}
            </p>

            <p>
              <strong>Timezone:</strong>{" "}
              {offer.timezone}
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">
            Payout
          </h3>

          <div className="space-y-3 text-slate-300">
            <p>
              <strong>Advertiser:</strong> ₹
              {offer.advertiserPayout}
            </p>

            <p>
              <strong>Affiliate:</strong> ₹
              {offer.affiliatePayout}
            </p>

            <p>
              <strong>Profit:</strong> ₹
              {(
                offer.advertiserPayout -
                offer.affiliatePayout
              ).toFixed(2)}
            </p>
          </div>
        </div>
        <OfferTrackingCard offer={offer} />
        <OfferTargetingCard offer={offer} />
        <OfferScheduleCard offer={offer} />
      </div>
    </div>
  );
}
