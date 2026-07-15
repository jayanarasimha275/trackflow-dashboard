"use client";

import Link from "next/link";
import { Plus, Link2 } from "lucide-react";

import LinksTable from "@/components/tables/LinksTable";
import { useLinks } from "@/context/LinksContext";

export default function LinksPage() {
  const { links, loaded } = useLinks();

  const activeLinks = links.filter(
    (link) => link.status === "Active"
  ).length;

  const pausedLinks = links.filter(
    (link) => link.status === "Paused"
  ).length;

  return (
    <div className="links-page">
      <section className="links-header">
        <div>
          <p className="links-eyebrow">Link management</p>

          <h1>Your links</h1>

          <p className="links-description">
            Create, manage, and monitor all of your tracked links.
          </p>
        </div>

        <Link href="/links/create" className="create-button">
          <Plus size={18} />
          Create link
        </Link>
      </section>

      <section className="links-summary">
        <div className="summary-icon">
          <Link2 size={21} />
        </div>

        <div>
          <strong>
            {loaded ? links.length : "..."} tracked{" "}
            {links.length === 1 ? "link" : "links"}
          </strong>

          <span>
            {activeLinks} active and {pausedLinks} paused
          </span>
        </div>
      </section>

      <section className="links-container">
        <LinksTable />
      </section>

      <style>{`
        .links-page {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding-bottom: 50px;
        }

        .links-header {
          margin-bottom: 28px;

          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
        }

        .links-eyebrow {
          margin-bottom: 8px;

          color: var(--primary);

          font-size: 12px;
          font-weight: 700;

          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .links-header h1 {
          color: var(--text);

          font-size: clamp(28px, 3vw, 38px);
          line-height: 1.2;
        }

        .links-description {
          margin-top: 10px;

          color: var(--text-light);

          font-size: 15px;
        }

        .create-button {
          height: 44px;
          padding: 0 16px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          color: white;
          background: var(--primary);

          border-radius: 12px;

          font-size: 13px;
          font-weight: 600;

          transition:
            background var(--transition),
            transform var(--transition);
        }

        .create-button:hover {
          background: var(--primary-hover);

          transform: translateY(-2px);
        }

        .links-summary {
          width: fit-content;
          margin-bottom: 20px;

          display: flex;
          align-items: center;
          gap: 12px;
        }

        .summary-icon {
          width: 42px;
          height: 42px;

          display: grid;
          place-items: center;

          color: var(--primary);
          background: rgba(59, 130, 246, 0.12);

          border-radius: 11px;
        }

        .links-summary > div:last-child {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .links-summary strong {
          color: var(--text);

          font-size: 13px;
        }

        .links-summary span {
          color: var(--text-light);

          font-size: 11px;
        }

        .links-container {
          overflow: hidden;

          background: var(--surface);

          border: 1px solid var(--border);
          border-radius: 18px;
        }

        @media (max-width: 760px) {
          .links-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .create-button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}