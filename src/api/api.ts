// src/api/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // change later
});

export default api;
