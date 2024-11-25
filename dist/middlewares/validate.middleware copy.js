"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const joi_1 = __importDefault(require("joi"));
const http_status_1 = __importDefault(require("http-status"));
const globals_1 = require("../utils/globals");
const pick_1 = __importDefault(require("@app/utils/pick"));
const ValidationError_1 = require("@app/errors/ValidationError");
const validate = (schema) => (req, res, next) => {
    const validSchema = (0, pick_1.default)(schema, ['params', 'query', 'body']);
    const object = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);
    if (error) {
        const errorMessage = globals_1.CHECK_FIELDS;
        if (error.isJoi) {
            const details = error.details.map((details) => {
                return {
                    field: details.context.key,
                    value: details.context.value,
                    message: details.message,
                };
            });
            res
                .status(http_status_1.default.BAD_REQUEST)
                .json(new ValidationError_1.ValidationError(http_status_1.default.BAD_REQUEST, errorMessage, details));
        }
        else {
            return next(error);
        }
    }
    Object.assign(req, value);
    return next();
};
exports.validate = validate;
//# sourceMappingURL=validate.middleware%20copy.js.map