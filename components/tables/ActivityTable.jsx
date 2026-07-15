"use client";

import Link from "next/link";

import {
  MousePointerClick,
  ExternalLink,
} from "lucide-react";

import { useLinks } from "@/context/LinksContext";

export default function ActivityTable() {
  const { links, loaded } = useLinks();

  const recentActivities = [...links]
    .sort(
      (firstLink, secondLink) =>
        Number(secondLink.id) - Number(firstLink.id)
    )
    .slice(0, 4);

  if (!loaded) {
    return (
      <div className="activity-loading">
        Loading activity...
      </div>
    );
  }

  return (
    <div className="activity-list">
      {recentActivities.map((activity, index) => (
        <div
          className="activity-item"
          key={activity.id}
        >
          <div className="activity-icon">
            <MousePointerClick size={18} />
          </div>

          <div className="activity-info">
            <Link
              href={`/links/${activity.id}`}
              className="activity-title"
            >
              <strong>{activity.title}</strong>

              <ExternalLink size={13} />
            </Link>

            <span>{activity.shortUrl}</span>

            <div className="activity-meta">
              <span>
                {Number(
                  activity.clicks || 0
                ).toLocaleString()}{" "}
                clicks
              </span>

              <span>•</span>

              <span>{activity.status}</span>
            </div>
          </div>

          <time>
            {index === 0
              ? "Recently"
              : `${index + 1} links ago`}
          </time>
        </div>
      ))}

      {recentActivities.length === 0 && (
        <div className="activity-empty">
          <MousePointerClick size={24} />

          <strong>No activity yet</strong>

          <span>
            Create your first tracked link to get started.
          </span>
        </div>
      )}

      <style>{`
        .activity-loading {
          min-height: 220px;

          display: grid;
          place-items: center;

          color: var(--text-light);

          font-size: 12px;
        }

        .activity-list {
          margin-top: 22px;

          display: flex;
          flex-direction: column;
        }

        .activity-item {
          min-height: 72px;
          padding: 14px 0;

          display: flex;
          align-items: center;
          gap: 12px;

          border-bottom: 1px solid var(--border);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          width: 38px;
          height: 38px;

          flex-shrink: 0;

          display: grid;
          place-items: center;

          color: var(--primary);
          background: rgba(59, 130, 246, 0.12);

          border-radius: 10px;
        }

        .activity-info {
          flex: 1;

          min-width: 0;
        }

        .activity-title {
          display: flex;
          align-items: center;
          gap: 6px;

          color: var(--text);

          text-decoration: none;
        }

        .activity-title:hover {
          color: var(--primary);
        }

        .activity-title strong {
          font-size: 13px;
        }

        .activity-info > span {
          margin-top: 3px;

          display: block;
          overflow: hidden;

          color: var(--text-light);

          font-size: 11px;

          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .activity-meta {
          margin-top: 7px;

          display: flex;
          align-items: center;
          gap: 6px;

          color: var(--text-light);

          font-size: 11px;
        }

        .activity-item time {
          align-self: flex-start;
          flex-shrink: 0;

          padding-top: 3px;

          color: var(--text-light);

          font-size: 10px;
        }

        .activity-empty {
          min-height: 220px;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 9px;

          color: var(--text-light);

          text-align: center;
        }

        .activity-empty strong {
          color: var(--text);

          font-size: 14px;
        }

        .activity-empty span {
          font-size: 11px;
        }

        @media (max-width: 480px) {
          .activity-item time {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}