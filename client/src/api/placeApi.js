import axiosClient from "./axiosClient";

const placeEndpoint = "places";

const placeApi = {
  getAll: () => axiosClient.get(placeEndpoint),
  getOne: (id) => axiosClient.get(`${placeEndpoint}/${id}`),
};

export default placeApi;
