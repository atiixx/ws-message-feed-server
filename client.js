import WebSocket from "ws";

const ws = new WebSocket(process.env.WS_SERVER_URL);

ws.on("open", function open() {
  ws.send(
    JSON.stringify({
      name: "Node Client",
      message: "This is the node client!!",
      date: new Date().toISOString(),
    })
  );
});

ws.on("message", function message(data) {
  console.log("received: %s", data);
});

ws.on("error", function error(data) {
  console.log("error: %s", data);
});
