const crypto = require("crypto");
const password = "monkey";

crypto.randomBytes(256, function(error, salt) {
  crypto.pbkdf2(password, salt, 100000, 512, "sha256", function(error, hash) {
    console.log(
      "The result of hashing " +
        password +
        " is:\n\n" +
        hash.toString("hex") +
        "\n\n"
    );
  });
});
