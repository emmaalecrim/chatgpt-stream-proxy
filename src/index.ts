import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import express from 'express';

const app = express();

function onSocketError(err: any) {
  console.error(err);
}

const server = createServer(app);
const wss = new WebSocketServer({ noServer: true });

wss.on('connection', function connection(ws: { on: (arg0: string, arg1: { (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; (data: any): void; }) => void; }, request: any, client: any) {
  ws.on('error', console.error);

  ws.on('message', function message(data: any) {
    console.log(`Received message ${data} from user ${client}`);
  });
});

server.on('upgrade', function upgrade(request, socket, head) {
  socket.on('error', onSocketError);
  // TODO: authenticate token and get user id and use for socket id

});

server.listen(8080);