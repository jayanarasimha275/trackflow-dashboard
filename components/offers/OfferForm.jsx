"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DollarSign,
  CheckCircle2,
  FileText,
} from "lucide-react";

import OfferBasic from "./OfferBasic";
import OfferPayout from "./OfferPayout";
import OfferLinks from "./OfferLinks";
import OfferSchedule from "./OfferSchedule";
import OfferTargeting from "./OfferTargeting";
import OfferCapping from "./OfferCapping";
import OfferButtons from "./OfferButtons";
import {
  createOffer,
  updateOffer,
} from "@/services/offerService";

import StatCard from "@/components/ui/StatCard";

const initialForm = {
  offerName: "",
  advertiser: "",
  affiliate: "",

  advertiserPayout: "",
  affiliatePayout: "",

  previewUrl: "",
  trackingUrl: "",

  visibility: "Public",

  startDate: "",
  endDate: "",

  geo: "",

  os: "",
  browser: "",
  device: "",
  isp: "",

  assignedAffiliate: "",

  capType: "Daily",
  capValue: "",
  status: "DRAFT",
  timezone: "Asia/Kolkata",
  fallbackUrl: "",
};

export default function OfferForm({
  mode = "create",
  initialData = null,
}) {
  const [formData, setFormData] = useState(initialForm);
  useEffect(() => {
    if (!initialData) return;

    setFormData((prev) => ({
      ...prev,
      ...initialData,
    }));
  }, [initialData]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (mode === "edit") {
        await updateOffer(initialData.id, formData);
      } else {
        await createOffer(formData);
      }

      router.push("/offers");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create offer.");
    } finally {
      setLoading(false);
    }
  };

  const profit =
    Number(formData.advertiserPayout || 0) -
    Number(formData.affiliatePayout || 0);

  const checklist = [
    ["Offer Name", !!formData.offerName],
    ["Advertiser", !!formData.advertiser],
    ["Affiliate", !!formData.affiliate],
    ["Tracking Link", !!formData.trackingUrl],
    [
      "Payout",
      !!(
        formData.advertiserPayout &&
        formData.affiliatePayout
      ),
    ],
  ];
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-12 gap-8">
      {/* Left Content */}

      <div className="col-span-12 xl:col-span-8 space-y-8">
        <OfferBasic
          formData={formData}
          handleChange={handleChange}
        />

        <OfferPayout
          formData={formData}
          handleChange={handleChange}
        />

        <OfferLinks
          formData={formData}
          handleChange={handleChange}
        />

        <OfferSchedule
          formData={formData}
          handleChange={handleChange}
        />

        <OfferTargeting
          formData={formData}
          handleChange={handleChange}
        />

        <OfferCapping
          formData={formData}
          handleChange={handleChange}
        />

        <OfferButtons
          loading={loading}
          onCancel={() => router.push("/offers")}
          onSaveDraft={() => console.log("Save Draft")}
        />
      </div>

      {/* Right Sidebar */}

      <div className="col-span-12 xl:col-span-4">
        <div className="sticky top-8 space-y-6">
          <StatCard
            title="Estimated Profit"
            value={`₹${profit.toFixed(2)}`}
            subtitle="Current estimated earnings"
            icon={DollarSign}
            color="emerald"
          />

          <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <CheckCircle2
                size={22}
                className="text-blue-400"
              />

              <h3 className="text-xl font-bold text-white">
                Offer Checklist
              </h3>
            </div>

            <div className="space-y-4">
              {checklist.map(([label, ok]) => (
                <div
                  key={label}
                  className="flex items-center justify-between"
                >
                  <span className="text-slate-400">
                    {label}
                  </span>

                  <div
                    className={`h-3 w-3 rounded-full ${
                      ok
                        ? "bg-emerald-400"
                        : "bg-slate-600"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-[#111827] p-6 shadow-xl">
            <div className="mb-4 flex items-center gap-3">
              <FileText
                size={20}
                className="text-orange-400"
              />

              <h3 className="text-lg font-bold text-white">
                Tips
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>• Use a descriptive offer name.</li>
              <li>• Verify the tracking URL before publishing.</li>
              <li>• Double-check advertiser and affiliate payouts.</li>
              <li>• Configure targeting before activating the offer.</li>
              <li>• Review capping limits carefully.</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </form>
  );
}
