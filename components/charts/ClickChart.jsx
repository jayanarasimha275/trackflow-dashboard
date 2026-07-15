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

function createChartData(period, totalClicks) {
  const total = Number(totalClicks || 0);

  if (period === "30days") {
    const labels = [
      "Day 1",
      "Day 5",
      "Day 10",
      "Day 15",
      "Day 20",
      "Day 25",
      "Day 30",
    ];

    const weights = [
      0.07,
      0.1,
      0.11,
      0.14,
      0.16,
      0.19,
      0.23,
    ];

    return labels.map((date, index) => ({
      date,
      clicks: Math.round(
        total * weights[index]
      ),
    }));
  }

  if (period === "90days") {
    const labels = [
      "Day 1",
      "Day 15",
      "Day 30",
      "Day 45",
      "Day 60",
      "Day 75",
      "Day 90",
    ];

    const weights = [
      0.06,
      0.08,
      0.11,
      0.13,
      0.17,
      0.2,
      0.25,
    ];

    return labels.map((date, index) => ({
      date,
      clicks: Math.round(
        total * weights[index]
      ),
    }));
  }

  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const weights = [
    0.08,
    0.1,
    0.11,
    0.13,
    0.15,
    0.19,
    0.24,
  ];

  return days.map((date, index) => ({
    date,
    clicks: Math.round(
      total * weights[index]
    ),
  }));
}

export default function ClickChart({
  period = "7days",
  totalClicks = 0,
}) {
  const chartData = createChartData(
    period,
    totalClicks
  );

  return (
    <div
      style={{
        width: "100%",
        height: "290px",
      }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
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
              <stop
                offset="5%"
                stopColor="#3b82f6"
                stopOpacity={0.35}
              />

              <stop
                offset="95%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />
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
                return `${(
                  value / 1000
                ).toFixed(1)}k`;
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