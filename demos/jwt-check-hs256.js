import * as jwt from "jsonwebtoken";

const existingToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxpY2UiLCJpYXQiOjE1MDI4ODkxOTF9._tPQtlZz2GhXHXATn5W09K4XCG0Z5LyEQqikJf3qXF8";
const secretKey = "secret-key";
const verify = jwt.verify(existingToken, secretKey);

console.log("Decoded JWT:", verify);
