import { Product } from '@prisma/client';
export declare const createProduct: (product: Product) => Promise<Product>;
export declare const getProducts: (page: number, rowsPerPage: number) => Promise<{
    products: {
        name: string;
        id: number;
        price: number;
        quantity: number;
        description: string;
        userId: number;
        category: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    totalCount: number;
}>;
export declare const getProductsByKeyword: (keyword: string) => Promise<Product[]>;
export declare const updateProduct: (id: number, data: Product) => Promise<Product>;
export declare const deleteProduct: (id: number) => Promise<Product>;
export declare const getProductById: (id: number) => Promise<Product>;
