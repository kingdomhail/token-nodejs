const express = require("express");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

const store = require("./store.json");
const secret = "HaiLapTrinh";
const { encode, decode } = require("./utility");

function auth(req, res, next) {
  const headers = req.headers;
  const token = headers["token"];
  if (!token) {
    return res.send("Invalid Token");
  }
  try {
    const validateToken = decode(token, secret);
    req.username = validateToken.data.username;
    next();
  } catch (error) {
    return res.send("Invalid Token");
  }
}

/**
 * 1. validate input
 * 2. check exist usernames
 * 3. check password
 * 4. create token
 */
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //1.
  if (!username || !password) {
    return res.send("Invalid Input!");
  }
  //2.
  const index = store.users.map((a) => a.username).indexOf(username);
  if (index === -1) {
    return res.send("Invalid Username!");
  }
  //3.
  if (store.users[index].password !== password) {
    return res.send("Invalid Password!");
  }
  //4.
  const dataCreateToken = { username };
  const token = encode(dataCreateToken, secret);
  res.send({ token });
});

app.get("/info", auth, (req, res) => {
  res.send(req.username);
});

app.get("/", (req, res) => {
  res.send("HELLO Hai Lap Trinh!");
});

app.listen(port, () => {
  console.log(`Token Nodejs app listening on port ${port}`);
});
