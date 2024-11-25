"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("@app/config/endpoints");
const controllers_1 = require("@app/controllers");
const authenticate_middleware_1 = require("@app/middlewares/authenticate.middleware");
const express_1 = __importDefault(require("express"));
const productRouter = express_1.default.Router();
productRouter.post(endpoints_1.Endpoints.ROOT, authenticate_middleware_1.authenticate, controllers_1.ProductController.createProduct);
productRouter.get(endpoints_1.Endpoints.ROOT, controllers_1.ProductController.getProducts);
productRouter.put(endpoints_1.Endpoints.ROOT, controllers_1.ProductController.updateProduct);
productRouter.delete(endpoints_1.Endpoints.ROOT, controllers_1.ProductController.deleteProduct);
productRouter.get(endpoints_1.Endpoints.product.SEARCH, controllers_1.ProductController.getProductsByKeyword);
exports.default = productRouter;
//# sourceMappingURL=product.routes.js.map