import express, { Request } from 'express';
import { WebSocketServer } from 'ws';
import { authenticate } from './middleware/auth';
import { createServer } from 'http';

const app = express()
const server = createServer(app)

server.listen(8080)

const wss = new WebSocketServer({
  noServer: true,
});

function onSocketError(err: any) {
  console.error(err);
}

server.on('upgrade', function upgrade(request: Request, socket, head) {
  socket.on('error', onSocketError);

  authenticate(request, function next(client: any) {
    if (!client) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;

    }
    socket.removeListener('error', onSocketError);
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request, client);

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

