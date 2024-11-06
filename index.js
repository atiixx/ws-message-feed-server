import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("Server listening on: ", wss.address());

wss.on("connection", function connection(ws) {
  console.log(
    "Client opened connection. Number of clients: ",
    wss.clients.size
  );

  ws.on("error", console.error);

  ws.on("close", function close() {
    console.log(
      "Client closed connection. Number of clients: ",
      wss.clients.size
    );
  });

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
