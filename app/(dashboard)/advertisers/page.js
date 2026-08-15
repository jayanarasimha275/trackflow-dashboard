"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
  RefreshCw,
} from "lucide-react";

import {
  getAdvertisers,
  deleteAdvertiser,
} from "@/services/advertiserService";

export default function AdvertisersPage() {
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  async function loadAdvertisers() {
    try {
      setLoading(true);

      const response = await getAdvertisers();

      const data = Array.isArray(response)
        ? response
        : response?.data || [];

      setAdvertisers(data);
    } catch (error) {
      console.error("Failed to load advertisers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAdvertisers();
  }, []);

  async function handleDelete(id) {
    const advertiser = advertisers.find(
      (item) => item.id === id
    );

    const confirmed = window.confirm(
      `Delete "${advertiser?.name || "this advertiser"}"?`
    );

    if (!confirmed) return;

    try {
      setDeleting(id);

      await deleteAdvertiser(id);

      setAdvertisers((current) =>
        current.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete advertiser:", error);
      alert(error.message || "Failed to delete advertiser.");
    } finally {
      setDeleting(null);
    }
  }

  const filteredAdvertisers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return advertisers.filter((advertiser) => {
      const matchesSearch =
        !query ||
        advertiser.name?.toLowerCase().includes(query) ||
        advertiser.companyName?.toLowerCase().includes(query) ||
        advertiser.email?.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        advertiser.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [advertisers, search, statusFilter]);

  const activeCount = advertisers.filter(
    (advertiser) => advertiser.status === "ACTIVE"
  ).length;

  return (
    <main className="min-h-screen space-y-8 p-6 text-white md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
              <Building2 size={24} className="text-blue-400" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Advertisers
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Manage advertisers and their tracking configuration.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={loadAdvertisers}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <Link
            href="/advertisers/create"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Create Advertiser
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Advertisers"
          value={advertisers.length}
        />

        <StatCard
          label="Active"
          value={activeCount}
        />

        <StatCard
          label="Inactive"
          value={advertisers.length - activeCount}
        />
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search advertisers, companies or emails..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111827]">
        {loading ? (
          <div className="py-24 text-center text-slate-400">
            Loading advertisers...
          </div>
        ) : filteredAdvertisers.length === 0 ? (
          <EmptyState
            hasSearch={Boolean(search || statusFilter !== "ALL")}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="border-b border-slate-800 bg-slate-950/50">
                <tr>
                  <TableHeader>Advertiser</TableHeader>
                  <TableHeader>Company</TableHeader>
                  <TableHeader>Email</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Currency</TableHeader>
                  <TableHeader align="right">
                    Actions
                  </TableHeader>
                </tr>
              </thead>

              <tbody>
                {filteredAdvertisers.map((advertiser) => (
                  <tr
                    key={advertiser.id}
                    className="border-b border-slate-800/80 transition hover:bg-slate-900/60"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold text-blue-400">
                          {advertiser.name
                            ?.charAt(0)
                            ?.toUpperCase() || "A"}
                        </div>

                        <div>
                          <p className="font-semibold text-white">
                            {advertiser.name || "Unnamed Advertiser"}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            ID: {advertiser.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {advertiser.companyName || "—"}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {advertiser.email || "—"}
                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={advertiser.status} />
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-300">
                      {advertiser.currency || "INR"}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/advertisers/${advertiser.id}`}
                          title="View advertiser"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                          <Eye size={18} />
                        </Link>

                        <Link
                          href={`/advertisers/${advertiser.id}/edit`}
                          title="Edit advertiser"
                          className="rounded-lg p-2 text-blue-400 transition hover:bg-slate-800 hover:text-blue-300"
                        >
                          <Pencil size={18} />
                        </Link>

                        <button
                          type="button"
                          title="Delete advertiser"
                          onClick={() =>
                            handleDelete(advertiser.id)
                          }
                          disabled={deleting === advertiser.id}
                          className="rounded-lg p-2 text-red-400 transition hover:bg-slate-800 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer count */}
      {!loading && filteredAdvertisers.length > 0 && (
        <p className="text-sm text-slate-500">
          Showing {filteredAdvertisers.length} of{" "}
          {advertisers.length} advertisers
        </p>
      )}
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}

function TableHeader({ children, align = "left" }) {
  return (
    <th
      className={`px-6 py-4 text-${align} text-xs font-semibold uppercase tracking-wider text-slate-500`}
    >
      {children}
    </th>
  );
}

function StatusBadge({ status }) {
  const active = status === "ACTIVE";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-500/10 text-emerald-400"
          : "bg-slate-700/50 text-slate-400"
      }`}
    >
      {status || "UNKNOWN"}
    </span>
  );
}

function EmptyState({ hasSearch }) {
  return (
    <div className="px-6 py-20 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
        <Building2 size={25} className="text-slate-500" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">
        {hasSearch
          ? "No matching advertisers"
          : "No advertisers yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {hasSearch
          ? "Try changing your search or status filter."
          : "Create your first advertiser to start managing advertiser relationships."}
      </p>

      {!hasSearch && (
        <Link
          href="/advertisers/create"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={17} />
          Create Advertiser
        </Link>
      )}
    </div>
  );
}
