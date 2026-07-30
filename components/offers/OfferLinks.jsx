"use client";

import { Link2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function OfferLinks({
  formData,
  handleChange,
}) {
  return (
    <Card
      title="Tracking & Links"
      subtitle="Configure the destination and tracking URLs."
      icon={Link2}
    >
      <div className="space-y-6">
        <Input
          label="Preview URL"
          type="url"
          placeholder="https://advertiser.com"
          value={formData.previewUrl}
          onChange={(e) =>
            handleChange("previewUrl", e.target.value)
          }
        />

        <Input
          label="Tracking URL"
          type="url"
          placeholder="https://track.yourdomain.com/click?offer=123"
          value={formData.trackingUrl}
          onChange={(e) =>
            handleChange("trackingUrl", e.target.value)
          }
        />

        <Input
          label="Fallback URL"
          type="url"
          placeholder="https://yourdomain.com/fallback"
          value={formData.fallbackUrl}
          onChange={(e) =>
            handleChange("fallbackUrl", e.target.value)
          }
        />
      </div>
    </Card>
  );
}
