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

        setLinks(formattedLinks);
      }
    } catch (error) {
      console.error("Failed to fetch links:", error);
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  // ==========================
  // Create Link
  // ==========================
  async function createLink(linkData) {
    try {
      const result = await createLinkAPI(linkData);

      if (result.success) {
        await fetchLinks();
      }

      return result;
    } catch (error) {
      console.error("Failed to create link:", error);
      throw error;
    }
  }

  // ==========================
  // Fetch Click History
  // ==========================
  async function fetchLinkClicks(id) {
    return await getLinkClicks(id);
  }

  // ==========================
  // Get one link
  // ==========================
  function getLink(id) {
    return links.find((link) => String(link.id) === String(id));
  }

  // ==========================
  // Update (temporary)
  // ==========================
  function updateLink(id, updatedData) {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        String(link.id) === String(id)
          ? {
              ...link,
              ...updatedData,
            }
          : link,
      ),
    );
  }

  // ==========================
  // Delete (temporary)
  // ==========================
  function deleteLink(id) {
    setLinks((currentLinks) =>
      currentLinks.filter((link) => String(link.id) !== String(id)),
    );
  }

  return (
    <LinksContext.Provider
      value={{
        links,
        loaded,
        fetchLinks,
        fetchLinkClicks,
        createLink,
        getLink,
        updateLink,
        deleteLink,
      }}
    >
      {children}
    </LinksContext.Provider>
  );
}

export function useLinks() {
  const context = useContext(LinksContext);

  if (!context) {
    throw new Error("useLinks must be used inside LinksProvider");
  }

  return context;
}
