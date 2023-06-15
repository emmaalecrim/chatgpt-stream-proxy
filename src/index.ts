import express, { Request } from 'express';
import { WebSocketServer, RawData } from 'ws';
import { createServer } from 'http';
import ChatCompletuionController from './controllers/ChatCompletionController';
import { authenticate } from './middleware/auth';
import 'dotenv/config'


const app = express()
const server = createServer(app)

server.listen(8080)

const wss = new WebSocketServer({
  noServer: true,
});

function onSocketError(err: any) {
  console.error(err);
}

server.on('upgrade', async function upgrade(request: Request, socket, head) {
  socket.on('error', onSocketError);
  if (!!!process.env.DISABLE_AUTH) {
    await authenticate(request, function next(client: any) {
      if (!client) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
      }
    });
  }
  socket.removeListener('error', onSocketError);
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });

});


wss.on('connection', function connection(ws) {
  // @ts-expect-error - typing bs
  ws.isAlive = true;
  console.log('connected');

  ws.on('message', function message(data: RawData) {
    switch (ws.binaryType) {
      case 'nodebuffer':
        try {
          const parsedData = JSON.parse(data.toString())
          console.log('received data:', parsedData)
          ChatCompletuionController(ws, parsedData)
        } catch (e: any) {
          console.log('error in controller', e)
          ws.send(Buffer.from(JSON.stringify({ error: e.message })))
        }

        break;
      default:
        console.log('received text: ', data)
        ws.send(data);
        break;
    }

  });

  ws.on('pong', ws.ping)
  ws.on('ping', ws.pong)

  ws.on('error', e => console.log(e));
});


