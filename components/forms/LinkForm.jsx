"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Type, Tag, ArrowRight, Loader2 } from "lucide-react";

import { useLinks } from "@/context/LinksContext";

export default function LinkForm() {
  const router = useRouter();

  const { createLink, links } = useLinks();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    alias: "",
    source: "",
    medium: "",
    campaign: "",
    expiration: "",
  });

  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  }

  function handleAliasChange(event) {
    const value = event.target.value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setFormData((currentData) => ({
      ...currentData,
      alias: value,
    }));

    setError("");
  }

  function validateForm() {
    if (!formData.title.trim()) {
      return "Link title is required.";
    }

    if (!formData.destination.trim()) {
      return "Destination URL is required.";
    }

    try {
      const url = new URL(formData.destination);

      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return "Enter a valid HTTP or HTTPS URL.";
      }
    } catch {
      return "Enter a valid destination URL.";
    }

    if (formData.alias.trim()) {
      const aliasExists = links.some(
        (link) => link.alias?.toLowerCase() === formData.alias.toLowerCase(),
      );

      if (aliasExists) {
        return "This custom alias is already being used.";
      }
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setCreating(true);

    try {
      await createLink({
        title: formData.title.trim(),
        destination: formData.destination.trim(),
        alias: formData.alias.trim(),
        source: formData.source.trim(),
        medium: formData.medium.trim(),
        campaign: formData.campaign.trim(),
        expiration: formData.expiration,
      });

      router.push("/links");
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to create link.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <form className="link-form" onSubmit={handleSubmit}>
      <section className="form-card">
        <div className="form-card-header">
          <div className="header-icon">
            <Link2 size={20} />
          </div>

          <div>
            <h2>Link details</h2>

            <p>Enter the destination and tracking link information.</p>
          </div>
        </div>

        <div className="form-fields">
          <div className="form-group">
            <label htmlFor="title">
              Link title
              <span>*</span>
            </label>

            <div className="input-wrapper">
              <Type size={18} />

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Portfolio Website"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="destination">
              Destination URL
              <span>*</span>
            </label>

            <div className="input-wrapper">
              <Link2 size={18} />

              <input
                id="destination"
                name="destination"
                type="url"
                value={formData.destination}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>

            <small>Visitors will be redirected to this URL.</small>
          </div>

          <div className="form-group">
            <label htmlFor="alias">Custom alias</label>

            <div className="alias-input">
              <span>trackflow.io/</span>

              <input
                id="alias"
                name="alias"
                type="text"
                value={formData.alias}
                onChange={handleAliasChange}
                placeholder="my-link"
              />
            </div>

            <small>Leave empty to generate an alias automatically.</small>
          </div>
        </div>
      </section>

      <section className="form-card">
        <div className="form-card-header">
          <div className="header-icon">
            <Tag size={20} />
          </div>

          <div>
            <h2>Campaign tracking</h2>

            <p>Optional tracking information for campaign analytics.</p>
          </div>
        </div>

        <div className="tracking-grid">
          <div className="form-group">
            <label htmlFor="source">Source</label>

            <input
              id="source"
              name="source"
              type="text"
              value={formData.source}
              onChange={handleChange}
              placeholder="instagram"
            />
          </div>

          <div className="form-group">
            <label htmlFor="medium">Medium</label>

            <input
              id="medium"
              name="medium"
              type="text"
              value={formData.medium}
              onChange={handleChange}
              placeholder="social"
            />
          </div>

          <div className="form-group">
            <label htmlFor="campaign">Campaign</label>

            <input
              id="campaign"
              name="campaign"
              type="text"
              value={formData.campaign}
              onChange={handleChange}
              placeholder="portfolio-launch"
            />
          </div>
        </div>
      </section>

      {error && <div className="form-error">{error}</div>}

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={() => router.push("/links")}
          disabled={creating}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="create-link-button"
          disabled={creating}
        >
          {creating ? (
            <>
              <Loader2 size={18} className="spinner" />
              Creating link...
            </>
          ) : (
            <>
              Create tracked link
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>

      <style>{`
        .link-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-card {
          overflow: hidden;

          background: var(--surface);

          border: 1px solid var(--border);
          border-radius: 18px;
        }

        .form-card-header {
          padding: 20px 22px;

          display: flex;
          align-items: center;
          gap: 13px;

          border-bottom: 1px solid var(--border);
        }

        .header-icon {
          width: 42px;
          height: 42px;

          display: grid;
          place-items: center;

          color: var(--primary);
          background: rgba(59, 130, 246, 0.12);

          border-radius: 11px;
        }

        .form-card-header h2 {
          margin: 0 0 5px;

          color: var(--text);

          font-size: 15px;
        }

        .form-card-header p {
          margin: 0;

          color: var(--text-light);

          font-size: 11px;
        }

        .form-fields {
          padding: 24px 22px;

          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .form-group label {
          color: var(--text);

          font-size: 12px;
          font-weight: 600;
        }

        .form-group label span {
          margin-left: 4px;

          color: #ef4444;
        }

        .form-group small {
          color: var(--text-light);

          font-size: 10px;
        }

        .input-wrapper {
          height: 45px;
          padding: 0 14px;

          display: flex;
          align-items: center;
          gap: 10px;

          color: var(--text-light);
          background: var(--bg);

          border: 1px solid var(--border);
          border-radius: 11px;

          transition: border-color var(--transition);
        }

        .input-wrapper:focus-within {
          border-color: var(--primary);
        }

        .input-wrapper input {
          width: 100%;
          height: 100%;

          color: var(--text);
          background: transparent;

          border: none;
          outline: none;
        }

        .alias-input {
          height: 45px;

          display: flex;
          align-items: center;

          background: var(--bg);

          border: 1px solid var(--border);
          border-radius: 11px;

          overflow: hidden;

          transition: border-color var(--transition);
        }

        .alias-input:focus-within {
          border-color: var(--primary);
        }

        .alias-input span {
          height: 100%;
          padding: 0 14px;

          display: flex;
          align-items: center;

          color: var(--text-light);
          background: rgba(255, 255, 255, 0.025);

          border-right: 1px solid var(--border);

          font-size: 12px;
        }

        .alias-input input {
          width: 100%;
          height: 100%;
          padding: 0 14px;

          color: var(--text);
          background: transparent;

          border: none;
          outline: none;
        }

        .tracking-grid {
          padding: 24px 22px;

          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .tracking-grid input {
          height: 45px;
          padding: 0 14px;

          color: var(--text);
          background: var(--bg);

          border: 1px solid var(--border);
          border-radius: 11px;
          outline: none;

          transition: border-color var(--transition);
        }

        .tracking-grid input:focus {
          border-color: var(--primary);
        }

        .form-error {
          padding: 13px 15px;

          color: #f87171;
          background: rgba(239, 68, 68, 0.08);

          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 11px;

          font-size: 12px;
        }

        .form-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .cancel-button,
        .create-link-button {
          height: 44px;
          padding: 0 17px;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          border-radius: 11px;

          font-size: 12px;
          font-weight: 600;

          transition:
            background var(--transition),
            transform var(--transition);
        }

        .cancel-button {
          color: var(--text);
          background: var(--surface);

          border: 1px solid var(--border);
        }

        .cancel-button:hover {
          background: rgba(255, 255, 255, 0.04);
        }

        .create-link-button {
          color: white;
          background: var(--primary);

          border: none;
        }

        .create-link-button:hover {
          background: var(--primary-hover);

          transform: translateY(-1px);
        }

        .cancel-button:disabled,
        .create-link-button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        .spinner {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 760px) {
          .tracking-grid {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column-reverse;
          }

          .cancel-button,
          .create-link-button {
            width: 100%;
          }
        }
      `}</style>
    </form>
  );
}
