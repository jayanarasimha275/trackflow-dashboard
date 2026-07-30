"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import OfferForm from "@/components/offers/OfferForm";
import { getOffer } from "@/services/offerService";

export default function EditOfferPage() {
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
      <div className="py-24 text-center text-red-400">
        Offer not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Edit Offer
        </h1>

        <p className="mt-2 text-slate-400">
          Update your offer configuration.
        </p>
      </div>

      <OfferForm
        mode="edit"
        initialData={offer}
      />
    </div>
  );
}
