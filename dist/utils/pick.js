"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (object, keys) => keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
    }
    return obj;
}, {});
exports.default = pick;
//# sourceMappingURL=pick.js.map