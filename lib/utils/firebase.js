"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdFromToken = exports.firestore = exports.app = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const auth_1 = require("firebase-admin/auth");
const app = (0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)()
});
exports.app = app;
console.log("Firebase Admin SDK initialized", app.name);
const firestore = (0, firestore_1.getFirestore)(app);
exports.firestore = firestore;
console.log("Firestore initialized");
const auth = (0, auth_1.getAuth)(app);
console.debug("Auth initialized");
const getIdFromToken = async (token) => auth === null || auth === void 0 ? void 0 : auth.verifyIdToken(token);
exports.getIdFromToken = getIdFromToken;
//# sourceMappingURL=firebase.js.map