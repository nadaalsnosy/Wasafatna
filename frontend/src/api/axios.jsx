import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json" && "multipart/form-data",
  },
  withCredentials: true,
});
