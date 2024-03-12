import axios from "axios";
import { BASE_URL } from "../constants/Urls";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
});

export default axiosInstance;