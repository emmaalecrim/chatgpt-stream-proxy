"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const firebase_1 = require("../utils/firebase");
const authenticate = async (req, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return next();
    const token = authorization.split(' ')[1];
    try {
        console.log(token);
        const client = await (0, firebase_1.getIdFromToken)(token);
        return next(client);
    }
    catch (e) {
        console.log(e);
        next(null);
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map