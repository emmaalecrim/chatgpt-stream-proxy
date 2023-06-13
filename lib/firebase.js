"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firestore = exports.app = void 0;
const app_1 = require("firebase-admin/app");
const firestore_1 = require("firebase-admin/firestore");
const app = (0, app_1.initializeApp)();
exports.app = app;
console.log("Firebase Admin SDK initialized", app.name);
const firestore = (0, firestore_1.getFirestore)(app);
exports.firestore = firestore;
console.log("Firestore initialized");
//# sourceMappingURL=firebase.js.map