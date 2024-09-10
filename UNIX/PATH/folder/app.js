const fs = require("node:fs");
require("../file.js");

const content = fs.readFileSync("./text.txt", "utf-8");

console.log(content);
