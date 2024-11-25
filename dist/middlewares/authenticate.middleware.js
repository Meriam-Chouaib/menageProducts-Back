"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'No token provided, authorization denied' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '', (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.body = decoded;
        next();
    });
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.middleware.js.map