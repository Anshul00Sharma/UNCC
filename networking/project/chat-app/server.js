const net = require("net");
const {
  newConnection,
  encodeData,
  decodeData,
  broadcast,
} = require("./utils.js");

const server = net.createServer();

// an array of client sockets
const clients = [];

server.on("connection", (socket) => {
  console.log("A new Connection to the server");
  let clientId = (clients.length + 1).toString();
  newConnection(clientId, socket, clients);

  socket.on("error", () => {
    broadcast(`User ${clientId} left.`, clients);
  });

  socket.on("data", (data) => {
    let dataObj = decodeData(data);
    if (dataObj.type === "msg") {
      let encodedData = encodeData("msg", dataObj.data, dataObj.id);
      clients.map((s) => {
        s.socket.write(encodedData);
      });
    }
  });

  clients.push({ id: (clients.length + 1).toString(), socket: socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});
