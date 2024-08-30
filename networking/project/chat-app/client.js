const net = require("net");
const { encodeData, decodeData } = require("./utils.js");

const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  // from TTY module
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};
const movecursor = (dx, dy) => {
  // from TTY module
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

const client = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    console.log("Connected to the server");
    const ask = async () => {
      const message = await rl.question("Enter a message > ");
      // move the curser one line up
      await movecursor(0, -1);
      // clear the current line
      await clearLine(0);
      let encodedData = encodeData("msg", message, id);
      client.write(encodedData);
    };
    ask();
    client.on("data", async (data) => {
      let dataObj = decodeData(data);
      if (dataObj.type === "new-connection") {
        id = dataObj.data;

        console.log();
        await movecursor(0, -1);
        await clearLine(0);

        console.log(`Your id is ${id}`);

        ask();
      } else if (dataObj.type === "msg") {
        console.log();
        await movecursor(0, -1);
        await clearLine(0);

        console.log(`User ${dataObj.id} : ${dataObj.data}`);

        ask();
      } else if (dataObj.type === "broadcast") {
        console.log();
        await movecursor(0, -1);
        await clearLine(0);

        console.log(dataObj.data);

        ask();
      }
    });
  }
);

client.on("error", (err) => {
  console.error("Request error: ");
});
