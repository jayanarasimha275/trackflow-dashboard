"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchAllLinks } from "@/services/linksService";
import {
  getPixelByLinkId,
  createPixel,
  updatePixel,
  deletePixel,
} from "@/services/pixelService";

export default function PixelsPage() {
  const [links, setLinks] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState("");
  const [pixelName, setPixelName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [pixelType, setPixelType] = useState("JAVASCRIPT");
  const [pixelCode, setPixelCode] = useState("");
  const [hasPixel, setHasPixel] = useState(false);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const response = await fetchAllLinks();
      setLinks(response.data || []);
    } catch (error) {
      console.error("Failed to load links:", error);
    }
  };

  const loadPixel = async (linkId) => {
    if (!linkId) {
      setPixelName("");
      setPixelCode("");
      setIsActive(true);
      setHasPixel(false);
      return;
    }

    try {
      const response = await getPixelByLinkId(linkId);
      console.log("Pixel Response:", response);
      console.log("Pixel Data:", response.data);
      const pixel = response.data;

      setPixelName(pixel.pixelName);
      setPixelType(pixel.pixelType);
      setPixelCode(pixel.pixelCode);
      setIsActive(pixel.isActive);
      setHasPixel(true);
    } catch (error) {
      setPixelName("");
      setPixelCode("");
      setIsActive(true);
      setHasPixel(false);
    }
  };

  const savePixel = async () => {
    if (!selectedOffer) {
      alert("Please select an offer.");
      return;
    }

    if (!pixelName.trim()) {
      alert("Please enter a pixel name.");
      return;
    }

    try {
      if (hasPixel) {
        await updatePixel(selectedOffer, {
          pixelName,
          pixelType,
          isActive,
        });

        alert("Pixel updated successfully.");
      } else {
        const response = await createPixel({
          linkId: Number(selectedOffer),
          pixelName,
          pixelType,
          isActive,
        });

        alert("Pixel created successfully.");

        setPixelCode(response.data.pixelCode);
        setHasPixel(true);
      }

      await loadPixel(selectedOffer);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  const removePixel = async () => {
    if (!selectedOffer) return;

    try {
      await deletePixel(selectedOffer);

      alert("Pixel deleted successfully.");

      setPixelName("");
      setPixelCode("");
      setIsActive(true);
      setHasPixel(false);
    } catch (error) {
      console.error(error);
      alert("Failed to delete pixel.");
    }
  };

  const copyPixelCode = async () => {
    if (!pixelCode) {
      alert("No pixel code available.");
      return;
    }

    try {
      await navigator.clipboard.writeText(pixelCode);
      alert("Pixel code copied!");
    } catch (error) {
      alert("Failed to copy pixel code.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pixel Tracking</h1>

      <div className={styles.card}>
        <div className={styles.group}>
          <label className={styles.label}>Offer</label>

          <select
            className={styles.select}
            value={selectedOffer}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedOffer(value);
              loadPixel(value);
            }}
          >
            <option value="">Select Offer</option>

            {links.map((link) => (
              <option key={link.id} value={link.id}>
                {link.title}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Pixel Name</label>

          <input
            className={styles.input}
            type="text"
            placeholder="Meta Pixel"
            value={pixelName}
            onChange={(e) => setPixelName(e.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label className={styles.label}>Pixel Type</label>

          <select
            className={styles.select}
            value={pixelType}
            onChange={(e) => setPixelType(e.target.value)}
          >
            <option value="JAVASCRIPT">JavaScript Pixel</option>
            <option value="IMAGE">Image Pixel</option>
            <option value="POSTBACK">Postback URL</option>
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active
          </label>
        </div>

        <div className={styles.buttonRow}>
          <button
            className={styles.primaryBtn}
            onClick={savePixel}
          >
            {hasPixel ? "Update Pixel" : "Create Pixel"}
          </button>

          <button
            className={styles.secondaryBtn}
            onClick={copyPixelCode}
          >
            Copy Pixel Code
          </button>

          <button
            className={styles.dangerBtn}
            onClick={removePixel}
          >
            Delete Pixel
          </button>
        </div>

        <hr />

        <div className={styles.group}>
          <label className={styles.label}>Pixel Code</label>

          <textarea
            className={styles.textarea}
            rows={6}
            value={pixelCode}
            readOnly
            placeholder="Pixel code will appear here..."
          />
        </div>
      </div>
    </div>
  );
}
