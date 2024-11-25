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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByKeyword = exports.getProductById = exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const http_status_1 = __importDefault(require("http-status"));
const productService = __importStar(require("../services/product.service"));
const createProduct = async (req, res, next) => {
    try {
        const _a = req.body, { price, quantity } = _a, rest = __rest(_a, ["price", "quantity"]);
        const data = Object.assign(Object.assign({}, rest), { price: Number(price), quantity: Number(quantity), description: 'description' });
        const product = await productService.createProduct(data);
        res.status(http_status_1.default.OK).send(product);
    }
    catch (e) {
        res.status(400).send(e.message);
        next(e);
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res, next) => {
    try {
        const { page, rowsPerPage } = req.query;
        let filterFields = {
            page: Number(page),
            rowsPerPage: Number(rowsPerPage),
        };
        const products = await productService.getProducts(filterFields);
        res.status(http_status_1.default.OK).send(products);
    }
    catch (e) {
        next(e);
        res.status(500).json({ error: e.message || 'Internal Server Error' });
    }
};
exports.getProducts = getProducts;
const updateProduct = async (req, res, next) => {
    try {
        const productId = parseInt(req.query.id, 10);
        if (!req.query.id || isNaN(productId)) {
            res.status(400).json({ error: 'Invalid or missing product ID' });
        }
        const _a = req.body, { price, quantity } = _a, rest = __rest(_a, ["price", "quantity"]);
        const updatedData = Object.assign(Object.assign({}, rest), { price: Number(price), quantity: Number(quantity) });
        const updatedProduct = await productService.updateProduct(updatedData, productId);
        res.status(http_status_1.default.OK).send(updatedProduct);
    }
    catch (e) {
        next(e);
        res.status(500).json({ error: e.message || 'Internal Server Error' });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const productId = parseInt(req.query.id, 10);
        if (!req.query.id || isNaN(productId)) {
            res.status(400).json({ error: 'Invalid or missing product ID' });
        }
        const deletedProduct = await productService.deleteProduct(productId);
        if (deletedProduct) {
            res.status(200).json({
                message: 'Product deleted successfully',
                product: deletedProduct,
            });
        }
        else {
            res.status(404).json({ error: 'Product not found' });
        }
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.deleteProduct = deleteProduct;
const getProductById = async (req, res, next) => {
    try {
        const productId = parseInt(req.params.id, 10);
        if (!req.params.id || isNaN(productId)) {
            res.status(400).json({ error: 'Invalid or missing product ID' });
        }
        const product = await productService.getProductById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(http_status_1.default.OK).send(product);
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.getProductById = getProductById;
const getProductsByKeyword = async (req, res, next) => {
    try {
        const keyword = req.params.search;
        if (!keyword) {
            res.status(400).json({ error: 'Invalid or missing keyword' });
        }
        const products = await productService.getProductsByKeyword(keyword);
        res.status(http_status_1.default.OK).send(products);
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.getProductsByKeyword = getProductsByKeyword;
//# sourceMappingURL=product.controller.js.map