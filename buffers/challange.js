// 0100 1000 0110 1001 0010 0001

// const holdingBinary = Buffer.alloc(3);

// holdingBinary.writeUInt8(0b01001000, 0);
// holdingBinary.writeUInt8(0b01101001, 1);
// holdingBinary.writeUInt8(0b00100001, 2);

// const buff = Buffer.from([0b01001000, 0b01101001, 0b00100001]).toString(
//   "utf-8"
// );
// const buff = Buffer.from("486921", "hex").toString("utf-8");

const buff = Buffer.from("Hi!", "utf-8");

console.log(buff);
