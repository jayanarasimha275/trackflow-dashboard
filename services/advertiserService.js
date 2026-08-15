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

export async function getAdvertisers() {
  return apiRequest("/advertisers");
}

export async function getAdvertiser(id) {
  return apiRequest(`/advertisers/${id}`);
}

export async function createAdvertiser(data) {
  return apiRequest("/advertisers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateAdvertiser(id, data) {
  return apiRequest(`/advertisers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAdvertiser(id) {
  return apiRequest(`/advertisers/${id}`, {
    method: "DELETE",
  });
}
