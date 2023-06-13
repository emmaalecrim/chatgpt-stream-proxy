import express from 'express'
import { createServer } from 'http'
import { WebSocketServer } from 'ws'

const app = express()

function onSocketError (err) {
  console.error(err)
}

const server = createServer(app)
const wss = new WebSocketServer({ noServer: true })

wss.on('connection', function connection (ws, request, client) {
  ws.on('error', console.error)

  ws.on('message', function message (data) {
    console.log(`Received message ${data} from user ${client}`)
  })
})

server.on('upgrade', function upgrade (request, socket, head) {
  socket.on('error', onSocketError)

  // Authenticate by decoding id token from request
})

server.listen(8080)
