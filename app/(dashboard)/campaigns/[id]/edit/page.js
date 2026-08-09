"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Settings2,
} from "lucide-react";

import styles from "./page.module.css";

export default function EditCampaignPage() {
  const params = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "Campaign Name",
    status: "ACTIVE",
    trafficSource: "",
    trackingDomain: "",
    dailyCap: 0,
    totalCap: 0,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    // API connection will be added after all frontend pages are complete.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setLoading(false);

    router.push(`/campaigns/${params.id}`);
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Link href={`/campaigns/${params.id}`} className={styles.back}>
          <ArrowLeft size={17} />
          Back to Campaign
        </Link>

        <div className={styles.titleRow}>
          <div className={styles.icon}>
            <Settings2 size={22} />
          </div>

          <div>
            <h1>Edit Campaign</h1>

            <p>
              Update campaign configuration and tracking settings.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Campaign Information</h2>

            <p>
              Configure the basic information for this campaign.
            </p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>
                  Campaign Name <span>*</span>
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Summer Sale Campaign"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="PAUSED">Paused</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Traffic Source</label>

                <input
                  name="trafficSource"
                  value={form.trafficSource}
                  onChange={handleChange}
                  placeholder="Facebook, Google, TikTok..."
                />
              </div>

              <div className={styles.field}>
                <label>Tracking Domain</label>

                <input
                  name="trackingDomain"
                  value={form.trackingDomain}
                  onChange={handleChange}
                  placeholder="track.example.com"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Campaign Caps</h2>

            <p>
              Control how much traffic this campaign can receive.
            </p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Daily Click Cap</label>

                <input
                  type="number"
                  min="0"
                  name="dailyCap"
                  value={form.dailyCap}
                  onChange={handleChange}
                />

                <small>
                  Set to 0 for unlimited daily clicks.
                </small>
              </div>

              <div className={styles.field}>
                <label>Total Click Cap</label>

                <input
                  type="number"
                  min="0"
                  name="totalCap"
                  value={form.totalCap}
                  onChange={handleChange}
                />

                <small>
                  Set to 0 for unlimited campaign clicks.
                </small>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Campaign ID</h2>

            <p>
              This identifier is generated by TrackFlow.
            </p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.readonly}>
              {params.id || "—"}
            </div>
          </div>
        </section>

        <div className={styles.footer}>
          <Link
            href={`/campaigns/${params.id}`}
            className={styles.cancel}
          >
            Cancel
          </Link>

          <button
            type="submit"
            className={styles.save}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className={styles.spinner}
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
