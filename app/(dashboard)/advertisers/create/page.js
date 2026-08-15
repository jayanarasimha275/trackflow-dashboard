"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Building2,
} from "lucide-react";

import { createAdvertiser } from "@/services/advertiserService";

export default function CreateAdvertiserPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    destinationUrl: "",
    postbackUrl: "",
    currency: "INR",
    status: "ACTIVE",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert("Advertiser name is required.");
      return;
    }

    if (!form.destinationUrl.trim()) {
      alert("Destination URL is required.");
      return;
    }

    try {
      setLoading(true);

      await createAdvertiser({
        name: form.name.trim(),
        companyName: form.companyName.trim() || null,
        email: form.email.trim() || null,
        phone: form.phone.trim() || null,
        destinationUrl: form.destinationUrl.trim(),
        postbackUrl: form.postbackUrl.trim() || null,
        currency: form.currency,
        status: form.status,
      });

      router.push("/advertisers");
    } catch (error) {
      console.error(
        "Failed to create advertiser:",
        error
      );

      alert(
        error.message ||
          "Failed to create advertiser."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-full bg-slate-50 p-8">
      <Link
        href="/advertisers"
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Back to Advertisers
      </Link>

      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Building2 size={23} />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Create Advertiser
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Add an advertiser and configure its
            tracking destination.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl space-y-6"
      >
        {/* Advertiser Information */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-semibold text-slate-900">
              Advertiser Information
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Basic information about the advertiser.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <Field
              label="Advertiser Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Amazon"
              required
            />

            <Field
              label="Company Name"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company name"
            />

            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="advertiser@example.com"
            />

            <Field
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91..."
            />
          </div>
        </section>

        {/* Tracking Configuration */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-semibold text-slate-900">
              Tracking Configuration
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure where advertiser traffic should
              be sent.
            </p>
          </div>

          <div className="space-y-5 p-6">
            <Field
              label="Destination URL"
              name="destinationUrl"
              type="url"
              value={form.destinationUrl}
              onChange={handleChange}
              placeholder="https://example.com/landing-page"
              required
            />

            <Field
              label="Postback URL"
              name="postbackUrl"
              type="url"
              value={form.postbackUrl}
              onChange={handleChange}
              placeholder="https://example.com/postback"
            />
          </div>
        </section>

        {/* Account Settings */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="font-semibold text-slate-900">
              Account Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure advertiser status and currency.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Currency
              </label>

              <select
                name="currency"
                value={form.currency}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="INR">
                  INR — Indian Rupee
                </option>

                <option value="USD">
                  USD — US Dollar
                </option>

                <option value="EUR">
                  EUR — Euro
                </option>

                <option value="GBP">
                  GBP — British Pound
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="ACTIVE">
                  Active
                </option>

                <option value="INACTIVE">
                  Inactive
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end gap-3 pb-8">
          <Link
            href="/advertisers"
            className="inline-flex h-11 items-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-900 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Creating...
              </>
            ) : (
              <>
                <Save size={17} />
                Create Advertiser
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
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500"
      />
    </div>
  );
}
