import axios from "axios";
import useAuthStore from "../store/auth.store";

const instance = axios.create({
  baseURL: "http://localhost:8899/api",
});

// แนบ accessToken อัตโนมัติ
instance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
