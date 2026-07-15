import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import LinkForm from "@/components/forms/LinkForm";

export default function CreateLinkPage() {
  return (
    <div className="create-link-page">
      <Link href="/links" className="back-link">
        <ArrowLeft size={17} />
        Back to links
      </Link>

      <section className="create-header">
        <p>Create tracking link</p>

        <h1>Create a new link</h1>

        <span>
          Configure your destination, campaign tracking, and link
          expiration.
        </span>
      </section>

      <div className="form-container">
        <LinkForm />
      </div>

      <style>{`
        .create-link-page {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .back-link {
          width: fit-content;

          display: flex;
          align-items: center;
          gap: 7px;

          color: var(--text-light);
          font-size: 13px;

          transition: color var(--transition);
        }

        .back-link:hover {
          color: var(--primary);
        }

        .create-header {
          margin: 28px 0 30px;
        }

        .create-header > p {
          margin-bottom: 8px;

          color: var(--primary);
          font-size: 12px;
          font-weight: 700;

          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .create-header h1 {
          color: var(--text);
          font-size: clamp(28px, 3vw, 38px);
          line-height: 1.2;
        }

        .create-header span {
          margin-top: 10px;

          display: block;

          color: var(--text-light);
          font-size: 15px;
        }

        .form-container {
          padding-bottom: 50px;
        }
      `}</style>
    </div>
  );
}