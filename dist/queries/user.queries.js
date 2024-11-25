"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.updateUser = exports.getUserById = exports.getUser = exports.signUp = void 0;
const database_1 = require("@app/database");
const db = (0, database_1.getDbInstance)();
const signUp = async (user) => {
    return await db.user.create({
        data: Object.assign({}, user),
    });
};
exports.signUp = signUp;
const getUser = async (email) => {
    return await db.user.findUnique({
        where: { email },
    });
};
exports.getUser = getUser;
const getUserById = async (id) => {
    return await db.user.findFirst({
        where: { id: Number(id) },
    });
};
exports.getUserById = getUserById;
const updateUser = async (userId, user) => {
    try {
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: user,
        });
        return updatedUser;
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateUser = updateUser;
const getUsers = async () => {
    try {
        return await db.user.findMany();
    }
    catch (e) {
        console.log(e.message);
    }
};
exports.getUsers = getUsers;
//# sourceMappingURL=user.queries.js.map