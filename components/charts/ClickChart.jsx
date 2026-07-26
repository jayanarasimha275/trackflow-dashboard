"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        padding: "10px 12px",
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: "10px",
      }}
    >
      <p
        style={{
          margin: "0 0 5px",
          color: "#94a3b8",
          fontSize: "11px",
        }}
      >
        {label}
      </p>

      <strong
        style={{
          color: "#f8fafc",
          fontSize: "13px",
        }}
      >
        {Number(payload[0]?.value || 0).toLocaleString()} clicks
      </strong>
    </div>
  );
}
function createChartData(period, clicks) {
  const days = period === "7days" ? 7 : period === "30days" ? 30 : 90;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const grouped = {};

  // Create every day first
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const key = date.toISOString().split("T")[0];

    grouped[key] = {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      clicks: 0,
    };
  }

  // Count clicks
  clicks.forEach((click) => {
    const date = new Date(click.clickedAt);
    date.setHours(0, 0, 0, 0);

    const key = date.toISOString().split("T")[0];

    if (grouped[key]) {
      grouped[key].clicks++;
    }
  });

  return Object.values(grouped);
}

export default function ClickChart({ period = "7days", clicks = [] }) {
  console.log("Current period:", period);
  const chartData = createChartData(period, clicks);

  return (
    <div
      style={{
        width: "100%",
        height: "290px",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 25,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id="dashboardClickGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />

              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94a3b8",
              fontSize: 10,
            }}
            dy={10}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "#94a3b8",
              fontSize: 10,
            }}
            tickFormatter={(value) => {
              if (value >= 1000) {
                return `${(value / 1000).toFixed(1)}k`;
              }

              return value;
            }}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#475569",
              strokeDasharray: "4 4",
            }}
          />

          <Area
            type="monotone"
            dataKey="clicks"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#dashboardClickGradient)"
            activeDot={{
              r: 5,
              strokeWidth: 3,
              stroke: "#0f172a",
              fill: "#3b82f6",
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
