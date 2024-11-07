import WebSocket, { WebSocketServer } from "ws";
import { getLastMessages, saveToDB } from "./messages.js";

//hosted under: https://dashboard.render.com/

const wss = new WebSocketServer({ port: 8080 });

console.log("Server listening on: ", wss.address());

wss.on("connection", function connection(ws) {
  try {
    getLastMessages().then((lastMessages) => {
      ws.send(JSON.stringify(lastMessages));
    });
  } catch (e) {
    console.error(e);
  }
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
    try {
      saveToDB(data);
    } catch (e) {
      console.error(e);
    }
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
