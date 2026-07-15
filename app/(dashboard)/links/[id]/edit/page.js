"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useLinks } from "@/context/LinksContext";

export default function EditLinkPage({ params }) {
    const { id } = use(params);

    const router = useRouter();

    const {
        getLink,
        updateLink,
        loaded,
    } = useLinks();

    const [linkData, setLinkData] = useState(null);

    useEffect(() => {
        if (!loaded) {
            return;
        }

        const link = getLink(id);

        setLinkData(
            link
                ? {
                    ...link,
                    slug:
                        link.slug ??
                        link.alias ??
                        link.shortUrl?.split("/").pop() ??
                        "",
                }
                : null
        );
    }, [id, loaded, getLink]);

    function handleChange(event) {
        const { name, value } = event.target;

        setLinkData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const cleanSlug = linkData.slug
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        updateLink(id, {
            title: linkData.title.trim(),
            destination: linkData.destination.trim(),
            slug: cleanSlug,
            alias: cleanSlug,
            shortUrl: `trackflow.io/${cleanSlug}`,
        });

        router.push(`/links/${id}`);
    }

    if (!loaded) {
        return (
            <div style={{ padding: "30px", color: "var(--text-light)" }}>
                Loading link...
            </div>
        );
    }

    if (!linkData) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Link not found</h2>

                <Link
                    href="/links"
                    style={{
                        display: "inline-block",
                        marginTop: "12px",
                        color: "var(--primary)",
                    }}
                >
                    Back to links
                </Link>
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: "760px",
            }}
        >
            <Link
                href={`/links/${id}`}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "30px",
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "13px",
                }}
            >
                <ArrowLeft size={16} />

                Back to link
            </Link>

            <div
                style={{
                    marginBottom: "30px",
                }}
            >
                <p
                    style={{
                        margin: "0 0 8px",
                        color: "#3b82f6",
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "1.5px",
                    }}
                >
                    LINK MANAGEMENT
                </p>

                <h1
                    style={{
                        margin: "0 0 8px",
                        fontSize: "32px",
                    }}
                >
                    Edit link
                </h1>

                <p
                    style={{
                        margin: 0,
                        color: "#94a3b8",
                        fontSize: "13px",
                    }}
                >
                    Update your tracked link information.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                style={{
                    padding: "28px",
                    background: "#111827",
                    border: "1px solid #293750",
                    borderRadius: "16px",
                }}
            >
                <div
                    style={{
                        marginBottom: "22px",
                    }}
                >
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        Link title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={linkData.title || ""}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            height: "44px",
                            padding: "0 14px",
                            color: "#f8fafc",
                            background: "#0f172a",
                            border: "1px solid #293750",
                            borderRadius: "10px",
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <div
                    style={{
                        marginBottom: "22px",
                    }}
                >
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        Destination URL
                    </label>

                    <input
                        type="url"
                        name="destination"
                        value={linkData.destination || ""}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            height: "44px",
                            padding: "0 14px",
                            color: "#f8fafc",
                            background: "#0f172a",
                            border: "1px solid #293750",
                            borderRadius: "10px",
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <div
                    style={{
                        marginBottom: "28px",
                    }}
                >
                    <label
                        style={{
                            display: "block",
                            marginBottom: "8px",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        Short link slug
                    </label>

                    <input
                        type="text"
                        name="slug"
                        value={linkData.slug ?? ""}
                        onChange={handleChange}
                        required
                        style={{
                            width: "100%",
                            height: "44px",
                            padding: "0 14px",
                            color: "#f8fafc",
                            background: "#0f172a",
                            border: "1px solid #293750",
                            borderRadius: "10px",
                            outline: "none",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        height: "42px",
                        padding: "0 18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "white",
                        background: "#3b82f6",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                    }}
                >
                    <Save size={16} />

                    Save changes
                </button>
            </form>
        </div>
    );
}