"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const endpoints_1 = require("@app/config/endpoints");
const controllers_1 = require("@app/controllers");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.get(endpoints_1.Endpoints.ROOT, controllers_1.UserController.getUsers);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map