// const fs = require("fs/promises");

// Execution Time : 23s
// CPU Usage: 100% (one core)
// Memory Usage: 50MB

// (async () => {
//   console.time("writeMany");
//   const fileHandle = await fs.open("text.txt", "w");

//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(` ${i} `);
//   }

//   console.timeEnd("writeMany");
// })();

// Execution Time : 2s
// CPU Usage: 100% (one core)
// Memory Usage: 50MB

// const fs = require("node:fs");

// (async () => {
//   console.time("writeMany");
//   fs.open("text.txt", "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       fs.writeSync(fd, ` ${i} `);
//     }
//     console.timeEnd("writeMany");
//   });
// })();

// Don't Do It This Way
// EXECUTION TIME: 300 ms
// CPU Usage: 100% (one core)
// Memory Usage: 200mb

const fs = require("node:fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandle = await fs.open("text.txt", "w");

  const stream = fileHandle.createWriteStream();
  let i = 0;

  const numberOfWrites = 1000000;
  const writeMany = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");

      // this is our last write
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }

      // if stream.write returns false, stop the loop
      if (!stream.write(buff)) break;

      i++;
    }
  };
  writeMany();

  stream.on("drain", () => {
    writeMany();
  });
  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandle.close();
  });
})();
