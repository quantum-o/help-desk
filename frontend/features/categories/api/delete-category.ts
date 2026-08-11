import axiosClient from "@/lib/apiClient";

export async function deleteCategory({ categoryId }: { categoryId: number }) {
    await axiosClient.delete(`/categories/${categoryId}`);
    return;
}