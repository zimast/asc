const jwt = require("jsonwebtoken");

const secretKey = "secret-key";
const payload = { name: "Alice" };
const newToken = jwt.sign(payload, secretKey, { algorithm: "HS256" });

console.log("JWT created:", newToken);