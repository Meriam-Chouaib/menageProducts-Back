"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoints = void 0;
exports.Endpoints = {
    APIDOCS: '/api-docs',
    API: '/api',
    ROOT: '/',
    auth: {
        ROOT: '/auth',
        SIGNUP: '/signup',
        SIGNIN: '/signin',
        LOGOUT: '/logout',
    },
    product: {
        ROOT: '/products',
        SINGLE: '/:id',
        SEARCH: '/search/:search',
    },
    users: {
        ROOT: '/users',
    },
};
//# sourceMappingURL=endpoints.js.map