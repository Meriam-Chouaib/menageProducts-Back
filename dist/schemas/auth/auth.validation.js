"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const joi_1 = __importDefault(require("joi"));
const registerBody = {
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string()
        .required()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,30}$'))
        .message('signup.password_invalid_back'),
    username: joi_1.default.string().required().max(30),
    statut: joi_1.default.string().required(),
    role: joi_1.default.string().required(),
    image: joi_1.default.string().optional(),
    isLogged: joi_1.default.optional(),
    isActive: joi_1.default.optional(),
    phone: joi_1.default.optional(),
};
exports.register = {
    body: joi_1.default.object().keys(registerBody),
};
//# sourceMappingURL=auth.validation.js.map