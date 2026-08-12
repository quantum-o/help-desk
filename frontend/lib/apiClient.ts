import { refresh } from "@/features/auth/api/refresh";
import useAuthStore from "@/features/auth/auth-store";
import axios from "axios";

const BASE_URL = "http://localhost:8080";

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

const refreshClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (error.config.url?.includes("/auth/refresh") || error.config._skipRetry) {
            useAuthStore.getState().logout();
            return Promise.reject(error);
        }

        try {
            const refreshResponse = await refresh(refreshClient);

            if (!refreshResponse.success) {
                useAuthStore.getState().logout();
                return Promise.reject(error);
            }

            useAuthStore.getState().login(refreshResponse.data.accessToken);

            error.config.headers.Authorization =
                `Bearer ${refreshResponse.data.accessToken}`;

            error.config._skipRetry = true;
            return axiosClient.request(error.config);
        } catch {
            useAuthStore.getState().logout();
            return Promise.reject(error);
        }
    }
);

export default axiosClient;