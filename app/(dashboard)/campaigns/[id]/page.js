"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Pencil,
  ExternalLink,
  MousePointerClick,
  Users,
  Target,
  IndianRupee,
  Activity,
  Copy,
} from "lucide-react";

import styles from "./page.module.css";
import { useCampaigns } from "@/context/CampaignContext";

export default function CampaignDetailsPage() {
  const params = useParams();

  const campaignId = params?.id;
  const { campaigns, loaded } = useCampaigns();

  const campaign = campaigns.find(
    (item) => String(item.id) === String(campaignId)
  );

  return (
    <main className={styles.page}>
      <div className={styles.topbar}>
        <Link href="/campaigns" className={styles.back}>
          <ArrowLeft size={17} />
          Back to Campaigns
        </Link>

        <div className={styles.actions}>
          <Link
            href={`/campaigns/${campaignId}/analytics`}
            className={styles.secondaryButton}
          >
            Analytics
          </Link>

          <Link
            href={`/campaigns/${campaignId}/clicks`}
            className={styles.secondaryButton}
          >
            Clicks
          </Link>

          <Link
            href={`/campaigns/${campaignId}/conversions`}
            className={styles.secondaryButton}
          >
            Conversions
          </Link>

          <Link
            href={`/campaigns/${campaignId}/edit`}
            className={styles.editButton}
          >
            <Pencil size={16} />
            Edit Campaign
          </Link>
        </div>
      </div>

      <section className={styles.hero}>
        <div>
          <div className={styles.breadcrumb}>
            Campaigns / Details
          </div>

          <div className={styles.titleRow}>
            <div className={styles.campaignIcon}>
              <Activity size={24} />
            </div>

            <div>
              <h1>{campaign?.name || "Campaign Details"}</h1>

              <p>
                Campaign ID:{" "}
                <span>{campaign?.id || campaignId || "—"}</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.status}>
          <span />
          {campaign?.status || "ACTIVE"}
        </div>
      </section>

      <section className={styles.stats}>
        <StatCard
          icon={<MousePointerClick size={19} />}
          label="Total Clicks"
          value={campaign?.clicks ?? 0}
        />

        <StatCard
          icon={<Users size={19} />}
          label="Unique Visitors"
          value={campaign?.uniqueVisitors ?? 0}
        />

        <StatCard
          icon={<Target size={19} />}
          label="Conversions"
          value={campaign?.conversions ?? 0}
        />

        <StatCard
          icon={<IndianRupee size={19} />}
          label="Revenue"
          value={`₹${Number(campaign?.revenue ?? 0).toFixed(2)}`}
        />
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Campaign Information</h2>
              <p>Basic campaign configuration.</p>
            </div>

            <Activity size={19} />
          </div>

          <div className={styles.details}>
            <Detail
              label="Campaign Name"
              value={campaign?.name || "—"}
            />

            <Detail
              label="Status"
              value={campaign?.status || "—"}
              badge
            />

            <Detail
              label="Traffic Source"
              value={campaign?.trafficSource || "Not configured"}
            />

            <Detail
              label="Tracking Domain"
              value={campaign?.trackingDomain || "Default domain"}
            />

            <Detail
              label="Daily Cap"
              value={
                Number(campaign?.dailyCap ?? 0) === 0
                  ? "Unlimited"
                  : campaign.dailyCap.toLocaleString()
              }
            />

            <Detail
              label="Total Cap"
              value={
                Number(campaign?.totalCap ?? 0) === 0
                  ? "Unlimited"
                  : campaign.totalCap.toLocaleString()
              }
            />
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Offer</h2>
              <p>Offer assigned to this campaign.</p>
            </div>
          </div>

          <div className={styles.offerBox}>
            <div className={styles.offerIcon}>
              <Target size={20} />
            </div>

            <div>
              <strong>{campaign?.offer?.offerName || "Assigned Offer"}</strong>
              <span>
                {campaign?.offer?.affiliate || "Offer not loaded"}
              </span>
            </div>
          </div>

          <div className={styles.infoRow}>
            <span>Advertiser</span>
            <strong>{campaign?.offer?.advertiser || "—"}</strong>
          </div>

          <div className={styles.infoRow}>
            <span>Affiliate Payout</span>
            <strong>
              ₹{Number(campaign?.offer?.affiliatePayout ?? 0).toFixed(2)}
            </strong>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Publisher</h2>
              <p>Publisher assigned to this campaign.</p>
            </div>
          </div>

          <div className={styles.publisherBox}>
            <div className={styles.avatar}>
              {campaign?.publisher?.firstName?.charAt(0) || "P"}
            </div>

            <div>
              <strong>
                {campaign?.publisher
                  ? `${campaign.publisher.firstName} ${campaign.publisher.lastName}`
                  : "Assigned Publisher"}
              </strong>

              <span>
                {campaign?.publisher?.companyName ||
                  campaign?.publisher?.email ||
                  "Publisher not loaded"}
              </span>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Tracking</h2>
              <p>Use this URL to track campaign traffic.</p>
            </div>
          </div>

          <div className={styles.trackingBox}>
            <label>Tracking Code</label>

            <div className={styles.codeRow}>
              <code>
                {campaign?.trackingCode || "campaign-code"}
              </code>

              <button
                type="button"
                title="Copy tracking code"
                onClick={() =>
                  navigator.clipboard?.writeText(
                    campaign?.trackingCode || ""
                  )
                }
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className={styles.trackingBox}>
            <label>Tracking URL</label>

            <div className={styles.urlRow}>
              <code>
                /api/campaigns/track/
                {campaign?.trackingCode || "campaign-code"}
              </code>

              <button
                type="button"
                title="Open tracking URL"
                onClick={() =>
                  window.open(
                    `/api/campaigns/track/${
                      campaign?.trackingCode || ""
                    }`,
                    "_blank"
                  )
                }
              >
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Performance</h2>
            <p>Campaign performance overview.</p>
          </div>
        </div>

        <div className={styles.performance}>
          <div>
            <span>Click-through Rate</span>
            <strong>
              {campaign?.clicks > 0
                ? "100.00%"
                : "0.00%"}
            </strong>
          </div>

          <div>
            <span>Conversion Rate</span>
            <strong>
              {campaign?.clicks > 0
                ? `${(
                    (Number(campaign?.conversions ?? 0) /
                      Number(campaign.clicks)) *
                    100
                  ).toFixed(2)}%`
                : "0.00%"}
            </strong>
          </div>

          <div>
            <span>Earnings Per Click</span>
            <strong>
              ₹
              {campaign?.clicks > 0
                ? (
                    Number(campaign?.revenue ?? 0) /
                    Number(campaign.clicks)
                  ).toFixed(2)
                : "0.00"}
            </strong>
          </div>

          <div>
            <span>Publisher Payout</span>
            <strong>
              ₹{Number(campaign?.payout ?? 0).toFixed(2)}
            </strong>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Detail({ label, value, badge = false }) {
  return (
    <div className={styles.detail}>
      <span>{label}</span>

      {badge ? (
        <span className={styles.smallStatus}>
          <i />
          {value}
        </span>
      ) : (
        <strong>{value}</strong>
      )}
    </div>
  );
}
