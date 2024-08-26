const EventEmitter = require("./event");

class Emitter extends EventEmitter {}

const myE = new Emitter();

myE.on("foo", () => {
  console.log("Event ocurred 1");
});
myE.on("foo", () => {
  console.log("Event ocurred 2");
});
myE.on("foo", (x) => {
  console.log("Event ocurred 3:", x);
});
myE.once("bar", (x) => {
  console.log("Event ocurred 1:", x);
});

// myE.emit("foo");
myE.emit("bar", "fa");
myE.emit("bar", "fa");
myE.emit("bar", "fa");
myE.emit("bar", "fa");
myE.emit("bar", "fa");
