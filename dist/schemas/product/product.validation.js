"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.productSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(3).max(100),
    price: joi_1.default.number().required().positive(),
    quantity: joi_1.default.number().required().integer().min(0),
    description: joi_1.default.string().optional().min(10).max(255),
    category: joi_1.default.string().optional().min(3).max(50),
});
//# sourceMappingURL=product.validation.js.map