"use client";

import { useState } from "react";

import {
  CalendarDays,
  Download,
  Filter,
} from "lucide-react";

import { useLinks } from "@/context/LinksContext";
import ClickChart from "@/components/charts/ClickChart";

import styles from "./Analytics.module.css";

export default function AnalyticsPage() {
  const { links } = useLinks();

  const [period, setPeriod] = useState("30days");

  const totalClicks = links.reduce(
    (sum, link) => sum + Number(link.clicks || 0),
    0
  );

  const totalVisitors = links.reduce(
    (sum, link) => sum + Number(link.visitors || 0),
    0
  );

  const totalConversions = links.reduce(
    (sum, link) => sum + Number(link.conversion || 0),
    0
  );

  const averageCTR =
    links.length > 0
      ? Math.round(totalConversions / links.length)
      : 0;

  /* ---------------- Countries ---------------- */

  const countryClicks = {};

  links.forEach((link) => {
    const country = link.topCountry || "Unknown";

    countryClicks[country] =
      (countryClicks[country] || 0) +
      Number(link.clicks || 0);
  });

  const totalCountryClicks = Object.values(
    countryClicks
  ).reduce((a, b) => a + b, 0);

  const countryFlags = {
    India: "🇮🇳",
    "United States": "🇺🇸",
    Germany: "🇩🇪",
    Japan: "🇯🇵",
    Canada: "🇨🇦",
    Australia: "🇦🇺",
  };

  const countries = Object.entries(countryClicks)
    .map(([name, clicks]) => ({
      name,
      flag: countryFlags[name] || "🌍",
      percent:
        totalCountryClicks > 0
          ? Math.round(
            (clicks / totalCountryClicks) * 100
          )
          : 0,
    }))
    .sort((a, b) => b.percent - a.percent);

  /* ---------------- Devices ---------------- */

  const deviceTotals = {
    Mobile: 0,
    Desktop: 0,
    Tablet: 0,
  };

  links.forEach((link) => {
    deviceTotals.Mobile += Number(
      link.devices?.mobile || 0
    );

    deviceTotals.Desktop += Number(
      link.devices?.desktop || 0
    );

    deviceTotals.Tablet += Number(
      link.devices?.tablet || 0
    );
  });

  const totalDevices = Object.values(
    deviceTotals
  ).reduce((a, b) => a + b, 0);

  const devices = Object.entries(deviceTotals).map(
    ([name, value]) => ({
      name,
      percent:
        totalDevices > 0
          ? Math.round(
            (value / totalDevices) * 100
          )
          : 0,
    })
  );

  /* ---------------- Referrers ---------------- */

  const referrerTotals = {};

  links.forEach((link) => {
    const source =
      link.source?.trim() || "Direct";

    referrerTotals[source] =
      (referrerTotals[source] || 0) +
      Number(link.clicks || 0);
  });

  const totalSources = Object.values(
    referrerTotals
  ).reduce((a, b) => a + b, 0);

  const referrers = Object.entries(
    referrerTotals
  )
    .map(([name, clicks]) => ({
      name,
      percent:
        totalSources > 0
          ? Math.round(
            (clicks / totalSources) * 100
          )
          : 0,
    }))
    .sort((a, b) => b.percent - a.percent);

  return (
    <div className={styles.analytics}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            ANALYTICS
          </p>

          <h1>Analytics</h1>

          <p>
            Monitor traffic and link performance.
          </p>
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
          <strong>
            {totalClicks.toLocaleString()}
          </strong>
        </div>

        <div className={styles.metric}>
          <span>Visitors</span>
          <strong>
            {totalVisitors.toLocaleString()}
          </strong>
        </div>

        <div className={styles.metric}>
          <span>Links</span>
          <strong>{links.length}</strong>
        </div>

        <div className={styles.metric}>
          <span>Average CTR</span>
          <strong>{averageCTR}%</strong>
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
            onChange={(event) =>
              setPeriod(event.target.value)
            }
          >
            <option value="7days">
              Last 7 Days
            </option>

            <option value="30days">
              Last 30 Days
            </option>

            <option value="90days">
              Last 90 Days
            </option>
          </select>
        </div>

        <ClickChart
          period={period}
          totalClicks={totalClicks}
        />
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
            <div
              className={styles.progressItem}
              key={country.name}
            >
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

              <strong>
                {country.percent}%
              </strong>
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
            <div
              className={styles.progressItem}
              key={device.name}
            >
              <span>{device.name}</span>

              <div className={styles.progress}>
                <span
                  style={{
                    width: `${device.percent}%`,
                  }}
                />
              </div>

              <strong>
                {device.percent}%
              </strong>
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
            <div
              className={styles.progressItem}
              key={referrer.name}
            >
              <span>{referrer.name}</span>

              <div className={styles.progress}>
                <span
                  style={{
                    width: `${referrer.percent}%`,
                  }}
                />
              </div>

              <strong>
                {referrer.percent}%
              </strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}