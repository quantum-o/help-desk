import axiosClient from "@/lib/apiClient";

export async function logout() {
    const response = await axiosClient.post("/logout");
    return response.data;
}