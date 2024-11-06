import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("Server listening on: ", wss.address());

wss.on("connection", function connection(ws, req) {
  console.log(wss.clients);
  console.log("Anzahl Clients: ", wss.clients.length());
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
