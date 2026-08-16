import axios from "axios";

const api = axios.create({
  baseURL: "https://billgpt-backend-rarq.onrender.com",
});

export default api;