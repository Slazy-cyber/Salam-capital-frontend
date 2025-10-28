import axios from "axios";

// Remote server (production). Use this if backend routes are mounted at root (no `/api` prefix).
const API = axios.create({
  baseURL: "https://salaam-capital-server.onrender.com/api",
});

// Local development server (example) — uncomment to use locally
// const API = axios.create({
//   baseURL: "http://localhost:7654/api",
// });
API.interceptors.request.use((req) => {
  // Log full request URL for debugging (helps track 404s)
  try {
    const base = req.baseURL || API.defaults.baseURL || "";
    const fullUrl = base + (req.url || "");
    console.debug("[API request]", (req.method || "GET").toUpperCase(), fullUrl);
  } catch (e) {
    // ignore logging errors
  }

  if (req.url !== "/signup") {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = token;
  }
  return req;
});

API.interceptors.response.use(
  (res) => {
    try {
      const cfg = res.config || {};
      const base = cfg.baseURL || API.defaults.baseURL || "";
      const fullUrl = base + (cfg.url || "");
      console.debug("[API response]", res.status, fullUrl);
    } catch (e) {}
    return res;
  },
  (error) => {
    try {
      const cfg = error?.response?.config || error?.config || {};
      const base = cfg.baseURL || API.defaults.baseURL || "";
      const fullUrl = base + (cfg.url || "");
      console.debug("[API response error]", error?.response?.status, fullUrl);
    } catch (e) {}
    return Promise.reject(error);
  }
);

export default API;
