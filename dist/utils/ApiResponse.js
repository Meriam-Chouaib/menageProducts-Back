"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    constructor(status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
    send(res) {
        res
            .status(this.status)
            .json({ status: this.status, data: this.data, message: this.message });
    }
}
exports.default = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map