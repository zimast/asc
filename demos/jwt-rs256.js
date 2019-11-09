import * as jwt from "jsonwebtoken";
import * as fs from "fs";

const privateKey = fs.readFileSync("./demos/private.key");
const payload = { name: "Alice" };

const token = jwt.sign(payload, privateKey, {
  algorithm: "RS256",
  expiresIn: 120,
  subject: "1"
});

console.log("RSA 256 JWT", token);
