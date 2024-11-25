"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const endpoints_1 = require("./config/endpoints");
const main_routes_1 = require("./routes/main.routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const { API, ROOT } = endpoints_1.Endpoints;
app.get(ROOT, (req, res) => {
    res.send('Hello, TypeScript with Yarn!');
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: '*' }));
app.use(API, main_routes_1.mainRouter);
app.all('*', (req, res, next) => {
    res.status(404).send('this request is not found!');
    next();
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map