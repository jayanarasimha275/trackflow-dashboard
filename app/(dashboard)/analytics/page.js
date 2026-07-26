"use client";

import { useState } from "react";

import { CalendarDays, Download, Filter } from "lucide-react";
import { useDashboard } from "@/context/DashboardContext";

import { useLinks } from "@/context/LinksContext";
import ClickChart from "@/components/charts/ClickChart";

import styles from "./Analytics.module.css";

export default function AnalyticsPage() {
  const { links } = useLinks();
  const { dashboard } = useDashboard();

  const [period, setPeriod] = useState("30days");

  const summary = dashboard?.summary || {};

  const totalClicks = summary.totalClicks || 0;
  const totalVisitors = summary.totalVisitors || 0;
  const totalConversions = summary.totalConversions || 0;
  const averageCTR = summary.conversionRate || 0;
  /* ---------------- Countries ---------------- */

  const countryFlags = {
    IN: "🇮🇳",
    US: "🇺🇸",
    GB: "🇬🇧",
    DE: "🇩🇪",
    FR: "🇫🇷",
    CA: "🇨🇦",
    AU: "🇦🇺",
    JP: "🇯🇵",
  };

  const totalCountryClicks =
    dashboard?.countries?.reduce(
      (total, country) => total + country.clicks,
      0,
    ) || 0;

  const countries =
    dashboard?.countries?.map((country) => ({
      ...country,
      flag: countryFlags[country.name] || "🌍",
      percent:
        totalCountryClicks > 0
          ? Math.round((country.clicks / totalCountryClicks) * 100)
          : 0,
    })) || [];
  /* ---------------- Devices ---------------- */

  const totalDeviceClicks =
    dashboard?.devices?.reduce((total, device) => total + device.clicks, 0) ||
    0;

  const devices =
    dashboard?.devices?.map((device) => ({
      name: device.name,
      percent:
        totalDeviceClicks > 0
          ? Math.round((device.clicks / totalDeviceClicks) * 100)
          : 0,
    })) || [];
  /* ---------------- Browsers ---------------- */

  const totalBrowserClicks =
    dashboard?.browsers?.reduce(
      (total, browser) => total + browser.clicks,
      0,
    ) || 0;

  const browsers =
    dashboard?.browsers?.map((browser) => ({
      name: browser.name,
      percent:
        totalBrowserClicks > 0
          ? Math.round((browser.clicks / totalBrowserClicks) * 100)
          : 0,
    })) || [];

  /* ---------------- Referrers ---------------- */

  const totalReferrerClicks =
    dashboard?.referrers?.reduce(
      (total, referrer) => total + referrer.clicks,
      0,
    ) || 0;

  const referrers =
    dashboard?.referrers?.map((referrer) => ({
      name: referrer.name,
      percent:
        totalReferrerClicks > 0
          ? Math.round((referrer.clicks / totalReferrerClicks) * 100)
          : 0,
    })) || [];
  return (
    <div className={styles.analytics}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>ANALYTICS</p>

          <h1>Analytics</h1>

          <p>Monitor traffic and link performance.</p>
        </div>

        <div className={styles.actions}>
          <button>
            <CalendarDays size={16} />
            {period} days
          </button>

          <button>
            <Filter size={16} />
            Filters
          </button>

          <button>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <section className={styles.overview}>
        <div className={styles.metric}>
          <span>Total Clicks</span>
          <strong>{totalClicks.toLocaleString()}</strong>
        </div>

        <div className={styles.metric}>
          <span>Unique Visitors</span>
          <strong>{totalVisitors.toLocaleString()}</strong>
        </div>

        <div className={styles.metric}>
          <span>Links</span>
          <strong>{summary.totalLinks?.toLocaleString() || 0}</strong>
        </div>

        <div className={styles.metric}>
          <span>Avg Clicks / Link</span>
          <strong>{summary.averageClicksPerLink || 0}</strong>
        </div>
      </section>

      <section className={styles.chartCard}>
        <div className={styles.cardHeader}>
          <div>
            <h2>Traffic Trend</h2>

            <p>Performance over time</p>
          </div>

          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
          >
            <option value="7days">Last 7 Days</option>

            <option value="30days">Last 30 Days</option>

            <option value="90days">Last 90 Days</option>
          </select>
        </div>

        <ClickChart period={period} clicks={dashboard?.chart || []} />
      </section>

      <section className={styles.bottomGrid}>
        {/* Top Countries */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Top Countries</h2>

              <p>Traffic by country</p>
            </div>
          </div>

          {countries.map((country) => (
            <div className={styles.progressItem} key={country.name}>
              <span>
                {country.flag} {country.name}
              </span>

              <div className={styles.progress}>
                <span
                  style={{
                    width: `${country.percent}%`,
                  }}
                />
              </div>

              <strong>{country.percent}%</strong>
            </div>
          ))}
        </div>

        {/* Devices */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Devices</h2>

              <p>Visitor devices</p>
            </div>
          </div>

          {devices.map((device) => (
            <div className={styles.progressItem} key={device.name}>
              <span>{device.name}</span>

              <div className={styles.progress}>
                <span
                  style={{
                    width: `${device.percent}%`,
                  }}
                />
              </div>

              <strong>{device.percent}%</strong>
            </div>
          ))}
        </div>
        {/* Browsers */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Browsers</h2>

              <p>Visitor browsers</p>
            </div>
          </div>

          {browsers.map((browser) => (
            <div className={styles.progressItem} key={browser.name}>
              <span>{browser.name}</span>

              <div className={styles.progress}>
                <span
                  style={{
                    width: `${browser.percent}%`,
                  }}
                />
              </div>

              <strong>{browser.percent}%</strong>
            </div>
          ))}
        </div>

        {/* Referrers */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <div>
              <h2>Referrers</h2>

              <p>Traffic sources</p>
            </div>
          </div>

          {referrers.map((referrer) => (
            <div className={styles.progressItem} key={referrer.name}>
              <span>{referrer.name}</span>

              <div className={styles.progress}>
                <span
                  style={{
                    width: `${referrer.percent}%`,
                  }}
                />
              </div>

              <strong>{referrer.percent}%</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
