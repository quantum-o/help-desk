export type Category = {
    id: number;
    name: string;
    parent: Category | null;
    children: Category[];
    createdAt: string;
    updatedAt: string;
};