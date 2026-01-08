const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const jwt_key = process.env.jwt_key;

function auth(req, res, next) {
  const token = req.headers.token;
  const valid = jwt.verify(token, jwt_key);

  if (valid) {
    const id = valid.id;
    req.id = id;
    next();
  } else {
    res.status(402).json({ msg: "You are not signed in !" });
  }
}

module.exports = { auth };
