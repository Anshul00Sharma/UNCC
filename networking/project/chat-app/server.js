const net = require("net");

const server = net.createServer();

server.on("connection", (socket) => {
  console.log("A new Connection to the server");
  socket.on("data", (data) => {
    console.log("data from the client", data.toString("utf-8"));
  });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});
server.on("error", (err) => {
  console.error("Request error:");
});
