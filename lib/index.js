"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const server = app.listen(3000);
const wss = new ws_1.WebSocketServer({
    noServer: true
});
server.on('upgrade', (req, socket, head) => {
    console.log('upgrade');
    wss.handleUpgrade(req, socket, head, ws => {
        wss.emit('connection', ws, req);
    });
});
wss.on('connection', function connection(ws) {
    console.log('connected');
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
    ws.on('error', e => console.log(e));
});
//# sourceMappingURL=index.js.map