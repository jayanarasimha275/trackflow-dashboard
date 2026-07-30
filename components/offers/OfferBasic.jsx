import {
  Building2,
  FileText,
  Globe2,
  User2,
} from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import SearchSelect from "@/components/ui/SearchSelect";

const advertisers = [
  "Amazon",
  "Flipkart",
  "Meesho",
  "Spinny",
];

const affiliates = [
  "Ownadz Adz Digital Agency",
  "Affiliate 1",
  "Affiliate 2",
];

export default function OfferBasic({
  formData,
  handleChange,
}) {
  return (
    <Card
      title="Basic Information"
      subtitle="Configure the basic details of your offer."
      icon={FileText}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Input
          label="Offer Name"
          placeholder="Summer Sale 2026"
          value={formData.offerName}
          onChange={(e) =>
            handleChange(
              "offerName",
              e.target.value
            )
          }
        />

        <SearchSelect
          label="Advertiser"
          placeholder="Search advertiser..."
          value={formData.advertiser}
          options={advertisers}
          onChange={(value) =>
            handleChange("advertiser", value)
          }
        />

        <SearchSelect
          label="Affiliate"
          placeholder="Search affiliate..."
          value={formData.affiliate}
          options={affiliates}
          onChange={(value) =>
            handleChange("affiliate", value)
          }
        />

        <div>
          <label className="mb-3 block text-sm font-medium text-slate-300">
            Visibility
          </label>

          <div className="grid grid-cols-2 gap-3">
            {["Public", "Private"].map(
              (visibility) => (
                <button
                  key={visibility}
                  type="button"
                  onClick={() =>
                    handleChange(
                      "visibility",
                      visibility
                    )
                  }
                  className={`h-14 rounded-2xl border transition ${
                    formData.visibility ===
                    visibility
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-slate-700 bg-[#0B1220] text-slate-400 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Globe2 size={18} />
                    {visibility}
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
