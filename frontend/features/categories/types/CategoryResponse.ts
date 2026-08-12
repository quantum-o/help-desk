export type CategoryResponse = {
    id: number;
    name: string;
    passive: boolean;
    children: CategoryResponse[];
};