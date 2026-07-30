"use client";

import { Target } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

export default function OfferTargeting({
  formData,
  handleChange,
}) {
  return (
    <Card
      title="Targeting"
      subtitle="Control who can access this offer."
      icon={Target}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Input
          label="Country"
          placeholder="India"
          value={formData.geo}
          onChange={(e) =>
            handleChange("geo", e.target.value)
          }
        />

        <Input
          label="Operating System"
          placeholder="Android, iOS"
          value={formData.os}
          onChange={(e) =>
            handleChange("os", e.target.value)
          }
        />

        <Input
          label="Browser"
          placeholder="Chrome"
          value={formData.browser}
          onChange={(e) =>
            handleChange("browser", e.target.value)
          }
        />

        <Input
          label="Device"
          placeholder="Mobile"
          value={formData.device}
          onChange={(e) =>
            handleChange("device", e.target.value)
          }
        />

        <Input
          label="ISP"
          placeholder="Airtel"
          value={formData.isp}
          onChange={(e) =>
            handleChange("isp", e.target.value)
          }
        />

        <Input
          label="Assigned Affiliate"
          placeholder="Ownadz Digital Agency"
          value={formData.assignedAffiliate}
          onChange={(e) =>
            handleChange(
              "assignedAffiliate",
              e.target.value
            )
          }
        />
      </div>
    </Card>
  );
}
