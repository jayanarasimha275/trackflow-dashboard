const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("API Error:", data);

    throw new Error(
      data.message ||
      JSON.stringify(data) ||
      `HTTP ${response.status}`
    );
  }

  return data;
}

export async function getOffers() {
  return apiRequest("/offers");
}

export async function getOffer(id) {
  return apiRequest(`/offers/${id}`);
}

export async function createOffer(data) {
  return apiRequest("/offers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateOffer(id, data) {
  return apiRequest(`/offers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteOffer(id) {
  return apiRequest(`/offers/${id}`, {
    method: "DELETE",
  });
}
