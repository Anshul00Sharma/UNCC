// utils.js

// Function to encode data
function encodeData(type, data, id) {
  if (type === "new-connection") {
    let obj = {
      type: type,
      data: data,
    };
    return JSON.stringify(obj);
  } else if (type === "msg") {
    let obj = {
      type: type,
      data: data,
      id,
    };
    return JSON.stringify(obj);
  } else if (type === "broadcast") {
    let obj = {
      type: type,
      data: data,
    };
    return JSON.stringify(obj);
  }
}

// Function to decode data
function decodeData(dataString) {
  return JSON.parse(dataString.toString("utf-8"));
}

// Function to handle new connections
function newConnection(clientId, socket, clients) {
  let data = encodeData("new-connection", clientId);
  let msg = `User ${clientId} joined.`;
  broadcast(msg, clients);
  socket.write(data);
}
function broadcast(msg, clients) {
  let data = encodeData("broadcast", msg);
  clients.map((s) => {
    s.socket.write(data);
  });
}

// Function to send messages
function sendMsg(socket, id, msg) {
  let data = encodeData("msg", `${id} : ${msg}`);
  socket.write(data);
}

// Exporting the functions
module.exports = {
  newConnection,
  sendMsg,
  encodeData,
  decodeData,
  broadcast,
};
