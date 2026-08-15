"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Pencil,
  Globe,
  Link2,
  CircleDollarSign,
} from "lucide-react";

import { getAdvertiser } from "@/services/advertiserService";

export default function AdvertiserDetailsPage() {
  const { id } = useParams();

  const [advertiser, setAdvertiser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadAdvertiser() {
      try {
        const result = await getAdvertiser(id);

        setAdvertiser(result.data || result);
      } catch (error) {
        console.error(
          "Failed to load advertiser:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadAdvertiser();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-full bg-slate-50 p-8">
        <div className="py-20 text-center text-slate-500">
          Loading advertiser...
        </div>
      </main>
    );
  }

  if (!advertiser) {
    return (
      <main className="min-h-full bg-slate-50 p-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-xl font-semibold text-slate-900">
            Advertiser not found
          </h2>

          <Link
            href="/advertisers"
            className="mt-5 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Advertisers
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-full bg-slate-50 p-8">
      <div className="mb-7 flex items-center justify-between">
        <Link
          href="/advertisers"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={17} />
          Back to Advertisers
        </Link>

        <Link
          href={`/advertisers/${advertiser.id}/edit`}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Pencil size={17} />
          Edit Advertiser
        </Link>
      </div>

      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Building2 size={27} />
          </div>

          <div>
            <div className="mb-1 text-sm text-slate-400">
              Management / Advertisers
            </div>

            <h1 className="text-3xl font-bold text-slate-900">
              {advertiser.name}
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {advertiser.companyName ||
                "Advertiser account"}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            advertiser.status === "ACTIVE"
              ? "bg-emerald-50 text-emerald-600"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {advertiser.status || "UNKNOWN"}
        </span>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <Building2
              size={20}
              className="text-blue-600"
            />

            <h2 className="text-lg font-semibold text-slate-900">
              Advertiser Information
            </h2>
          </div>

          <div className="space-y-5">
            <Info
              label="Name"
              value={advertiser.name}
            />

            <Info
              label="Company"
              value={
                advertiser.companyName || "—"
              }
            />

            <Info
              label="Email"
              value={advertiser.email || "—"}
            />

            <Info
              label="Phone"
              value={advertiser.phone || "—"}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <Globe
              size={20}
              className="text-blue-600"
            />

            <h2 className="text-lg font-semibold text-slate-900">
              Tracking
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Destination URL
              </span>

              {advertiser.destinationUrl ? (
                <a
                  href={advertiser.destinationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 break-all text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  <Link2
                    size={17}
                    className="mt-0.5 shrink-0"
                  />

                  {advertiser.destinationUrl}
                </a>
              ) : (
                <span className="text-sm text-slate-500">
                  —
                </span>
              )}
            </div>

            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Postback URL
              </span>

              <div className="flex items-start gap-3 break-all text-sm text-slate-700">
                <Link2
                  size={17}
                  className="mt-0.5 shrink-0 text-slate-400"
                />

                {advertiser.postbackUrl ||
                  "—"}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-6 flex items-center gap-3">
            <CircleDollarSign
              size={20}
              className="text-blue-600"
            />

            <h2 className="text-lg font-semibold text-slate-900">
              Account Settings
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Info
              label="Currency"
              value={advertiser.currency || "INR"}
            />

            <Info
              label="Status"
              value={advertiser.status || "UNKNOWN"}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold text-slate-900">
            Account Details
          </h2>

          <div className="space-y-5">
            <Info
              label="Advertiser ID"
              value={advertiser.id}
            />

            <Info
              label="Created"
              value={
                advertiser.createdAt
                  ? new Date(
                      advertiser.createdAt
                    ).toLocaleString()
                  : "—"
              }
            />

            <Info
              label="Last Updated"
              value={
                advertiser.updatedAt
                  ? new Date(
                      advertiser.updatedAt
                    ).toLocaleString()
                  : "—"
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <strong className="break-words text-sm font-medium text-slate-800">
        {value}
      </strong>
    </div>
  );
}
