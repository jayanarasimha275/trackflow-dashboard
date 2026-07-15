"use client";

import { usePathname } from "next/navigation";
import { Search, Bell, Moon, ChevronDown } from "lucide-react";

import styles from "./Navbar.module.css";

const pageNames = {
  "/dashboard": "Dashboard",
  "/links": "Links",
  "/analytics": "Analytics",
  "/profile": "Profile",
  "/settings": "Settings",
};

export default function Navbar() {
  const pathname = usePathname();

  const pageTitle =
    pageNames[pathname] ||
    (pathname.startsWith("/links/") ? "Links" : "TrackFlow");

  return (
    <header className={styles.navbar}>
      <div className={styles.pageInfo}>
        <div className={styles.workspace}>
          <div className={styles.workspaceBadge}>TF</div>

          <div>
            <p className={styles.label}>WORKSPACE</p>

            <h2>{pageTitle}</h2>

            <span className={styles.plan}>Professional Plan</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <div className={styles.search}>
          <Search size={18} />

          <input
            type="search"
            placeholder="Search links, analytics..."
            aria-label="Search"
          />

          <span>⌘ K</span>
        </div>

        <button className={styles.iconButton} aria-label="Notifications">
          <Bell size={20} />

          <span className={styles.notificationDot} />
        </button>

        <button className={styles.iconButton} aria-label="Toggle theme">
          <Moon size={20} />
        </button>

        <button className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>JN</div>

            <span className={styles.onlineIndicator} />
          </div>

          <div className={styles.userInfo}>
            <strong>Jaya Narasimha</strong>

            <span>Frontend Developer</span>
          </div>

          <ChevronDown size={17} />
        </button>
      </div>
    </header>
  );
}
