"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  UserPlus,
  Loader2,
} from "lucide-react";

import styles from "./page.module.css";
import { API_BASE_URL } from "@/config/api";

export default function CreatePublisherPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    website: "",
    postbackUrl: "",
    status: "ACTIVE",
    paymentMethod: "",
    paymentDetails: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!form.firstName.trim()) {
      setError("First name is required.");
      return;
    }

    if (!form.lastName.trim()) {
      setError("Last name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/publishers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          companyName: form.companyName.trim() || null,
          email: form.email.trim(),
          phone: form.phone.trim() || null,
          website: form.website.trim() || null,
          postbackUrl: form.postbackUrl.trim() || null,
          status: form.status,
          paymentMethod: form.paymentMethod || null,
          paymentDetails: form.paymentDetails.trim() || null,
        }),
      });

      const text = await response.text();

      let data = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Server returned an invalid response.");
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create publisher."
        );
      }

      router.push("/publishers");
      router.refresh();
    } catch (err) {
      console.error("Create publisher error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <Link href="/publishers" className={styles.back}>
          <ArrowLeft size={17} />
          Back to Publishers
        </Link>

        <div className={styles.title}>
          <div className={styles.titleIcon}>
            <UserPlus size={23} />
          </div>

          <div>
            <h1>Create Publisher</h1>
            <p>
              Add a publisher to your TrackFlow workspace.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Personal Information</h2>
            <p>
              Basic information about the publisher.
            </p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.grid}>
              <div className={styles.field}>
                <label>
                  First Name <span>*</span>
                </label>

                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Jaya"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>
                  Last Name <span>*</span>
                </label>

                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Narasimha"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Company Name</label>

                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Ownadz"
                />
              </div>

              <div className={styles.field}>
                <label>
                  Email <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="publisher@example.com"
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Phone</label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                />
              </div>

              <div className={styles.field}>
                <label>Website</label>

                <input
                  type="url"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Tracking & Account</h2>
            <p>
              Configure how this publisher will work with campaigns.
            </p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.field}>
              <label>Postback URL</label>

              <input
                name="postbackUrl"
                value={form.postbackUrl}
                onChange={handleChange}
                placeholder="https://publisher.com/postback?click_id={click_id}"
              />

              <small>
                Optional conversion postback endpoint.
              </small>
            </div>

            <div className={styles.grid}>
              <div className={styles.field}>
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="PENDING">Pending</option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Payment Method</label>

                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="">
                    Select payment method
                  </option>
                  <option value="BANK_TRANSFER">
                    Bank Transfer
                  </option>
                  <option value="UPI">UPI</option>
                  <option value="PAYPAL">PayPal</option>
                  <option value="PAYONEER">Payoneer</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>

            <div className={styles.field}>
              <label>Payment Details</label>

              <textarea
                name="paymentDetails"
                value={form.paymentDetails}
                onChange={handleChange}
                placeholder="Enter payment details..."
                rows={4}
              />

              <small>
                Store payment information required for publisher payouts.
              </small>
            </div>
          </div>
        </section>

        <div className={styles.footer}>
          <Link
            href="/publishers"
            className={styles.cancel}
          >
            Cancel
          </Link>

          <button
            type="submit"
            className={styles.submit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className={styles.spinner}
                />
                Creating...
              </>
            ) : (
              <>
                <Save size={17} />
                Create Publisher
              </>
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
