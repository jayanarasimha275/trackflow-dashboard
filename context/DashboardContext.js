"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getDashboardAnalytics } from "../services/dashboardService";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getDashboardAnalytics(token);

      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dashboard,
        loading,
        fetchDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
