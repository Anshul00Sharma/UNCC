const { stdout, stdin, argv, exit } = require("node:process");
const fs = require("node:fs/promises");

const filepath = argv[2];

const cat = async () => {
  try {
    const content = await fs.open(filepath, "r");
    const readStream = content.createReadStream();

    readStream.on("data", (data) => {
      if (!stdout.write(data.toString("utf8").toLocaleUpperCase())) {
        readStream.pause();
      }
      stdout.on("drain", () => {
        readStream.resume();
      });
    });

    readStream.on("end", () => {
      exit(0);
    });
  } catch (error) {
    console.log("Your path is either not provided or it doesn't exist");
  }
};
cat();
