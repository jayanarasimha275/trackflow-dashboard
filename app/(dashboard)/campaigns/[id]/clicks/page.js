"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  MousePointerClick,
  Search,
  CalendarDays,
  Download,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

import styles from "./page.module.css";
import { useCampaigns } from "@/context/CampaignContext";

export default function CampaignClicksPage() {
  const params = useParams();
  const campaignId = params?.id;

  const { campaigns, loaded } = useCampaigns();

  const campaign = campaigns.find(
    (item) => String(item.id) === String(campaignId)
  );
  const [search, setSearch] = useState("");
  const [clicks, setClicks] = useState([]);

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

        <button className={styles.exportButton}>
          <Download size={16} />
          Export
        </button>
      </div>

      <header className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.icon}>
            <MousePointerClick size={24} />
          </div>

          <div>
            <div className={styles.breadcrumb}>
              Campaigns / Clicks
            </div>

            <h1>Campaign Clicks</h1>

            <p>
              Detailed click activity for campaign{" "}
              <code>{campaignId || "—"}</code>
            </p>
          </div>
        </div>
      </header>

      <section className={styles.stats}>
        <StatCard
          icon={<MousePointerClick size={19} />}
          label="Total Clicks"
          value={campaign?.clicks ?? 0}
        />

        <StatCard
          icon={<Monitor size={19} />}
          label="Desktop"
          value={campaign?.desktopClicks ?? 0}
        />

        <StatCard
          icon={<Smartphone size={19} />}
          label="Mobile"
          value={campaign?.mobileClicks ?? 0}
        />

        <StatCard
          icon={<Tablet size={19} />}
          label="Tablet"
          value={campaign?.tabletClicks ?? 0}
        />
      </section>

      <section className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={17} />

            <input
              type="text"
              placeholder="Search clicks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className={styles.dateFilter}>
            <CalendarDays size={16} />
            Last 30 days
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Click ID</th>
                <th>Device</th>
                <th>Browser</th>
                <th>Operating System</th>
                <th>Country</th>
                <th>Referrer</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {clicks.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className={styles.empty}>
                      <div className={styles.emptyIcon}>
                        <MousePointerClick size={29} />
                      </div>

                      <h2>No clicks yet</h2>

                      <p>
                        Click activity will appear here when visitors use
                        this campaign's tracking link.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                clicks
                  .filter((click) => {
                    const query = search.toLowerCase();

                    return (
                      click.id?.toLowerCase().includes(query) ||
                      click.country?.toLowerCase().includes(query) ||
                      click.browser?.toLowerCase().includes(query) ||
                      click.referrer?.toLowerCase().includes(query)
                    );
                  })
                  .map((click) => (
                    <tr key={click.id}>
                      <td>
                        <code>{click.id}</code>
                      </td>

                      <td>{click.deviceType || "—"}</td>

                      <td>{click.browser || "—"}</td>

                      <td>{click.operatingSystem || "—"}</td>

                      <td>{click.country || "—"}</td>

                      <td>{click.referrer || "Direct"}</td>

                      <td>
                        {click.clickedAt
                          ? new Date(click.clickedAt).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
