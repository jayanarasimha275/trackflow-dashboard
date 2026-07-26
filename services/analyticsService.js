import request from "./api";

export async function getLinkAnalytics(linkId) {
  return request(`/analytics/${linkId}`);
}
