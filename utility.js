const jwt = require("jsonwebtoken");
function encode(data, secret) {
  return jwt.sign(
    {
      data,
    },
    secret,
    { expiresIn: "2d" }
  );
}
function decode(token, secret) {
  return jwt.verify(token, secret);
}
module.exports = { encode, decode };
