const fs = require("node:fs");
const path = require("node:path");
require("../file.js");

const content = fs.readFileSync(path.join(__dirname, "./text.txt"), "utf-8");

console.log(content);
