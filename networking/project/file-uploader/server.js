const net = require("net");
const file = require("node:fs/promises");

const server = net.createServer(() => {});

let fileHandle, fileWriteStream;

server.on("connection", async (socket) => {
  console.log("New Connection");

  socket.on("data", async (data) => {
    if (!fileHandle) {
      socket.pause();

      const indexOfDivider = data.indexOf("-------");
      const fileName = data.subarray(10, indexOfDivider).toString("utf-8");

      fileHandle = await file.open(`storage/${fileName}`, "w");
      fileWriteStream = fileHandle.createWriteStream(); // the stream to write to
      // Writing to our destination file, discard the headers
      fileWriteStream.write(data.subarray(indexOfDivider + 7));

      socket.resume();
      fileWriteStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!fileWriteStream.write(data)) {
        socket.pause();
      }
    }
  });

  socket.on("end", async () => {
    if (fileHandle) fileHandle.close();
    fileHandle = undefined;
    fileWriteStream = undefined;
    console.log("Connection ended!");
  });
  socket.on("close", async () => {
    console.log("client left");
  });
});

server.listen(5050, "::1", () => {
  console.log("Uploader server is listening on port ", server.address());
});
