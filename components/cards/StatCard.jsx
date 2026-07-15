import { TrendingUp } from "lucide-react";
import styles from "./StatCard.module.css";

export default function StatCard({ title, value, change, icon }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p className={styles.title}>{title}</p>

          <h2>{value}</h2>
        </div>

        <div className={styles.icon}>{icon}</div>
      </div>

      <div className={styles.footer}>
        <div className={styles.change}>
          <TrendingUp size={15} />

          <span>{change}</span>
        </div>

        <span className={styles.live}>Live</span>
      </div>
    </div>
  );
}
