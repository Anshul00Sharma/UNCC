const net = require("net");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    console.log("Connected to the server");

    const message = await rl.question("Enter a message > ");
    client.write(message);
  }
);

client.on("end", () => {
  console.log("END!");
});
client.on("error", (err) => {
  console.error("Request error: ");
});
