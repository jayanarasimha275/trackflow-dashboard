"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  fetchAllLinks,
  createLink as createLinkAPI,
  getLinkClicks,
  updateLink as updateLinkAPI,
  deleteLink as deleteLinkAPI,
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
      const token = localStorage.getItem("token");

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
    const token = localStorage.getItem("token");

    const result = await createLinkAPI(linkData, token);

    await fetchLinks();

    return result;
  }
  async function updateLink(id, data) {
    const token = localStorage.getItem("token");

    const result = await updateLinkAPI(id, data, token);

    await fetchLinks();

    return result;
  }
  async function deleteLink(id) {
    const token = localStorage.getItem("token");

    const result = await deleteLinkAPI(id, token);

    await fetchLinks();

    return result;
  }

  async function fetchLinkClicks(id) {
    return getLinkClicks(id);
  }

  function getLink(id) {
    return links.find((link) => String(link.id) === String(id));
  }
  const value = {
    links,
    loaded,
    createLink,
    updateLink,
    deleteLink,
    fetchLinks,
    fetchLinkClicks,
    getLink,
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
