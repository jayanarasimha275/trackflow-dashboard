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

      if (result.success) {
        const formattedLinks = result.data.map((link) => ({
          ...link,
        }));

        setLinks(formattedLinks);
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
