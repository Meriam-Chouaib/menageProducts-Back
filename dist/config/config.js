"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = Number.parseInt(process.env.PORT, 10) || 8000;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const jwtSecret = process.env.JWT_SECRET || '';
const jwtExpiration = process.env.JWT_EXPIRATION || '1h';
const ENV = process.env.ENVIRONMENT || 'development';
exports.config = {
    ENV,
    PORT,
    MYSQL_DATABASE,
    jwtSecret,
    jwtExpiration,
};
//# sourceMappingURL=config.js.map