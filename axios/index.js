import axios from "axios";
import { BASE_URL } from "../constants/Urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
});

axiosInstance.interceptors.request.use(async function (config) {
  const data = await AsyncStorage.getItem("token");
  config.headers["Authorization"] = !!data ? data : "";
  return config;
});

export default axiosInstance;