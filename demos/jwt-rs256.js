const jwt = require("jsonwebtoken");
import * as fs from "fs";

const privateKey = fs.readFileSync("./demos/private.key");
const payload = {};
const token = jwt.sign(payload, privateKey, {
  algorithm: "RS256",
  expiresIn: 120,
  subject: "1" // User ID
});

console.log("RSA 256 JWT", token);