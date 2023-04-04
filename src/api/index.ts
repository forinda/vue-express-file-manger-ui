import axios from "axios";
const {mode} =import.meta.env
const BASE_URL ="https://file-manager-yuzw.onrender.com/api/v1"// "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
    "Access-Control-Allow-Credentials": "true",
  },
  withCredentials: true,
});

export default api;
