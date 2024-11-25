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
exports.logout = exports.signin = exports.signup = void 0;
const userQueries = __importStar(require("../queries/user.queries"));
const jwt_service_1 = require("@app/services/jwt.service");
const ApiResponse_1 = __importDefault(require("@app/utils/ApiResponse"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const ApiError_1 = __importDefault(require("@app/errors/ApiError"));
const signup = async (data) => {
    try {
        if (await userQueries.getUser(data.email)) {
            return new ApiResponse_1.default(400, {}, 'User exists!');
        }
        else {
            const hash = bcrypt_1.default.hashSync(data.password, 15);
            data.password = hash;
            const user = await userQueries.signUp(data);
            const token = (0, jwt_service_1.signToken)({ id: user.id, email: data.email });
            return new ApiResponse_1.default(200, { user, token }, 'User created successfully!');
        }
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.signup = signup;
const signin = async (email, password) => {
    try {
        const user = await userQueries.getUser(email);
        if (!user) {
            return new ApiResponse_1.default(http_status_1.default.NOT_FOUND, {}, 'User not found');
        }
        const isMatch = bcrypt_1.default.compareSync(password, user.password);
        if (!isMatch) {
            return new ApiResponse_1.default(401, {}, 'Invalid password');
        }
        const token = (0, jwt_service_1.signToken)({ id: user.id, email: user.email });
        return new ApiResponse_1.default(200, { user, token }, 'User authenticated successfully!');
    }
    catch (error) {
        return new ApiError_1.default(error.statusCode, error.message);
    }
};
exports.signin = signin;
const logout = async (token) => {
    try {
        return new ApiResponse_1.default(200, {}, 'Logout successful');
    }
    catch (err) {
        console.log(err.message);
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Logout failed');
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.service.js.map