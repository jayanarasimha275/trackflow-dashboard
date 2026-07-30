"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import OfferTable from "@/components/offers/OfferTable";
import { getOffers } from "@/services/offerService";

export default function OffersPage() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {
    try {
      const data = await getOffers();
      setOffers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Offers
          </h1>

          <p className="mt-2 text-slate-400">
            Create and manage advertiser offers.
          </p>
        </div>

        <Link
          href="/offers/create"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          + Create Offer
        </Link>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-800 bg-[#111827] py-20 text-center text-slate-400">
          Loading offers...
        </div>
      ) : (
        <OfferTable offers={offers} />
      )}
    </div>
  );
}
