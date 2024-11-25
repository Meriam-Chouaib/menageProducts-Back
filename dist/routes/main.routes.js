"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const endpoints_1 = require("../config/endpoints");
const product_routes_1 = __importDefault(require("./product.routes"));
const auth_routes_1 = __importDefault(require("@app/routes/auth.routes"));
const user_routes_1 = __importDefault(require("@app/routes/user.routes"));
const config_1 = require("@app/config/config");
const express_session_1 = __importDefault(require("express-session"));
exports.mainRouter = express_1.default.Router();
exports.mainRouter.use((0, express_session_1.default)({
    secret: config_1.config.jwtSecret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
}));
exports.mainRouter.use(endpoints_1.Endpoints.product.ROOT, product_routes_1.default);
exports.mainRouter.use(endpoints_1.Endpoints.auth.ROOT, auth_routes_1.default);
exports.mainRouter.use(endpoints_1.Endpoints.users.ROOT, user_routes_1.default);
//# sourceMappingURL=main.routes.js.map