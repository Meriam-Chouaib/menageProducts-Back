"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByKeyword = exports.getProductById = exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const productQueries = __importStar(require("../queries/product.queries"));
const createProduct = async (data) => {
    try {
        const product = await productQueries.createProduct(data);
        return product;
    }
    catch (e) {
        console.log(e);
    }
};
exports.createProduct = createProduct;
const getProducts = async (filterFields) => {
    try {
        const { page, rowsPerPage } = filterFields;
        const { products, totalCount } = await productQueries.getProducts(page, rowsPerPage);
        return {
            products,
            nbPages: Math.ceil(totalCount / rowsPerPage),
            currentPage: Number(page),
        };
    }
    catch (e) {
        console.log(e);
    }
};
exports.getProducts = getProducts;
const getProductsByKeyword = async (keyword) => {
    try {
        const products = await productQueries.getProductsByKeyword(keyword);
        return products;
    }
    catch (e) {
        console.log(e);
    }
};
exports.getProductsByKeyword = getProductsByKeyword;
const updateProduct = async (data, id) => {
    try {
        const updatedProduct = await productQueries.updateProduct(id, data);
        return updatedProduct;
    }
    catch (e) {
        console.log(e);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (id) => {
    try {
        const deletedProduct = await productQueries.deleteProduct(id);
        return deletedProduct;
    }
    catch (e) {
        console.log(e);
    }
};
exports.deleteProduct = deleteProduct;
const getProductById = async (id) => {
    try {
        const product = await productQueries.getProductById(id);
        return product;
    }
    catch (e) {
        console.log(e);
    }
};
exports.getProductById = getProductById;
//# sourceMappingURL=product.service.js.map