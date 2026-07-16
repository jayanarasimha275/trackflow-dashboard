"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  getLinks as fetchAllLinks,
  createLink as createLinkAPI,
  getLinkClicks,
} from "@/services/linksService";

const LinksContext = createContext(null);

export function LinksProvider({ children }) {
  const [links, setLinks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // ==========================
  // Fetch all links
  // ==========================
  async function fetchLinks() {
    try {
      const result = await fetchAllLinks();

      console.log("✅ API Result:", result);

      if (result.success) {
        const formattedLinks = result.data.map((link) => ({
          id: link.id,
          title: link.title,
          alias: link.shortCode,
          shortUrl: `trackflow.io/${link.shortCode}`,
          destination: link.destinationUrl,

          clicks: link.clicks,
          visitors: link.visitors,
          conversion: link.conversions,

          topCountry: link.topCountry,

          status: link.isActive ? "Active" : "Paused",

          devices: {
            mobile: link.mobileClicks || 0,
            desktop: link.desktopClicks || 0,
            tablet: link.tabletClicks || 0,
          },
        }));

        console.log("✅ Formatted Links:", formattedLinks);

        setLinks(formattedLinks);

        console.log("✅ State updated with:", formattedLinks.length, "links");
      } else {
        console.log("❌ API success = false", result);
      }
    } catch (error) {
      console.error("❌ Failed to fetch links:", error);
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  async function createLink(linkData) {
    const result = await createLinkAPI(linkData);

    console.log("✅ Created Link:", result);

    await fetchLinks();

    return result;
  }

  async function fetchLinkClicks(id) {
    return getLinkClicks(id);
  }

  const value = {
    links,
    loaded,
    createLink,
    fetchLinks,
    fetchLinkClicks,
  };

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);

  if (!context) {
    throw new Error("useLinks must be used inside LinksProvider");
  }

  return context;
}
