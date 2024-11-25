"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signIn = exports.signUp = void 0;
const authService = __importStar(require("../services/auth.service"));
const http_status_1 = __importDefault(require("http-status"));
const ApiResponse_1 = __importDefault(require("@app/utils/ApiResponse"));
const signUp = async (req, res, next) => {
    const data = req.body;
    console.log('data', data);
    try {
        const user = await authService.signup(data);
        res.status(http_status_1.default.OK).send(user);
    }
    catch (err) {
        next(err);
    }
};
exports.signUp = signUp;
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await authService.signin(email, password);
        res.status(http_status_1.default.OK).send(user);
    }
    catch (err) {
        next(err);
    }
};
exports.signIn = signIn;
const logout = async (req, res, next) => {
    try {
        if (req.session) {
            req.session.destroy((err) => {
                if (err) {
                    return res
                        .status(http_status_1.default.INTERNAL_SERVER_ERROR)
                        .send(new ApiResponse_1.default(500, {}, 'Unable to log out due to session error'));
                }
                res
                    .status(http_status_1.default.OK)
                    .send(new ApiResponse_1.default(200, {}, 'Logout successful'));
            });
        }
        else {
            res
                .status(http_status_1.default.BAD_REQUEST)
                .send(new ApiResponse_1.default(400, {}, 'No active session found'));
        }
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map