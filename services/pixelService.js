import request from "./api";

export const getPixelByLinkId = async (linkId) => {
  return request(`/pixels/${linkId}`);
};

export const createPixel = async (data) => {
  return request("/pixels", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updatePixel = async (linkId, data) => {
  return request(`/pixels/${linkId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deletePixel = async (linkId) => {
  return request(`/pixels/${linkId}`, {
    method: "DELETE",
  });
};
