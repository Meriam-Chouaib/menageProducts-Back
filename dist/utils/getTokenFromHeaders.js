"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromHeaders = void 0;
const getTokenFromHeaders = (req) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    return token;
};
exports.getTokenFromHeaders = getTokenFromHeaders;
//# sourceMappingURL=getTokenFromHeaders.js.map