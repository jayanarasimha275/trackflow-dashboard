import request from "./api";

export async function getLinks() {
  return request("/links");
}

export async function createLink(linkData) {
  return request("/links", {
    method: "POST",
    body: JSON.stringify({
      title: linkData.title,
      destinationUrl: linkData.destination,
      shortCode: linkData.alias,
    }),
  });
}

export async function getLink(id) {
  return request(`/links/${id}`);
}

// ==========================
// NEW
// ==========================
export async function getLinkClicks(id) {
  return request(`/links/${id}/clicks`);
}

export async function updateLink(id, data) {
  return request(`/links/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteLink(id) {
  return request(`/links/${id}`, {
    method: "DELETE",
  });
}
