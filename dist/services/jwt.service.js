"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@app/config/config");
const signToken = (payload) => {
    const token = jsonwebtoken_1.default.sign(payload, config_1.config.jwtSecret, {
        expiresIn: config_1.config.jwtExpiration,
    });
    return token;
};
exports.signToken = signToken;
const decodeToken = (token, next) => {
    try {
        const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return decodedToken;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.service.js.map