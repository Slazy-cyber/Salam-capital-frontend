import axios from "axios";

// const API = axios.create({
//   baseURL: "https://salaam-capital-server.onrender.com/api/",
// });

const API = axios.create({
  baseURL: "http://localhost:7654/api",
});
API.interceptors.request.use((req) => {
  if (req.url !== "/signup") {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = token;
  }
  return req;
});

export default API;
