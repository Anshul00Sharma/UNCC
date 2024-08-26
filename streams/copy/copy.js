const fs = require("node:fs/promises");

// (async () => {
//   console.time("copy");
//   const destFile = await fs.open("dest.txt", "w");
//   const result = await fs.readFile("src.txt");

//   await destFile.write(result);

//   console.timeEnd("copy");
// })();

// (async () => {
//   console.time("copy");

//   const srcFile = await fs.open("src.txt", "r");
//   const destFile = await fs.open("dest.txt", "w");

//   let bytesRead = -1;

//   while (bytesRead !== 0) {
//     const readResult = await srcFile.read();
//     bytesRead = readResult.bytesRead;

//     if (bytesRead !== 16384) {
//       const indexOfNotFilled = readResult.buffer.indexOf(0);
//       const newBuffer = Buffer.alloc(indexOfNotFilled);
//       readResult.buffer.copy(newBuffer, 0, 0, indexOfNotFilled);
//       destFile.write(newBuffer);
//     } else {
//       destFile.write(readResult.buffer);
//     }
//   }

//   console.timeEnd("copy");
// })();
// (async () => {
//   console.time("copy");

//   const srcFile = await fs.open("src.txt", "r");
//   const destFile = await fs.open("dest.txt", "w");

//   const readStream = srcFile.createReadStream();
//   const writeStream = destFile.createWriteStream();

//   readStream.pipe(writeStream);
//   readStream.on("end", () => {
//     console.timeEnd("copy");
//   });
// })();

const { pipeline } = require("node:stream");

(async () => {
  console.time("copy");

  const srcFile = await fs.open("src.txt", "r");
  const destFile = await fs.open("dest.txt", "w");

  const readStream = srcFile.createReadStream();
  const writeStream = destFile.createWriteStream();

  pipeline(readStream, writeStream, (err) => {
    console.log(err);
    console.timeEnd("copy");
  });
})();
