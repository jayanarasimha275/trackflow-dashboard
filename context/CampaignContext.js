"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getCampaigns as fetchAllCampaigns,
  getCampaign as fetchCampaignAPI,
  createCampaign as createCampaignAPI,
  updateCampaign as updateCampaignAPI,
  deleteCampaign as deleteCampaignAPI,
} from "@/services/campaignService";
const CampaignContext = createContext(null);

export function CampaignProvider({ children }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loaded, setLoaded] = useState(false);

  async function fetchCampaigns() {
    try {
      const result = await fetchAllCampaigns();

      if (result.success) {
        setCampaigns(result.data);
      }
    } catch (error) {
      console.error("❌ Failed to fetch campaigns:", error);
    } finally {
      setLoaded(true);
    }
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function createCampaign(data) {
    const result = await createCampaignAPI(data);

    await fetchCampaigns();

    return result;
  }

  async function updateCampaign(id, data) {
    const result = await updateCampaignAPI(id, data);

    await fetchCampaigns();

    return result;
  }

  async function deleteCampaign(id) {
    const result = await deleteCampaignAPI(id);

    await fetchCampaigns();

    return result;
  }

  const getCampaign = useCallback(async (id) => {
    const result = await fetchCampaignAPI(id);

    return result.data || result;
  }, []);

  const value = {
    campaigns,
    loaded,
    fetchCampaigns,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    getCampaign,
  };

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  const context = useContext(CampaignContext);

  if (!context) {
    throw new Error(
      "useCampaigns must be used inside CampaignProvider"
    );
  }

  return context;
}
