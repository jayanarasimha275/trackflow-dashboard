"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Building2,
} from "lucide-react";

import {
  getAdvertiser,
  updateAdvertiser,
} from "@/services/advertiserService";

export default function EditAdvertiserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadAdvertiser() {
      try {
        const result = await getAdvertiser(id);

        setForm(result.data || result);
      } catch (error) {
        console.error("Failed to load advertiser:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAdvertiser();
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSaving(true);

      await updateAdvertiser(id, form);

      router.push(`/advertisers/${id}`);
    } catch (error) {
      console.error("Failed to update advertiser:", error);

      alert(
        error.message || "Failed to update advertiser."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-full bg-slate-50 p-8">
        <div className="py-20 text-center text-slate-500">
          Loading advertiser...
        </div>
      </main>
    );
  }

  if (!form) {
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
      <Link
        href={`/advertisers/${id}`}
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Advertiser
      </Link>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Building2 size={23} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Advertiser
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Update advertiser configuration and tracking settings.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-6"
      >
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-semibold text-slate-900">
              Advertiser Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <Field
              label="Advertiser Name"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              required
            />

            <Field
              label="Company Name"
              name="companyName"
              value={form.companyName || ""}
              onChange={handleChange}
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email || ""}
              onChange={handleChange}
            />

            <Field
              label="Phone"
              name="phone"
              value={form.phone || ""}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-semibold text-slate-900">
              Tracking Configuration
            </h2>
          </div>

          <div className="space-y-5 p-6">
            <Field
              label="Destination URL"
              name="destinationUrl"
              type="url"
              value={form.destinationUrl || ""}
              onChange={handleChange}
              required
            />

            <Field
              label="Postback URL"
              name="postbackUrl"
              type="url"
              value={form.postbackUrl || ""}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-semibold text-slate-900">
              Account Settings
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Currency
              </label>

              <select
                name="currency"
                value={form.currency || "INR"}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="INR">INR — Indian Rupee</option>
                <option value="USD">USD — US Dollar</option>
                <option value="EUR">EUR — Euro</option>
                <option value="GBP">GBP — British Pound</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={form.status || "ACTIVE"}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 pb-8">
          <Link
            href={`/advertisers/${id}`}
            className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={17} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500"
      />
    </div>
  );
}
