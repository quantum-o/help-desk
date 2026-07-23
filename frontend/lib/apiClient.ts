import { refresh } from "@/features/auth/api/refresh";
import useAuthStore from "@/features/auth/auth-store";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosClient.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log("Requesting with config:", config);
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            refresh().then((data: ApiResponse<{ accessToken: string }>) => {
                if (data.success) {
                    useAuthStore.getState().login(data.data.accessToken);
                    error.config.headers.Authorization = `Bearer ${data.data.accessToken}`;
                    return axiosClient.request(error.config);
                }
            });
        }
        return Promise.reject(error);
    }
);

export default axiosClient;