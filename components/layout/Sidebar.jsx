"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link2,
  ChartColumn,
  User,
  Settings,
} from "lucide-react";

import styles from "./Sidebar.module.css";

const menuItems = [
  {
    section: "OVERVIEW",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Analytics",
        href: "/analytics",
        icon: ChartColumn,
      },
    ],
  },

  {
    section: "MANAGEMENT",
    items: [
      {
        name: "Links",
        href: "/links",
        icon: Link2,
      },
    ],
  },

  {
    section: "ACCOUNT",
    items: [
      {
        name: "Profile",
        href: "/profile",
        icon: User,
      },
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
      },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}>TF</div>

        <div className={styles.brandText}>
          <h2>TrackFlow</h2>

          <span>Enterprise</span>
        </div>
      </div>

      <nav className={styles.menu}>
        {menuItems.map((group) => (
          <div key={group.section} className={styles.menuGroup}>
            <p className={styles.groupTitle}>{group.section}</p>

            {group.items.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                >
                  <Icon size={20} />

                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className={styles.sidebarFooter}>
        <div className={styles.storageCard}>
          <span className={styles.storageLabel}>Workspace Storage</span>

          <strong>2.4 GB / 10 GB</strong>

          <div className={styles.storageBar}>
            <span style={{ width: "24%" }} />
          </div>

          <small>24% used</small>
        </div>
      </div>
    </aside>
  );
}
