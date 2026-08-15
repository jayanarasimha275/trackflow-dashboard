"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Users,
  Pencil,
  MoreHorizontal,
} from "lucide-react";

import styles from "./page.module.css";
import { API_BASE_URL } from "@/config/api";

export default function PublishersPage() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadPublishers();
  }, []);

  async function loadPublishers() {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/publishers`);

      if (!response.ok) {
        throw new Error("Failed to load publishers");
      }

      const result = await response.json();

      setPublishers(result.data || []);
    } catch (error) {
      console.error("Failed to load publishers:", error);
      setPublishers([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePublisher(publisher) {
    const confirmed = window.confirm(
      `Delete "${publisher.firstName} ${publisher.lastName}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(publisher.id);

      const response = await fetch(
        `${API_BASE_URL}/publishers/${publisher.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete publisher."
        );
      }

      setPublishers((current) =>
        current.filter((item) => item.id !== publisher.id)
      );
    } catch (error) {
      console.error("Failed to delete publisher:", error);
      alert(error.message || "Failed to delete publisher.");
    } finally {
      setDeletingId(null);
    }
  }
  const filteredPublishers = publishers.filter((publisher) => {
    const name =
      `${publisher.firstName || ""} ${publisher.lastName || ""}`.toLowerCase();

    const company = (publisher.companyName || "").toLowerCase();
    const email = (publisher.email || "").toLowerCase();

    const query = search.toLowerCase();

    return (
      name.includes(query) ||
      company.includes(query) ||
      email.includes(query)
    );
  });

  const activeCount = publishers.filter(
    (publisher) => publisher.status === "ACTIVE"
  ).length;

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <div>
          <div className={styles.breadcrumb}>
            Management / Publishers
          </div>

          <h1>Publishers</h1>

          <p>
            Manage publishers and assign them to your campaigns.
          </p>
        </div>

        <Link
          href="/publishers/create"
          className={styles.createButton}
        >
          <Plus size={18} />
          Add Publisher
        </Link>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={20} />
          </div>

          <div>
            <span>Total Publishers</span>
            <strong>{publishers.length}</strong>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.activeIndicator} />

          <div>
            <span>Active Publishers</span>
            <strong>{activeCount}</strong>
          </div>
        </div>
      </div>

      <section className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} />

            <input
              type="text"
              placeholder="Search publishers..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <button
            className={styles.refreshButton}
            onClick={loadPublishers}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className={styles.empty}>
            <div className={styles.spinner} />

            <h3>Loading publishers...</h3>

            <p>Please wait.</p>
          </div>
        ) : filteredPublishers.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <Users size={28} />
            </div>

            <h3>
              {search
                ? "No publishers found"
                : "No publishers yet"}
            </h3>

            <p>
              {search
                ? "Try a different search."
                : "Create your first publisher to get started."}
            </p>

            {!search && (
              <Link
                href="/publishers/create"
                className={styles.emptyButton}
              >
                <Plus size={17} />
                Add Publisher
              </Link>
            )}
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Publisher</th>
                  <th>Company</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Balance</th>
                  <th>Created</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {filteredPublishers.map((publisher) => (
                  <tr key={publisher.id}>
                    <td>
                      <div className={styles.publisher}>
                        <div className={styles.avatar}>
                          {(publisher.firstName || "P")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {publisher.firstName}{" "}
                            {publisher.lastName}
                          </strong>

                          <small>
                            {publisher.id}
                          </small>
                        </div>
                      </div>
                    </td>

                    <td>
                      {publisher.companyName || "—"}
                    </td>

                    <td>
                      {publisher.email || "—"}
                    </td>

                    <td>
                      <span
                        className={`${styles.status} ${
                          publisher.status === "ACTIVE"
                            ? styles.active
                            : styles.inactive
                        }`}
                      >
                        <span />
                        {publisher.status || "UNKNOWN"}
                      </span>
                    </td>

                    <td>
                      ₹
                      {Number(
                        publisher.balance || 0
                      ).toFixed(2)}
                    </td>

                    <td>
                      {publisher.createdAt
                        ? new Date(
                            publisher.createdAt
                          ).toLocaleDateString()
                        : "—"}
                    </td>

                    <td>
                      <div className={styles.actions}>
                        <Link
                          href={`/publishers/${publisher.id}/edit`}
                          className={styles.actionButton}
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          title="Delete"
                          onClick={() => handleDeletePublisher(publisher)}
                          disabled={deletingId === publisher.id}
                        >
                          {deletingId === publisher.id ? (
                            <span className={styles.buttonSpinner} />
                          ) : (
                            <MoreHorizontal size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
