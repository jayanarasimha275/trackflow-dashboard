"use client";

import { CalendarDays } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Paused", value: "PAUSED" },
  { label: "Draft", value: "DRAFT" },
];

const timezoneOptions = [
  { label: "UTC", value: "UTC" },
  { label: "Asia/Kolkata (IST)", value: "Asia/Kolkata" },
  { label: "America/New_York (EST)", value: "America/New_York" },
  { label: "Europe/London (GMT)", value: "Europe/London" },
];

export default function OfferSchedule({
  formData,
  handleChange,
}) {
  return (
    <Card
      title="Schedule"
      subtitle="Configure when this offer should run."
      icon={CalendarDays}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Input
          label="Start Date"
          type="datetime-local"
          value={formData.startDate}
          onChange={(e) =>
            handleChange("startDate", e.target.value)
          }
        />

        <Input
          label="End Date"
          type="datetime-local"
          value={formData.endDate}
          onChange={(e) =>
            handleChange("endDate", e.target.value)
          }
        />

        <Select
          label="Status"
          value={formData.status}
          options={statusOptions}
          onChange={(e) =>
            handleChange("status", e.target.value)
          }
        />

        <Select
          label="Timezone"
          value={formData.timezone}
          options={timezoneOptions}
          onChange={(e) =>
            handleChange("timezone", e.target.value)
          }
        />
      </div>
    </Card>
  );
}
