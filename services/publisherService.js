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

export async function getPublishers() {
  return apiRequest("/publishers");
}

export async function getPublisher(id) {
  return apiRequest(`/publishers/${id}`);
}

export async function createPublisher(data) {
  return apiRequest("/publishers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updatePublisher(id, data) {
  return apiRequest(`/publishers/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deletePublisher(id) {
  return apiRequest(`/publishers/${id}`, {
    method: "DELETE",
  });
}
