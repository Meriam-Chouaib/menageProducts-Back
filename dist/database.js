"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbInstance = void 0;
const client_1 = require("@prisma/client");
let database;
const getDbInstance = () => {
    if (!database) {
        database = new client_1.PrismaClient();
        database
            .$connect()
            .then(() => {
            console.log('Connected to database', 'APP');
        })
            .catch((err) => {
            console.log(err.message, 'Datasource');
        });
    }
    return database;
};
exports.getDbInstance = getDbInstance;
//# sourceMappingURL=database.js.map