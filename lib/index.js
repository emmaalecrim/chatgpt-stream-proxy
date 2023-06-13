"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
function onSocketError(err) {
    console.error(err);
}
const server = (0, http_1.createServer)(app);
const wss = new ws_1.WebSocketServer({ noServer: true });
wss.on('connection', function connection(ws, request, client) {
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        console.log(`Received message ${data} from user ${client}`);
    });
});
server.on('upgrade', function upgrade(request, socket, head) {
    socket.on('error', onSocketError);
    // TODO: authenticate token and get user id and use for socket id
});
server.listen(8080);
//# sourceMappingURL=index.js.map