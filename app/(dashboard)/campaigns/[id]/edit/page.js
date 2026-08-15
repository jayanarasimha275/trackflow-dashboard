"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getOffers } from "@/services/offerService";
import { getPublishers } from "@/services/publisherService";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Settings2,
} from "lucide-react";

import styles from "./page.module.css";
import { useCampaigns } from "@/context/CampaignContext";

export default function EditCampaignPage() {
  const params = useParams();
  const router = useRouter();
  const {
    campaigns,
    loaded,
    updateCampaign,
  } = useCampaigns();

  const campaign = campaigns.find(
    (item) => String(item.id) === String(params.id)
  );

  const [form, setForm] = useState({
    name: "",
    offerId: "",
    publisherId: "",
    status: "ACTIVE",
    trafficSource: "",
    trackingDomain: "",
    dailyCap: 0,
    totalCap: 0,
  });

  const [loading, setLoading] = useState(false);
  const [offers, setOffers] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  useEffect(() => {
    if (!loaded || !campaign) return;

    async function loadOptions() {
      try {
        setLoadingData(true);

        const [offersResponse, publishersResponse] =
          await Promise.all([
            getOffers(),
            getPublishers(),
          ]);

        const offersData = Array.isArray(offersResponse)
          ? offersResponse
          : offersResponse?.data || [];

        const publishersData = Array.isArray(publishersResponse)
          ? publishersResponse
          : publishersResponse?.data || [];

        setOffers(offersData);
        setPublishers(publishersData);

        setForm({
          name: campaign.name || "",
          offerId: campaign.offerId || campaign.offer?.id || "",
          publisherId:
            campaign.publisherId ||
            campaign.publisher?.id ||
            "",
          status: campaign.status || "ACTIVE",
          trafficSource: campaign.trafficSource || "",
          trackingDomain: campaign.trackingDomain || "",
          dailyCap: campaign.dailyCap ?? 0,
          totalCap: campaign.totalCap ?? 0,
        });
      } catch (error) {
        console.error(
          "Failed to load campaign options:",
          error
        );
      } finally {
        setLoadingData(false);
      }
    }

    loadOptions();
  }, [loaded, campaign]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();


    if (!form.name.trim()) {
      alert("Campaign name is required.");
      return;
    }

    if (!form.offerId) {
      alert("Please select an offer.");
      return;
    }

    if (!form.publisherId) {
      alert("Please select a publisher.");
      return;
    }
    try {
      setLoading(true);

      await updateCampaign(params.id, {
        ...form,
        dailyCap: Number(form.dailyCap || 0),
        totalCap: Number(form.totalCap || 0),
      });

      router.push(`/campaigns/${params.id}`);
    } catch (error) {
      console.error("Failed to update campaign:", error);
      alert(error.message || "Failed to update campaign.");
    } finally {
      setLoading(false);
    }
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
                <label>
                  Offer <span>*</span>
                </label>

                <select
                  name="offerId"
                  value={form.offerId}
                  onChange={handleChange}
                  disabled={loadingData}
                  required
                >
                  <option value="">
                    {loadingData
                      ? "Loading offers..."
                      : "Select an offer"}
                  </option>

                  {offers.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.offerName}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label>
                  Publisher <span>*</span>
                </label>

                <select
                  name="publisherId"
                  value={form.publisherId}
                  onChange={handleChange}
                  disabled={loadingData}
                  required
                >
                  <option value="">
                    {loadingData
                      ? "Loading publishers..."
                      : "Select a publisher"}
                  </option>

                  {publishers.map((publisher) => (
                    <option key={publisher.id} value={publisher.id}>
                      {publisher.firstName} {publisher.lastName}
                    </option>
                  ))}
                </select>
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
