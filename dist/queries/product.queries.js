"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.deleteProduct = exports.updateProduct = exports.getProductsByKeyword = exports.getProducts = exports.createProduct = void 0;
const database_1 = require("../database");
const db = (0, database_1.getDbInstance)();
const createProduct = async (product) => {
    try {
        const newProduct = await db.product.create({ data: product });
        return newProduct;
    }
    catch (error) {
        throw new Error('Failed to create product');
    }
};
exports.createProduct = createProduct;
const getProducts = async (page, rowsPerPage) => {
    try {
        const skip = (page - 1) * rowsPerPage;
        const productsTotal = await db.product.findMany();
        const products = await db.product.findMany({
            skip,
            take: rowsPerPage,
        });
        const totalCount = productsTotal.length;
        return { products, totalCount };
    }
    catch (error) {
        throw new Error('Failed to fetch products');
    }
};
exports.getProducts = getProducts;
const getProductsByKeyword = async (keyword) => {
    try {
        const products = await db.product.findMany({
            where: {
                OR: [
                    { name: { contains: keyword } },
                    { description: { contains: keyword } },
                    { category: { contains: keyword } },
                ],
            },
        });
        return products;
    }
    catch (error) {
        throw new Error('Failed to fetch products by keyword');
    }
};
exports.getProductsByKeyword = getProductsByKeyword;
const updateProduct = async (id, data) => {
    try {
        const updatedProduct = await db.product.update({
            where: { id },
            data,
        });
        return updatedProduct;
    }
    catch (error) {
        console.log('error', error.message);
        throw new Error('Failed to update product');
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await db.product.delete({
            where: { id },
        });
        return deletedProduct;
    }
    catch (error) {
        throw new Error('Failed to delete product');
    }
};
exports.deleteProduct = deleteProduct;
const getProductById = async (id) => {
    try {
        const product = await db.product.findUnique({ where: { id } });
        return product;
    }
    catch (error) {
        throw new Error('Failed to fetch product by id');
    }
};
exports.getProductById = getProductById;
//# sourceMappingURL=product.queries.js.map