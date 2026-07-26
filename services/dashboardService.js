const API_URL = "http://localhost:5000/api/dashboard";

export const getDashboardAnalytics = async (token) => {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();

  return data.data;
};
