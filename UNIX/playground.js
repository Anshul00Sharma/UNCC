const { spawn, exec } = require("node:child_process");

console.log(process.env.mode);

const subprocess = spawn(
  "./playground.js",
  ["something", "-f", 34, "some more string", "-u"],
  {
    env: { mode: "production" },
  }
);

subprocess.stdout.on("data", (data) => {
  console.log("this is the data");

  console.log(data.toString("utf-8"));
});

// exec("ls -l", (error, stdout, stderr) => {
//   if (error) {
//     console.log(`error: ${error.message}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
