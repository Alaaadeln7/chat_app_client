import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://gymboy.onrender.com/api/",
  withCredentials: true,
});
