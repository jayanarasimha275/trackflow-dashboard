"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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

export default function CampaignConversionsPage() {
  const params = useParams();

  const campaignId = params?.id;

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
            <strong>0</strong>
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
            />
          </div>

          <div className={styles.dateFilter}>
            <CalendarDays size={16} />
            Last 30 days
          </div>
        </div>

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
      </section>
    </main>
  );
}
