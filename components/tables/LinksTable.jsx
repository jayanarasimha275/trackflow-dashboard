"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  ExternalLink,
  MoreHorizontal,
  Search,
} from "lucide-react";

import { useLinks } from "@/context/LinksContext";

export default function LinksTable() {
  const {
    links,
    loaded,
    updateLink,
    deleteLink,
  } = useLinks();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredLinks = links.filter((item) => {
    const query = search.toLowerCase().trim();

    return (
      item.title.toLowerCase().includes(query) ||
      item.shortUrl.toLowerCase().includes(query) ||
      item.destination.toLowerCase().includes(query)
    );
  });

  async function copyLink(event, shortUrl) {
    event.preventDefault();
    event.stopPropagation();

    await navigator.clipboard.writeText(
      `https://${shortUrl}`
    );
  }

  if (!loaded) {
    return (
      <div className="links-loading">
        Loading links...
      </div>
    );
  }

  return (
    <div className="links-table-section">
      <div className="table-toolbar">
        <div className="table-search">
          <Search size={18} />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by title or URL..."
            aria-label="Search links"
          />
        </div>

        <span className="result-count">
          {filteredLinks.length}{" "}
          {filteredLinks.length === 1
            ? "link"
            : "links"}
        </span>
      </div>

      <div className="links-table-wrapper">
        <table className="links-table">
          <thead>
            <tr>
              <th>Link</th>
              <th>Destination</th>
              <th>Clicks</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>

          <tbody>
            {filteredLinks.map((item) => (
              <tr key={item.id}>
                <td>
                  <Link
                    href={`/links/${item.id}`}
                    className="link-info"
                  >
                    <strong>{item.title}</strong>
                    <span>{item.shortUrl}</span>
                  </Link>
                </td>

                <td>
                  <span className="destination">
                    {item.destination}
                  </span>
                </td>

                <td>
                  <strong className="click-count">
                    {Number(
                      item.clicks
                    ).toLocaleString()}
                  </strong>
                </td>

                <td>
                  <span
                    className={`status ${item.status === "Active"
                      ? "active"
                      : "paused"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td>
                  <div className="actions">
                    <button
                      type="button"
                      onClick={(event) =>
                        copyLink(
                          event,
                          item.shortUrl
                        )
                      }
                      aria-label={`Copy ${item.title} link`}
                    >
                      <Copy size={16} />
                    </button>

                    <Link
                      href={`/links/${item.id}`}
                      aria-label={`View ${item.title}`}
                    >
                      <ExternalLink size={16} />
                    </Link>

                    <Link
                      href={`/links/${item.id}/edit`}
                      aria-label={`Edit ${item.title}`}
                      title="Edit link"
                    >
                      <MoreHorizontal size={17} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {filteredLinks.length === 0 && (
              <tr>
                <td colSpan="5">
                  <div className="empty-search">
                    <Search size={24} />

                    <strong>No links found</strong>

                    <span>
                      No tracked links match
                      &quot;{search}&quot;.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .links-loading {
          min-height: 220px;

          display: grid;
          place-items: center;

          color: var(--text-light);
          font-size: 12px;
        }

        .links-table-section {
          width: 100%;
        }

        .table-toolbar {
          padding: 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;

          border-bottom: 1px solid var(--border);
        }

        .table-search {
          width: min(420px, 100%);
          height: 42px;
          padding: 0 13px;

          display: flex;
          align-items: center;
          gap: 10px;

          color: var(--text-light);
          background: var(--bg);

          border: 1px solid var(--border);
          border-radius: 11px;
        }

        .table-search:focus-within {
          border-color: var(--primary);
        }

        .table-search input {
          width: 100%;

          color: var(--text);
          background: transparent;

          border: none;
          outline: none;
        }

        .result-count {
          color: var(--text-light);
          font-size: 11px;
        }

        .links-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .links-table {
          width: 100%;
          min-width: 820px;

          border-collapse: collapse;
        }

        .links-table th {
          padding: 15px 20px;

          color: var(--text-light);
          background: rgba(255, 255, 255, 0.015);

          border-bottom: 1px solid var(--border);

          font-size: 10px;
          font-weight: 600;
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .links-table td {
          padding: 17px 20px;

          color: var(--text);

          border-bottom: 1px solid var(--border);

          font-size: 12px;
        }

        .links-table tbody tr:last-child td {
          border-bottom: none;
        }

        .links-table tbody tr {
          transition: background var(--transition);
        }

        .links-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .link-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .link-info strong {
          color: var(--text);
          font-size: 13px;
        }

        .link-info span {
          color: var(--primary);
          font-size: 11px;
        }

        .link-info:hover strong {
          color: var(--primary);
        }

        .destination {
          max-width: 270px;

          display: block;
          overflow: hidden;

          color: var(--text-light);

          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .click-count {
          color: var(--text);
          font-size: 13px;
        }

        .status {
          padding: 5px 9px;

          display: inline-flex;

          border-radius: 999px;

          font-size: 10px;
          font-weight: 600;
        }

        .status.active {
          color: #22c55e;
          background: rgba(34, 197, 94, 0.12);
        }

        .status.paused {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.12);
        }

        .actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
        }

        .actions button,
        .actions a {
          width: 32px;
          height: 32px;

          display: grid;
          place-items: center;

          color: var(--text-light);
          background: transparent;

          border: 1px solid transparent;
          border-radius: 8px;

          transition: var(--transition);
        }

        .actions button:hover,
        .actions a:hover {
          color: var(--primary);
          background: rgba(59, 130, 246, 0.08);

          border-color: rgba(59, 130, 246, 0.2);
        }

        .empty-search {
          min-height: 220px;

          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 9px;

          color: var(--text-light);
        }

        .empty-search strong {
          color: var(--text);
          font-size: 14px;
        }

        .empty-search span {
          font-size: 11px;
        }

        @media (max-width: 760px) {
          .table-toolbar {
            align-items: stretch;
            flex-direction: column;
          }

          .table-search {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}