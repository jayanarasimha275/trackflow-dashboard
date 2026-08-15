"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Target,
  Download,
  Search,
  CalendarDays,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import styles from "./page.module.css";
import { useCampaigns } from "@/context/CampaignContext";

export default function CampaignConversionsPage() {
  const params = useParams();

  const campaignId = params?.id;

  const { campaigns, loaded } = useCampaigns();

  const campaign = campaigns.find(
    (item) => String(item.id) === String(campaignId)
  );
  const [search, setSearch] = useState("");
  const [conversions, setConversions] = useState([]);

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
            <Target size={24} />
          </div>

          <div>
            <div className={styles.breadcrumb}>
              Campaigns / Conversions
            </div>

            <h1>Conversions</h1>

            <p>
              Conversion activity for campaign{" "}
              <code>{campaignId || "—"}</code>
            </p>
          </div>
        </div>
      </header>

      <section className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Target size={19} />
          </div>

          <div>
            <span>Total Conversions</span>
            <strong>{campaign?.conversions ?? 0}</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Approved</span>
            <strong>0</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending</span>
            <strong>0</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <XCircle size={19} />
          </div>

          <div>
            <span>Rejected</span>
            <strong>0</strong>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={17} />

            <input
              type="text"
              placeholder="Search conversions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className={styles.dateFilter}>
            <CalendarDays size={16} />
            Last 30 days
          </div>
        </div>

        {conversions.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <Target size={30} />
            </div>

            <h2>No conversions yet</h2>

            <p>
              Conversions will appear here when visitors complete
              the campaign action.
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Conversion ID</th>
                  <th>Click ID</th>
                  <th>Status</th>
                  <th>Revenue</th>
                  <th>Payout</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {conversions
                  .filter((conversion) => {
                    const query = search.toLowerCase();

                    return (
                      conversion.id?.toLowerCase().includes(query) ||
                      conversion.clickId?.toLowerCase().includes(query) ||
                      conversion.status?.toLowerCase().includes(query)
                    );
                  })
                  .map((conversion) => (
                    <tr key={conversion.id}>
                      <td>
                        <code>{conversion.id}</code>
                      </td>

                      <td>
                        <code>{conversion.clickId || "—"}</code>
                      </td>

                      <td>{conversion.status || "Approved"}</td>

                      <td>
                        ₹{Number(conversion.revenue || 0).toFixed(2)}
                      </td>

                      <td>
                        ₹{Number(conversion.payout || 0).toFixed(2)}
                      </td>

                      <td>
                        {conversion.createdAt
                          ? new Date(
                              conversion.createdAt
                            ).toLocaleString()
                          : "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
