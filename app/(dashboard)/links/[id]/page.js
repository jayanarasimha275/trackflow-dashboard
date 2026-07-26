"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  ExternalLink,
  MousePointerClick,
  Users,
  Activity,
  Globe2,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";

import { useLinks } from "@/context/LinksContext";
import ClickChart from "@/components/charts/ClickChart";
import ClickHistory from "@/components/analytics/ClickHistory";

import styles from "./LinkDetails.module.css";

export default function LinkDetailsPage({ params }) {
  const { id } = use(params);

  const { getLink, fetchLinkClicks, loaded, updateLink, deleteLink } =
    useLinks();

  const trackedLink = getLink(id);

  const [clicks, setClicks] = useState([]);
  const [period, setPeriod] = useState("7days");
  useEffect(() => {
    async function loadClicks() {
      try {
        const result = await fetchLinkClicks(id);

        console.log("CLICK API RESPONSE:", result);

        if (result.success) {
          console.log("CLICK DATA:", result.data);
          setClicks(result.data);
        }
      } catch (error) {
        console.error("Failed to load clicks:", error);
      }
    }

    if (id) {
      loadClicks();
    }
  }, [id]);

  async function copyTrackedLink() {
    if (!trackedLink) {
      return;
    }

    await navigator.clipboard.writeText(`https://${trackedLink.shortUrl}`);
  }

  if (!loaded) {
    return <div className={styles.loading}>Loading link...</div>;
  }

  if (!trackedLink) {
    return (
      <div className={styles.notFound}>
        <Globe2 size={32} />

        <h1>Link not found</h1>

        <p>The tracked link you requested does not exist.</p>

        <Link href="/links">Back to links</Link>
      </div>
    );
  }

  const totalClicks = clicks.length;
  const uniqueClicks = clicks.filter((click) => click.isUnique).length;
  const repeatClicks = totalClicks - uniqueClicks;
  const conversions = Number(trackedLink?.conversions || 0);

  const conversionRate =
    totalClicks > 0
      ? ((conversions / totalClicks) * 100).toFixed(2)
      : "0.00";

  const isNewLink = totalClicks === 0;
  /* ---------------- Countries ---------------- */

  const countryCounts = {};

  clicks.forEach((click) => {
    const country = click.country || "Unknown";
    countryCounts[country] = (countryCounts[country] || 0) + 1;
  });

  const totalCountryClicks = clicks.length;

  const countryFlags = {
    India: "🇮🇳",
    "United States": "🇺🇸",
    Germany: "🇩🇪",
    Japan: "🇯🇵",
    Canada: "🇨🇦",
    Australia: "🇦🇺",
  };

  const countries = Object.entries(countryCounts)
    .map(([name, count]) => ({
      name,
      flag: countryFlags[name] || "🌍",
      clicks: count,
      percentage:
        totalCountryClicks > 0
          ? Math.round((count / totalCountryClicks) * 100)
          : 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);
  /* ---------------- Devices ---------------- */

  const deviceCounts = {
    Mobile: 0,
    Desktop: 0,
    Tablet: 0,
  };

  clicks.forEach((click) => {
    const device = click.deviceType || "Desktop";

    if (device.toLowerCase() === "mobile") {
      deviceCounts.Mobile++;
    } else if (device.toLowerCase() === "tablet") {
      deviceCounts.Tablet++;
    } else {
      deviceCounts.Desktop++;
    }
  });

  const devices = Object.entries(deviceCounts).map(([name, count]) => ({
    name,
    percentage: totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0,
  }));
  /* ---------------- Referrers ---------------- */

  const referrerCounts = {};

  clicks.forEach((click) => {
    const referrer = click.referrer || "Direct";

    referrerCounts[referrer] = (referrerCounts[referrer] || 0) + 1;
  });

  const referrers = Object.entries(referrerCounts)
    .map(([name, count]) => ({
      name,
      clicks: count,
      percentage: totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);
  const browserCounts = {};

  clicks.forEach((click) => {
    const browser = click.browser || "Unknown";
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;
  });

  const browsers = Object.entries(browserCounts)
    .map(([name, count]) => ({
      name,
      clicks: count,
      percentage:
        totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0,
    }))
    .sort((a, b) => b.clicks - a.clicks);

  return (
    <div className={styles.page}>
      <Link href="/links" className={styles.backLink}>
        <ArrowLeft size={17} />
        Back to links
      </Link>

      <section className={styles.header}>
        <div>
          <div className={styles.statusRow}>
            <span className={styles.status}>{trackedLink.status}</span>

            <span>Link ID: {trackedLink.id}</span>
          </div>

          <h1>{trackedLink.title}</h1>

          <div className={styles.shortLink}>
            <span>{trackedLink.shortUrl}</span>

            <button
              type="button"
              onClick={copyTrackedLink}
              aria-label="Copy tracked link"
            >
              <Copy size={15} />
            </button>

            <a
              href={trackedLink.destinationUrl}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={15} />
            </a>
          </div>

          <p className={styles.destination}>
            Redirects to {trackedLink.destinationUrl}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={() => {
              const confirmed = window.confirm(
                `Delete "${trackedLink.title}"? This action cannot be undone.`,
              );

              if (confirmed) {
                deleteLink(id);
                window.location.href = "/links";
              }
            }}
            className={styles.editButton}
          >
            Delete link
          </button>

          <button
            type="button"
            onClick={() =>
              updateLink(id, {
                status: trackedLink.status === "Active" ? "Paused" : "Active",
              })
            }
            className={styles.editButton}
          >
            {trackedLink.status === "Active" ? "Pause link" : "Activate link"}
          </button>

          <Link href={`/links/${id}/edit`} className={styles.editButton}>
            Edit link
          </Link>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <MousePointerClick size={21} />
          </div>

          <div>
            <span>Total clicks</span>

            <strong>{totalClicks.toLocaleString()}</strong>

            <small>
              {isNewLink
                ? "Waiting for first click"
                : `${totalClicks.toLocaleString()} total tracked clicks`}
            </small>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={21} />
          </div>

          <div>
            <span>Unique Clicks</span>

            <strong>{uniqueClicks.toLocaleString()}</strong>

            <small>
              {isNewLink
                ? "No unique clicks yet"
                : `${Math.round((uniqueClicks / totalClicks) * 100)}% unique traffic`}
            </small>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Activity size={21} />
          </div>

          <div>
            <span>Conversions</span>

            <strong>{conversions.toLocaleString()}</strong>

            <small>
              {isNewLink
                ? "No conversions yet"
                : `${conversionRate}% conversion rate`}
            </small>
          </div>
        </article>

        <article className={styles.statCard}>
          <div className={styles.statIcon}>
            <Globe2 size={21} />
          </div>

          <div>
            <span>Conversion Rate</span>

            <strong>{conversionRate}%</strong>

            <small>
              {isNewLink
                ? "No conversion data yet"
                : `${conversions} conversion${conversions !== 1 ? "s" : ""}`}
            </small>
          </div>
        </article>
      </section>

      {isNewLink ? (
        <section className={styles.emptyAnalytics}>
          <Activity size={30} />

          <h2>No analytics yet</h2>

          <p>
            Analytics will appear after people start visiting this tracked link.
          </p>

          <button type="button" onClick={copyTrackedLink}>
            <Copy size={16} />
            Copy tracked link
          </button>
        </section>
      ) : (
        <>
          <section className={styles.chartCard}>
            <div className={styles.sectionHeader}>
              <div>
                <h2>Click performance</h2>

                <p>Traffic generated by {trackedLink.title}.</p>
              </div>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>

            <ClickChart period={period} clicks={clicks} />
            <ClickHistory clicks={clicks} />
          </section>

          <section className={styles.analyticsGrid}>
            <article className={styles.analyticsCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Top countries</h2>
                  <p>Traffic by visitor location.</p>
                </div>
              </div>

              <div className={styles.countryList}>
                {countries.map((country) => (
                  <div className={styles.countryItem} key={country.name}>
                    <div className={styles.countryInfo}>
                      <span className={styles.flag}>{country.flag}</span>

                      <div>
                        <strong>{country.name}</strong>

                        <span>
                          {country.clicks} click
                          {country.clicks !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    <div className={styles.progressArea}>
                      <div className={styles.progressTrack}>
                        <div
                          className={styles.progressBar}
                          style={{
                            width: `${country.percentage}%`,
                          }}
                        />
                      </div>

                      <span>{country.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className={styles.analyticsCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Devices</h2>

                  <p>Visitor device distribution.</p>
                </div>
              </div>

              <div className={styles.deviceList}>
                {devices.map((device) => {
                  const DeviceIcon =
                    device.name === "Mobile"
                      ? Smartphone
                      : device.name === "Tablet"
                        ? Tablet
                        : Monitor;

                  return (
                    <div className={styles.deviceItem} key={device.name}>
                      <div className={styles.deviceIcon}>
                        <DeviceIcon size={20} />
                      </div>

                      <div className={styles.deviceInfo}>
                        <div>
                          <strong>{device.name}</strong>

                          <span>{device.percentage}%</span>
                        </div>

                        <div className={styles.deviceTrack}>
                          <div
                            className={styles.deviceBar}
                            style={{
                              width: `${device.percentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className={styles.analyticsCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2>Top referrers</h2>

                  <p>Where your visitors came from.</p>
                </div>
              </div>

              <div className={styles.referrerList}>
                {referrers.map((referrer) => (
                  <div className={styles.referrerItem} key={referrer.name}>
                    <div className={styles.referrerIcon}>
                      <Globe2 size={18} />
                    </div>

                    <div>
                      <strong>{referrer.name}</strong>

                      <span>
                        {referrer.clicks} click
                        {referrer.clicks !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <strong className={styles.referrerPercentage}>
                      {referrer.percentage}%
                    </strong>
                  </div>
                ))}
              </div>
              </article>
              <article className={styles.analyticsCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2>Top browsers</h2>

                    <p>Most-used browsers by your visitors.</p>
                  </div>
                </div>

                <div className={styles.referrerList}>
                  {browsers.map((browser) => (
                    <div className={styles.referrerItem} key={browser.name}>
                      <div className={styles.referrerIcon}>
                        <Globe2 size={18} />
                      </div>

                      <div>
                        <strong>{browser.name}</strong>

                        <span>
                          {browser.clicks} click
                          {browser.clicks !== 1 ? "s" : ""}
                        </span>
                      </div>

                      <strong className={styles.referrerPercentage}>
                        {browser.percentage}%
                      </strong>
                    </div>
                  ))}
                </div>
              </article>
          </section>
        </>
      )}

      <style>{`
        .${styles.loading},
        .${styles.notFound} {
          min-height: 60vh;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;

          color: var(--text-light);
        }

        .${styles.notFound} h1 {
          color: var(--text);
        }

        .${styles.notFound} a {
          color: var(--primary);
        }

        .${styles.emptyAnalytics} {
          min-height: 330px;
          margin-top: 20px;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 12px;

          color: var(--text-light);
          background: var(--surface);

          border: 1px solid var(--border);
          border-radius: 18px;
        }

        .${styles.emptyAnalytics} h2 {
          color: var(--text);
          font-size: 18px;
        }

        .${styles.emptyAnalytics} p {
          max-width: 420px;
          text-align: center;
          font-size: 12px;
        }

        .${styles.emptyAnalytics} button {
          height: 40px;
          margin-top: 5px;
          padding: 0 14px;

          display: flex;
          align-items: center;
          gap: 8px;

          color: white;
          background: var(--primary);

          border: none;
          border-radius: 10px;

          font-size: 12px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
