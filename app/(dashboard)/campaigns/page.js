"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Pencil,
  Pause,
  Play,
  Trash2,
  MousePointerClick,
  TrendingUp,
  DollarSign,
  Target,
} from "lucide-react";

import styles from "./page.module.css";
import { useCampaigns } from "@/context/CampaignContext";

export default function CampaignsPage() {
  const {
    campaigns,
    loaded,
    deleteCampaign,
  } = useCampaigns();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [openMenu, setOpenMenu] = useState(null);

  const loading = !loaded;

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name?.toLowerCase().includes(search.toLowerCase()) ||
        campaign.offer?.offerName
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        `${campaign.publisher?.firstName || ""} ${
          campaign.publisher?.lastName || ""
        }`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" || campaign.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [campaigns, search, status]);

  const stats = useMemo(() => {
    const clicks = campaigns.reduce(
      (total, campaign) => total + (campaign.clicks || 0),
      0
    );

    const conversions = campaigns.reduce(
      (total, campaign) => total + (campaign.conversions || 0),
      0
    );

    const revenue = campaigns.reduce(
      (total, campaign) => total + Number(campaign.revenue || 0),
      0
    );

    const payout = campaigns.reduce(
      (total, campaign) => total + Number(campaign.payout || 0),
      0
    );

    return {
      total: campaigns.length,
      active: campaigns.filter((c) => c.status === "ACTIVE").length,
      clicks,
      conversions,
      revenue,
      payout,
    };
  }, [campaigns]);

  function copyTrackingUrl(trackingCode) {
    const url = `${window.location.origin}/api/campaigns/track/${trackingCode}`;

    navigator.clipboard.writeText(url);

    setOpenMenu(null);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  function formatDate(date) {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <main className={styles.page}>
      {/* Header */}
      <section className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>
            Dashboard <span>/</span> Campaigns
          </div>

          <h1>Campaigns</h1>

          <p>
            Manage your affiliate campaigns, tracking links and performance.
          </p>
        </div>

        <Link href="/campaigns/create" className={styles.createButton}>
          <Plus size={18} />
          Create Campaign
        </Link>
      </section>

      {/* Stats */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.blue}`}>
            <Target size={19} />
          </div>

          <div>
            <span>Total Campaigns</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.green}`}>
            <Play size={19} />
          </div>

          <div>
            <span>Active Campaigns</span>
            <strong>{stats.active}</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.orange}`}>
            <MousePointerClick size={19} />
          </div>

          <div>
            <span>Total Clicks</span>
            <strong>{stats.clicks.toLocaleString()}</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.purple}`}>
            <TrendingUp size={19} />
          </div>

          <div>
            <span>Conversions</span>
            <strong>{stats.conversions.toLocaleString()}</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.green}`}>
            <DollarSign size={19} />
          </div>

          <div>
            <span>Revenue</span>
            <strong>{formatCurrency(stats.revenue)}</strong>
          </div>
        </div>
      </section>

      {/* Table Card */}
      <section className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />

            <input
              type="text"
              placeholder="Search campaigns, offers or publishers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            className={styles.select}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Campaign</th>
                <th>Offer</th>
                <th>Publisher</th>
                <th>Performance</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className={styles.empty}>
                    Loading campaigns...
                  </td>
                </tr>
              ) : filteredCampaigns.length === 0 ? (
                <tr>
                  <td colSpan="8" className={styles.empty}>
                    <Target size={34} />
                    <strong>No campaigns found</strong>
                    <span>
                      Create your first campaign to start tracking traffic.
                    </span>
                  </td>
                </tr>
              ) : (
                filteredCampaigns.map((campaign) => {
                  const publisher = campaign.publisher
                    ? `${campaign.publisher.firstName || ""} ${
                        campaign.publisher.lastName || ""
                      }`.trim()
                    : "—";

                  return (
                    <tr key={campaign.id}>
                      <td>
                        <div className={styles.campaignName}>
                          <div className={styles.campaignAvatar}>
                            {campaign.name?.charAt(0)?.toUpperCase() || "C"}
                          </div>

                          <div>
                            <strong>{campaign.name}</strong>

                            <small>
                              {campaign.trackingCode || "No tracking code"}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className={styles.primaryText}>
                          {campaign.offer?.offerName || "—"}
                        </div>

                        <small>
                          {campaign.offer?.advertiser || "No advertiser"}
                        </small>
                      </td>

                      <td>
                        <div className={styles.publisher}>
                          <div className={styles.publisherAvatar}>
                            {publisher.charAt(0)?.toUpperCase() || "P"}
                          </div>

                          <span>{publisher || "—"}</span>
                        </div>
                      </td>

                      <td>
                        <div className={styles.performance}>
                          <strong>
                            {(campaign.clicks || 0).toLocaleString()}
                          </strong>

                          <span>
                            {campaign.conversions || 0} conversions
                          </span>
                        </div>
                      </td>

                      <td>
                        <strong>
                          {formatCurrency(campaign.revenue)}
                        </strong>
                      </td>

                      <td>
                        <span
                          className={`${styles.status} ${
                            campaign.status === "ACTIVE"
                              ? styles.active
                              : campaign.status === "PAUSED"
                                ? styles.paused
                                : styles.inactive
                          }`}
                        >
                          <span />
                          {campaign.status || "UNKNOWN"}
                        </span>
                      </td>

                      <td>
                        <span className={styles.date}>
                          {formatDate(campaign.createdAt)}
                        </span>
                      </td>

                      <td>
                        <div className={styles.actionWrapper}>
                          <button
                            className={styles.actionButton}
                            onClick={() =>
                              setOpenMenu(
                                openMenu === campaign.id
                                  ? null
                                  : campaign.id
                              )
                            }
                          >
                            <MoreHorizontal size={19} />
                          </button>

                          {openMenu === campaign.id && (
                            <div className={styles.menu}>
                              <Link
                                href={`/campaigns/${campaign.id}`}
                                onClick={() => setOpenMenu(null)}
                              >
                                <ExternalLink size={15} />
                                View campaign
                              </Link>

                              <Link
                                href={`/campaigns/${campaign.id}/edit`}
                                onClick={() => setOpenMenu(null)}
                              >
                                <Pencil size={15} />
                                Edit campaign
                              </Link>

                              <button
                                onClick={() =>
                                  copyTrackingUrl(campaign.trackingCode)
                                }
                              >
                                <Copy size={15} />
                                Copy tracking URL
                              </button>

                              {campaign.status === "ACTIVE" ? (
                                <button>
                                  <Pause size={15} />
                                  Pause campaign
                                </button>
                              ) : (
                                <button>
                                  <Play size={15} />
                                  Activate campaign
                                </button>
                              )}

                              <button className={styles.deleteAction}>
                                <Trash2 size={15} />
                                Delete campaign
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <span>
            Showing <strong>{filteredCampaigns.length}</strong> of{" "}
            <strong>{campaigns.length}</strong> campaigns
          </span>

          <div className={styles.footerActions}>
            <button disabled>Previous</button>
            <button className={styles.currentPage}>1</button>
            <button disabled>Next</button>
          </div>
        </div>
      </section>
    </main>
  );
}
