"use client";

import Link from "next/link";
import { useState } from "react";

import StatCard from "@/components/cards/StatCard";
import ClickChart from "@/components/charts/ClickChart";

import {
  MousePointerClick,
  Link2,
  Users,
  Activity,
  Plus,
  ArrowUpRight,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";

import { useLinks } from "@/context/LinksContext";

import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const { links, loaded } = useLinks();

  const [chartPeriod, setChartPeriod] = useState("7days");

  const totalClicks = links.reduce(
    (total, link) => total + Number(link.clicks || 0),
    0,
  );

  const activeLinks = links.filter((link) => link.status === "Active").length;

  const uniqueVisitors = links.reduce(
    (total, link) => total + Number(link.visitors || 0),
    0,
  );

  const conversionRate =
    links.length > 0
      ? Math.round(
          links.reduce(
            (total, link) => total + Number(link.conversion || 0),
            0,
          ) / links.length,
        )
      : 0;

  const countryFlags = {
    India: "🇮🇳",
    "United States": "🇺🇸",
    Germany: "🇩🇪",
    Japan: "🇯🇵",
    "United Kingdom": "🇬🇧",
    Canada: "🇨🇦",
    Australia: "🇦🇺",
    France: "🇫🇷",
  };

  const countryClicks = links.reduce((countries, link) => {
    const country = link.topCountry || "No data";
    const clicks = Number(link.clicks || 0);

    if (country === "No data") {
      return countries;
    }

    countries[country] = (countries[country] || 0) + clicks;

    return countries;
  }, {});

  const totalCountryClicks = Object.values(countryClicks).reduce(
    (total, clicks) => total + clicks,
    0,
  );

  const topCountries = Object.entries(countryClicks)
    .map(([name, clicks]) => ({
      name,
      flag: countryFlags[name] || "🌍",
      clicks,
      value:
        totalCountryClicks > 0
          ? Math.round((clicks / totalCountryClicks) * 100)
          : 0,
    }))
    .sort(
      (firstCountry, secondCountry) =>
        secondCountry.clicks - firstCountry.clicks,
    )
    .slice(0, 5);
  const sortedLinks = [...links].sort(
    (firstLink, secondLink) =>
      Number(secondLink.clicks || 0) - Number(firstLink.clicks || 0),
  );
  const deviceTotals = links.reduce(
    (totals, link) => {
      totals.mobile += Number(link.devices?.mobile || 0);

      totals.desktop += Number(link.devices?.desktop || 0);

      totals.tablet += Number(link.devices?.tablet || 0);

      return totals;
    },
    {
      mobile: 0,
      desktop: 0,
      tablet: 0,
    },
  );

  const totalDeviceVisitors =
    deviceTotals.mobile + deviceTotals.desktop + deviceTotals.tablet;

  const deviceData = [
    {
      name: "Mobile",
      visitors: deviceTotals.mobile,
      value:
        totalDeviceVisitors > 0
          ? Math.round((deviceTotals.mobile / totalDeviceVisitors) * 100)
          : 0,
    },
    {
      name: "Desktop",
      visitors: deviceTotals.desktop,
      value:
        totalDeviceVisitors > 0
          ? Math.round((deviceTotals.desktop / totalDeviceVisitors) * 100)
          : 0,
    },
    {
      name: "Tablet",
      visitors: deviceTotals.tablet,
      value:
        totalDeviceVisitors > 0
          ? Math.round((deviceTotals.tablet / totalDeviceVisitors) * 100)
          : 0,
    },
  ];

  return (
    <div className={styles.dashboard}>
      <section className={styles.dashboardHeader}>
        <div>
          <p className={styles.eyebrow}>GOOD TO SEE YOU AGAIN 👋</p>

          <h1>Welcome back, Narasimha</h1>

          <p className={styles.description}>
            You currently have <strong>{links.length}</strong> tracked{" "}
            {links.length === 1 ? "link" : "links"}, generating{" "}
            <strong>{totalClicks.toLocaleString()}</strong> clicks from{" "}
            <strong>{uniqueVisitors.toLocaleString()}</strong> unique visitors.
          </p>
        </div>

        <div className={styles.heroRight}>
          <div className={styles.heroStats}>
            <div>
              <span>Today's Clicks</span>

              <strong>{Math.round(totalClicks * 0.08).toLocaleString()}</strong>
            </div>

            <div>
              <span>Active Links</span>

              <strong>{activeLinks}</strong>
            </div>

            <div>
              <span>Growth</span>

              <strong style={{ color: "#22c55e" }}>+18%</strong>
            </div>
          </div>

          <div className={styles.heroActions}>
            <Link href="/analytics" className={styles.secondaryButton}>
              View analytics
              <ArrowUpRight size={18} />
            </Link>

            <Link href="/links/create" className={styles.primaryButton}>
              <Plus size={18} />
              Create link
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <StatCard
          title="Total Clicks"
          value={loaded ? totalClicks.toLocaleString() : "..."}
          change="+12.5% vs previous period"
          icon={<MousePointerClick size={24} />}
        />

        <StatCard
          title="Active Links"
          value={loaded ? activeLinks : "..."}
          change={`${links.length} total tracked links`}
          icon={<Link2 size={24} />}
        />

        <StatCard
          title="Unique Visitors"
          value={loaded ? uniqueVisitors.toLocaleString() : "..."}
          change="+18.2% vs previous period"
          icon={<Users size={24} />}
        />

        <StatCard
          title="Conversion Rate"
          value={loaded ? `${conversionRate}%` : "..."}
          change="+3.2% vs previous period"
          icon={<Activity size={24} />}
        />
      </section>

      <section className={styles.analyticsGrid}>
        <div className={styles.countriesPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Top countries</h2>

              <p>Traffic by visitor location</p>
            </div>
          </div>

          <div className={styles.countryList}>
            {topCountries.length > 0 ? (
              topCountries.map((country, index) => (
                <div className={styles.countryItem} key={country.name}>
                  <span className={styles.countryRank}>{index + 1}</span>

                  <span className={styles.countryFlag}>{country.flag}</span>

                  <div className={styles.countryDetails}>
                    <div className={styles.countryNameRow}>
                      <strong>{country.name}</strong>

                      <span>{country.value}%</span>
                    </div>

                    <div className={styles.countryBar}>
                      <span
                        style={{
                          width: `${country.value}%`,
                        }}
                      />
                    </div>

                    <small>{country.clicks.toLocaleString()} clicks</small>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.countryEmpty}>
                <span>🌍</span>

                <strong>No country data yet</strong>

                <p>
                  Visitor locations will appear after your links receive
                  traffic.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.performancePanel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Performance</h2>

              <p>Clicks generated over time</p>
            </div>

            <select
              value={chartPeriod}
              onChange={(event) => setChartPeriod(event.target.value)}
              aria-label="Analytics period"
            >
              <option value="7days">7 days</option>

              <option value="30days">30 days</option>

              <option value="90days">90 days</option>
            </select>
          </div>

          <ClickChart period={chartPeriod} totalClicks={totalClicks} />
        </div>

        <div className={styles.topLinksPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Top links</h2>

              <p>Highest performing links</p>
            </div>
          </div>

          <div className={styles.compactLinks}>
            {sortedLinks.slice(0, 5).map((link, index) => (
              <Link
                href={`/links/${link.id}`}
                className={styles.compactLinkItem}
                key={link.id}
              >
                <span className={styles.compactRank}>{index + 1}</span>

                <div className={styles.compactLinkInfo}>
                  <strong>{link.title}</strong>

                  <span>{link.shortUrl}</span>
                </div>

                <strong className={styles.compactClicks}>
                  {Number(link.clicks || 0).toLocaleString()}
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className={styles.trafficGrid}>
        <div className={styles.devicePanel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Device distribution</h2>

              <p>Traffic grouped by visitor device</p>
            </div>
          </div>

          <div className={styles.deviceList}>
            {deviceData.map((device) => (
              <div className={styles.deviceItem} key={device.name}>
                <div className={styles.deviceTopRow}>
                  <div>
                    <strong>{device.name}</strong>

                    <span>{device.visitors.toLocaleString()} visitors</span>
                  </div>

                  <strong>{device.value}%</strong>
                </div>

                <div className={styles.deviceBar}>
                  <span
                    style={{
                      width: `${device.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.trafficSummaryPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Traffic summary</h2>

              <p>Current tracked-link overview</p>
            </div>
          </div>

          <div className={styles.summaryList}>
            <div className={styles.summaryItem}>
              <span>Total links</span>

              <strong>{links.length}</strong>
            </div>

            <div className={styles.summaryItem}>
              <span>Active links</span>

              <strong>{activeLinks}</strong>
            </div>

            <div className={styles.summaryItem}>
              <span>Total clicks</span>

              <strong>{totalClicks.toLocaleString()}</strong>
            </div>

            <div className={styles.summaryItem}>
              <span>Unique visitors</span>

              <strong>{uniqueVisitors.toLocaleString()}</strong>
            </div>

            <div className={styles.summaryItem}>
              <span>Average conversion</span>

              <strong>{conversionRate}%</strong>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.activitySection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Recent activity</h2>
            <p>Latest traffic across your tracked links</p>
          </div>
        </div>

        <div className={styles.activityGrid}>
          {[...links]
            .sort(
              (firstLink, secondLink) =>
                Number(secondLink.clicks || 0) - Number(firstLink.clicks || 0),
            )
            .slice(0, 6)
            .map((link, index) => {
              const devices = link.devices || {};

              const deviceEntries = [
                ["Mobile", Number(devices.mobile || 0)],
                ["Desktop", Number(devices.desktop || 0)],
                ["Tablet", Number(devices.tablet || 0)],
              ];

              const [device] = deviceEntries.sort(
                (firstDevice, secondDevice) => secondDevice[1] - firstDevice[1],
              )[0];

              const DeviceIcon =
                device === "Mobile"
                  ? Smartphone
                  : device === "Tablet"
                    ? Tablet
                    : Monitor;

              return (
                <Link
                  href={`/links/${link.id}`}
                  className={styles.activityItem}
                  key={link.id}
                >
                  <div className={styles.activityIcon}>
                    <DeviceIcon size={16} />
                  </div>

                  <div className={styles.activityInfo}>
                    <strong>{link.title}</strong>

                    <span>{link.shortUrl}</span>
                  </div>

                  <div className={styles.activityMeta}>
                    <strong>{Number(link.clicks || 0).toLocaleString()}</strong>

                    <span>
                      {device} · {link.topCountry || "No data"}
                    </span>
                  </div>

                  <span className={styles.activityTime}>
                    {index === 0 ? "2 min ago" : `${index * 7 + 3} min ago`}
                  </span>
                </Link>
              );
            })}
        </div>
      </section>
      <section className={styles.quickActionsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Quick Actions</h2>
            <p>Frequently used shortcuts</p>
          </div>
        </div>

        <div className={styles.quickActionsGrid}>
          <Link href="/links/create" className={styles.quickCard}>
            <Plus size={22} />

            <strong>Create Link</strong>

            <span>Generate a new short link</span>
          </Link>

          <Link href="/links" className={styles.quickCard}>
            <Link2 size={22} />

            <strong>Manage Links</strong>

            <span>Edit or delete tracked links</span>
          </Link>

          <Link href="/analytics" className={styles.quickCard}>
            <Activity size={22} />

            <strong>Analytics</strong>

            <span>View detailed reports</span>
          </Link>

          <Link href="/profile" className={styles.quickCard}>
            <Users size={22} />

            <strong>Profile</strong>

            <span>Update your account</span>
          </Link>
        </div>
      </section>
      <section className={styles.performanceTableSection}>
        <div className={styles.tableTopBar}>
          <div>
            <h2>Link performance</h2>

            <p>Detailed performance across all tracked links</p>
          </div>

          <Link href="/links" className={styles.viewAllLink}>
            View all links
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className={styles.dashboardTableWrapper}>
          <table className={styles.dashboardTable}>
            <thead>
              <tr>
                <th>Link</th>

                <th>Destination</th>

                <th>Clicks</th>

                <th>Unique visitors</th>

                <th>Conversion</th>

                <th>Top country</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {sortedLinks.map((link) => (
                <tr key={link.id}>
                  <td>
                    <Link
                      href={`/links/${link.id}`}
                      className={styles.tableLinkInfo}
                    >
                      <strong>{link.title}</strong>

                      <span>{link.shortUrl}</span>
                    </Link>
                  </td>

                  <td>
                    <span className={styles.tableDestination}>
                      {link.destination}
                    </span>
                  </td>

                  <td>
                    <strong>{Number(link.clicks || 0).toLocaleString()}</strong>
                  </td>

                  <td>{Number(link.visitors || 0).toLocaleString()}</td>

                  <td>
                    <span className={styles.conversionValue}>
                      {Number(link.conversion || 0)}%
                    </span>
                  </td>

                  <td>{link.topCountry || "No data"}</td>

                  <td>
                    <span
                      className={`${styles.tableStatus} ${
                        link.status === "Active"
                          ? styles.tableActive
                          : styles.tablePaused
                      }`}
                    >
                      {link.status}
                    </span>
                  </td>
                </tr>
              ))}

              {sortedLinks.length === 0 && (
                <tr>
                  <td colSpan="7">No tracked links yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
