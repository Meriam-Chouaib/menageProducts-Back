"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("@app/config/endpoints");
const controllers_1 = require("@app/controllers");
const validate_middleware_copy_1 = require("@app/middlewares/validate.middleware copy");
const auth_1 = require("@app/schemas/auth");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.post(endpoints_1.Endpoints.auth.SIGNUP, (0, validate_middleware_copy_1.validate)(auth_1.authSchema.register), controllers_1.AuthController.signUp);
authRouter.post(endpoints_1.Endpoints.auth.SIGNIN, controllers_1.AuthController.signIn);
authRouter.post(endpoints_1.Endpoints.auth.LOGOUT, controllers_1.AuthController.logout);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map