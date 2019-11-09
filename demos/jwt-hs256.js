import * as jwt from "jsonwebtoken";

const payload = { name: "Alice" };
const secretKey = "secret-key";
const newToken = jwt.sign(payload, secretKey, { algorithm: "HS256" });

console.log("JWT created:", newToken);
