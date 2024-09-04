const net = require("net");
const file = require("node:fs/promises");
const path = require("path");

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
  const filePath = process.argv[2];
  const fileName = path.basename(filePath);
  socket.write(`fileName: ${fileName}-------`);
  try {
    const fileHandle = await file.open(filePath, "r");
    const fileReadStream = fileHandle.createReadStream();
    const fileSize = (await fileHandle.stat()).size;

    // For showing the upload progress
    let uploadedPercentage = 0;
    let bytesUploaded = 0;
    console.log(); // to get a nice log for the progress percentage

    fileReadStream.on("data", async (data) => {
      if (!socket.write(data)) {
        fileReadStream.pause();
      }

      bytesUploaded += data.length; // add the number of bytes read to the variable
      let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);

      if (newPercentage !== uploadedPercentage) {
        uploadedPercentage = newPercentage;
        await moveCursor(0, -1);
        await clearLine(0);
        console.log(
          `Uploading${
            uploadedPercentage % 3 === 0
              ? ".. "
              : uploadedPercentage % 2 === 0
              ? "..."
              : ".  "
          } Progress: ${uploadedPercentage}%`
        );
      }
    });

    socket.on("drain", () => {
      fileReadStream.resume();
    });

    fileReadStream.on("end", async () => {
      await fileHandle.close();
      socket.end();
    });
  } catch (err) {
    console.log("The File Does NOt Exists");
    console.log(err);
  }
});
