import axios from "axios";

const api = axios.create({
  baseURL:
    // process.env.REACT_APP_API_URL || "http://localhost:2024/api/gsjoana/v1", // NestJS backend URL
    import.meta.env.VITE_API_URL || "http://localhost:20255/api/vote/v1",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add auth token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("authToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && !isTokenExpired(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Handle the case where the token is expired (e.g., logout)
      localStorage.removeItem("access_token");
      // Redirect to login page
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Utility function to check if a token is expired
function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

export default api;
