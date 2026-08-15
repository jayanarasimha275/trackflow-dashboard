"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  BarChart3,
  MousePointerClick,
  Users,
  Target,
  IndianRupee,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

import styles from "./page.module.css";
import { useCampaigns } from "@/context/CampaignContext";

export default function CampaignAnalyticsPage() {
  const params = useParams();

  const campaignId = params?.id;

  const { campaigns, loaded } = useCampaigns();

  const campaign = campaigns.find(
    (item) => String(item.id) === String(campaignId)
  );

  return (
    <main className={styles.page}>
      <div className={styles.topbar}>
        <Link
          href={`/campaigns/${campaignId}`}
          className={styles.back}
        >
          <ArrowLeft size={17} />
          Back to Campaign
        </Link>

        <div className={styles.dateRange}>
          <CalendarDays size={16} />
          Last 30 days
        </div>
      </div>

      <header className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.icon}>
            <BarChart3 size={24} />
          </div>

          <div>
            <div className={styles.breadcrumb}>
              Campaigns / Analytics
            </div>

            <h1>Campaign Analytics</h1>

            <p>
              Performance insights for campaign{" "}
              <code>{campaignId || "—"}</code>
            </p>
          </div>
        </div>
      </header>

      <section className={styles.stats}>
        <StatCard
          icon={<MousePointerClick size={19} />}
          label="Clicks"
          value={campaign?.clicks ?? 0}
          change={campaign?.clicks > 0 ? "Tracking active" : "No data yet"}
        />

        <StatCard
          icon={<Users size={19} />}
          label="Unique Visitors"
          value={campaign?.uniqueVisitors ?? 0}
          change={
            campaign?.uniqueVisitors > 0
              ? "Visitors recorded"
              : "No data yet"
          }
        />

        <StatCard
          icon={<Target size={19} />}
          label="Conversions"
          value={campaign?.conversions ?? 0}
          change={
            campaign?.conversions > 0
              ? "Conversions recorded"
              : "No data yet"
          }
        />

        <StatCard
          icon={<IndianRupee size={19} />}
          label="Revenue"
          value={`₹${Number(campaign?.revenue ?? 0).toFixed(2)}`}
          change={
            Number(campaign?.revenue ?? 0) > 0
              ? "Revenue generated"
              : "No data yet"
          }
        />
      </section>

      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Click Performance</h2>
              <p>Clicks generated over time.</p>
            </div>

            <TrendingUp size={19} />
          </div>

          <div className={styles.chartArea}>
            <div className={styles.chartEmpty}>
              <BarChart3 size={30} />

              <strong>
                {campaign?.clicks > 0
                  ? `${campaign.clicks} clicks recorded`
                  : "No click data yet"}
              </strong>

              <span>
                {campaign?.clicks > 0
                  ? "Campaign traffic has been recorded."
                  : "Campaign traffic will appear here once visitors start using the tracking link."}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Conversions</h2>
              <p>Conversion activity for this campaign.</p>
            </div>

            <Target size={19} />
          </div>

          <div className={styles.chartArea}>
            <div className={styles.chartEmpty}>
              <Target size={30} />

              <strong>
                {campaign?.conversions > 0
                  ? `${campaign.conversions} conversions recorded`
                  : "No conversions yet"}
              </strong>

              <span>
                {campaign?.conversions > 0
                  ? "Conversion activity has been recorded for this campaign."
                  : "Conversion statistics will appear after the first conversion."}
              </span>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Traffic Breakdown</h2>
            <p>Understand where campaign traffic comes from.</p>
          </div>
        </div>

        <div className={styles.breakdown}>
          <Breakdown
            label="Desktop"
            value="—"
            percentage="0%"
          />

          <Breakdown
            label="Mobile"
            value="—"
            percentage="0%"
          />

          <Breakdown
            label="Tablet"
            value="—"
            percentage="0%"
          />
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Campaign Metrics</h2>
            <p>Key performance indicators.</p>
          </div>
        </div>

        <div className={styles.metrics}>
          <Metric
            label="Conversion Rate"
            value={
              campaign?.clicks > 0
                ? `${(
                    (Number(campaign?.conversions ?? 0) /
                      Number(campaign.clicks)) *
                    100
                  ).toFixed(2)}%`
                : "0.00%"
            }
          />

          <Metric
            label="Click Through Rate"
            value="N/A"
          />

          <Metric
            label="Earnings Per Click"
            value={
              campaign?.clicks > 0
                ? `₹${(
                    Number(campaign?.revenue ?? 0) /
                    Number(campaign.clicks)
                  ).toFixed(2)}`
                : "₹0.00"
            }
          />

          <Metric
            label="Revenue Per Visitor"
            value={
              campaign?.uniqueVisitors > 0
                ? `₹${(
                    Number(campaign?.revenue ?? 0) /
                    Number(campaign.uniqueVisitors)
                  ).toFixed(2)}`
                : "₹0.00"
            }
          />
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, label, value, change }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>

      <div className={styles.statContent}>
        <span>{label}</span>

        <strong>{value}</strong>

        <small>{change}</small>
      </div>
    </div>
  );
}

function Breakdown({ label, value, percentage }) {
  return (
    <div className={styles.breakdownItem}>
      <div className={styles.breakdownTop}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

      <div className={styles.progress}>
        <div
          className={styles.progressValue}
          style={{ width: percentage }}
        />
      </div>

      <small>{percentage} of traffic</small>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className={styles.metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
