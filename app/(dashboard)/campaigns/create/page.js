"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import styles from "./page.module.css";
import { useCampaigns } from "@/context/CampaignContext";
import request from "@/services/api";
import { getPublishers } from "@/services/publisherService";
import { getOffers } from "@/services/offerService";

export default function CreateCampaignPage() {
  const { createCampaign } = useCampaigns();
  const [offers, setOffers] = useState([]);
  const [publishers, setPublishers] = useState([]);


  const [form, setForm] = useState({
    name: "",
    offerId: "",
    publisherId: "",
    trackingDomain: "",
    status: "ACTIVE",
    trafficSource: "",
    dailyCap: 0,
    totalCap: 0,
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    loadOptions();
  }, []);

  async function loadOptions() {
    try {
      setLoadingData(true);

      const [offersResponse, publishersResponse] = await Promise.all([
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
    } catch (error) {
      console.error("Failed to load campaign options:", error);
    } finally {
      setLoadingData(false);
    }
  }

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

      await createCampaign({
        ...form,
        dailyCap: Number(form.dailyCap || 0),
        totalCap: Number(form.totalCap || 0),
      });

      window.location.href = "/campaigns";
    } catch (error) {
      console.error("Failed to create campaign:", error);
      alert(error.message || "Failed to create campaign.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div>
          <Link href="/campaigns" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to Campaigns
          </Link>

          <h1>Create Campaign</h1>

          <p>
            Create a campaign and configure its tracking and traffic settings.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Campaign Details</h2>
            <p>Basic information about this campaign.</p>
          </div>

          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="name">
                Campaign Name <span>*</span>
              </label>

              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Amazon Summer Campaign"
              />
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="offerId">
                  Offer <span>*</span>
                </label>

                <select
                  id="offerId"
                  name="offerId"
                  value={form.offerId}
                  onChange={handleChange}
                  disabled={loadingData}
                >
                  <option value="">
                    {loadingData ? "Loading offers..." : "Select an offer"}
                  </option>

                  {offers.map((offer) => (
                    <option key={offer.id} value={offer.id}>
                      {offer.offerName}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="publisherId">
                  Publisher <span>*</span>
                </label>

                <select
                  id="publisherId"
                  name="publisherId"
                  value={form.publisherId}
                  onChange={handleChange}
                  disabled={loadingData}
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
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Tracking Settings</h2>
            <p>Configure how traffic will be tracked.</p>
          </div>

          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor="trackingDomain">
                Tracking Domain
              </label>

              <input
                id="trackingDomain"
                name="trackingDomain"
                value={form.trackingDomain}
                onChange={handleChange}
                placeholder="track.example.com"
              />

              <small>
                Leave empty to use the default TrackFlow tracking domain.
              </small>
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label htmlFor="trafficSource">
                  Traffic Source
                </label>

                <input
                  id="trafficSource"
                  name="trafficSource"
                  value={form.trafficSource}
                  onChange={handleChange}
                  placeholder="Facebook, Google, Instagram..."
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="status">Status</label>

                <select
                  id="status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="PAUSED">Paused</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Traffic Caps</h2>
            <p>
              Optional limits for campaign traffic. Use 0 for unlimited.
            </p>
          </div>

          <div className={styles.grid}>
            <div className={styles.field}>
              <label htmlFor="dailyCap">Daily Click Cap</label>

              <input
                id="dailyCap"
                name="dailyCap"
                type="number"
                min="0"
                value={form.dailyCap}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="totalCap">Total Click Cap</label>

              <input
                id="totalCap"
                name="totalCap"
                type="number"
                min="0"
                value={form.totalCap}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <div className={styles.actions}>
          <Link href="/campaigns" className={styles.cancelButton}>
            Cancel
          </Link>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={loading || loadingData}
          >
            <Save size={17} />

            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </main>
  );
}
