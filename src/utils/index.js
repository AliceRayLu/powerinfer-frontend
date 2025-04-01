import axios from "axios";
import { API_BASE_URL } from "@/assets/constants";

const service = axios.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
})

export default service;