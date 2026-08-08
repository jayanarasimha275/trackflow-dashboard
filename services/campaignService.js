import request from "./api";

const BASE = "/campaigns";

export const getCampaigns = () => {
  return request(BASE);
};

export const getCampaign = (id) => {
  return request(`${BASE}/${id}`);
};

export const createCampaign = (data) => {
  return request(BASE, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateCampaign = (id, data) => {
  return request(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteCampaign = (id) => {
  return request(`${BASE}/${id}`, {
    method: "DELETE",
  });
};
