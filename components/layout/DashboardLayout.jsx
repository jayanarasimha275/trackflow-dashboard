"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />

      <div className={styles.main}>
        <Navbar />

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}