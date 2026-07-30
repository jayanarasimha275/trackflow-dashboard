"use client";

import { GaugeCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

const capTypes = [
  { label: "Daily", value: "Daily" },
  { label: "Monthly", value: "Monthly" },
  { label: "Lifetime", value: "Lifetime" },
];

export default function OfferCapping({
  formData,
  handleChange,
}) {
  return (
    <Card
      title="Offer Capping"
      subtitle="Limit the number of conversions allowed."
      icon={GaugeCircle}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Select
          label="Cap Type"
          value={formData.capType}
          options={capTypes}
          onChange={(e) =>
            handleChange("capType", e.target.value)
          }
        />

        <Input
          label="Cap Value"
          type="number"
          min="0"
          placeholder="1000"
          value={formData.capValue}
          onChange={(e) =>
            handleChange("capValue", e.target.value)
          }
        />
      </div>
    </Card>
  );
}
