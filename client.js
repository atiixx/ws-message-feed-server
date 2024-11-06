import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", function open() {
  ws.send("This is the node client!!");
});

ws.on("message", function message(data) {
  console.log("received: %s", data);
});

ws.on("error", function error(data) {
  console.log("error: %s", data);
});