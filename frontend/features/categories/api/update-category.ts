import axiosClient from "@/lib/apiClient";

export async function updateCategory({ categoryId, name, parent, passive }: { categoryId: number, name?: string, parent?: number, passive?: boolean }) {
    await axiosClient.patch(`/categories/${categoryId}`, { name, parent, passive });
    return;
}