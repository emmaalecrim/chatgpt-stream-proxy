"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const auth_1 = require("./middleware/auth");
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
server.listen(8080);
const wss = new ws_1.WebSocketServer({
    server
});
function onSocketError(err) {
    console.error(err);
}
server.on('upgrade', function upgrade(request, socket, head) {
    socket.on('error', onSocketError);
    (0, auth_1.authenticate)(request, function next(client) {
        if (!client) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }
        socket.removeListener('error', onSocketError);
        wss.handleUpgrade(request, socket, head, function done(ws) {
            return wss.emit('connection', ws, request, client);
        });
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