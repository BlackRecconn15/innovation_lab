import axios from "axios";

const api = axios.create({
    baseURL: "https://pythonbackend-s34c.onrender.com", // URL base de tu API
});

// Agrega el token en cada solicitud
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  

export default api;
