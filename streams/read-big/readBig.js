const fs = require("node:fs/promises");

(async () => {
  const fileHandleRead = await fs.open("read-big/src.txt", "r");
  const fileHandleWrite = await fs.open("read-big/dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream({
    highWaterMark: 64 * 1024,
  });
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = "";

  streamRead.on("data", (chunk) => {
    let numbers = chunk.toString("utf-8").split("  ");
    if (Number(numbers[0]) + 1 !== Number(numbers[1])) {
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }
    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop();
    }
    const filteredEvens = numbers.filter((str) => Number(str) % 2 === 0);
    console.log(filteredEvens);
    const buff = Buffer.from(filteredEvens, "utf-8");

    if (!streamWrite.write(chunk)) {
      streamRead.pause();
      console.log("paused");
    }
  });
  streamWrite.on("drain", () => {
    console.log("resumed");
    streamRead.resume();
  });
})();
