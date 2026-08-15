"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  UserRound,
} from "lucide-react";

import styles from "./page.module.css";
import {
  getPublisher,
  updatePublisher,
} from "@/services/publisherService";

export default function EditPublisherPage() {
  const params = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.id) return;

    loadPublisher();
  }, [params?.id]);

  async function loadPublisher() {
    try {
      setLoading(true);
      setError("");

      const result = await getPublisher(params.id);

      const publisher = result.data || result;

      if (!publisher) {
        throw new Error("Publisher not found.");
      }

      setForm({
        firstName: publisher.firstName || "",
        lastName: publisher.lastName || "",
        companyName: publisher.companyName || "",
        email: publisher.email || "",
        phone: publisher.phone || "",
        website: publisher.website || "",
        postbackUrl: publisher.postbackUrl || "",
        status: publisher.status || "ACTIVE",
        paymentMethod: publisher.paymentMethod || "",
        paymentDetails: publisher.paymentDetails || "",
      });
    } catch (err) {
      console.error("Failed to load publisher:", err);
      setError(err.message || "Failed to load publisher.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

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
      setSaving(true);
      setError("");

      await updatePublisher(params.id, {
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
      });

      router.push("/publishers");
      router.refresh();
    } catch (err) {
      console.error("Failed to update publisher:", err);
      setError(err.message || "Failed to update publisher.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          <Loader2
            size={24}
            className={styles.spinner}
          />
          <span>Loading publisher...</span>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Link
        href="/publishers"
        className={styles.back}
      >
        <ArrowLeft size={17} />
        Back to Publishers
      </Link>

      <header className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.icon}>
            <UserRound size={22} />
          </div>

          <div>
            <h1>Edit Publisher</h1>

            <p>
              Update publisher information and account settings.
            </p>
          </div>
        </div>
      </header>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
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
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Company Name</label>

                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
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
                  required
                />
              </div>

              <div className={styles.field}>
                <label>Phone</label>

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.field}>
                <label>Website</label>

                <input
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Tracking</h2>

            <p>
              Configure postback settings for this publisher.
            </p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.field}>
              <label>Postback URL</label>

              <input
                name="postbackUrl"
                value={form.postbackUrl}
                onChange={handleChange}
                placeholder="https://publisher.example/postback"
              />
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Account Status</h2>

            <p>
              Control whether this publisher can receive traffic.
            </p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.field}>
              <label>Status</label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="ACTIVE">
                  Active
                </option>

                <option value="INACTIVE">
                  Inactive
                </option>

                <option value="SUSPENDED">
                  Suspended
                </option>
              </select>
            </div>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>Payment Information</h2>

            <p>
              Configure publisher payment details.
            </p>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.grid}>
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

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="PAYPAL">
                    PayPal
                  </option>
                </select>
              </div>

              <div className={styles.field}>
                <label>Payment Details</label>

                <input
                  name="paymentDetails"
                  value={form.paymentDetails}
                  onChange={handleChange}
                  placeholder="Payment account details"
                />
              </div>
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
            className={styles.save}
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className={styles.spinner}
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
