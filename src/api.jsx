import axios from "axios";


const API = axios.create({
  baseURL: "https://salaam-capital-server.onrender.com/api",
});


// const API = axios.create({
//   baseURL: "http://localhost:7654/api",
// });


API.interceptors.request.use((req) => {
 
  try {
    const base = req.baseURL || API.defaults.baseURL || "";
    const fullUrl = base + (req.url || "");
    console.debug("[API request]", (req.method || "GET").toUpperCase(), fullUrl);
  } catch (e) {
 
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
