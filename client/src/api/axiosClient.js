import axios from "axios";
import queryString from "query-string";
import { DEVELOPMENT_URL, PRODUCTION_URL, TOKEN_NAME } from "../utils/constant";

const isDevelopment = () => {
  return process.env.NODE_ENV === "development" ? true : false;
};

const baseUrl = isDevelopment ? DEVELOPMENT_URL : PRODUCTION_URL;
const getToken = () => localStorage.getItem(TOKEN_NAME);

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: {
    encode: queryString.parse,
    serialize: queryString.stringify,
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (err) => {
    if (!err.response) {
      return alert(err);
    }
    throw err.response;
  }
);

export default axiosClient;
