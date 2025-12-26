import axios from "axios";
import Cookies from "js-cookie";
import fakerAdapter from "@/faker/fakerAdapter";

const BASE_URL =
  process.env.NEXT_PUBLIC_USE_FAKE_API === "true"
    ? process.env.NEXT_PUBLIC_FAKE_API
    : process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  adapter:
    process.env.NEXT_PUBLIC_USE_FAKE_API === "true"
      ? fakerAdapter
      : undefined,
});

// Add auth token
api.interceptors.request.use((config) => {
  const cookie = Cookies.get("seiyuudb_auth");
  if (cookie) {
    try {
      const { token } = JSON.parse(cookie);
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
  }
  return config;
});

// Auto redirect on 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/logout";
    }
    return Promise.reject(error);
  }
);

export default api;
