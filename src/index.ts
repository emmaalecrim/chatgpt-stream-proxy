import express from 'express';
import { WebSocketServer } from 'ws';

const app = express()
const server = app.listen(3000);

const wss = new WebSocketServer({
  noServer: true
});

server.on('upgrade', (req, socket, head) => {
  console.log('upgrade');
  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit('connection', ws, req);
  });
})

wss.on('connection', function connection(ws) {
  console.log('connected');


  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.on('error', e => console.log(e));
}); 