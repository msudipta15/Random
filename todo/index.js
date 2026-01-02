const express = require("express");
const mongoose = require("mongoose");
const app = express();

async function dbconnect() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://stark:Stark-my7@cluster0.mak1q6c.mongodb.net/todo22"
      )
      .then(() => {
        console.log("Database connected.");
      });
  } catch (error) {
    console.log("Error connecting to database !");
  }
}

dbconnect();

app.listen(3000);

app.use(express.json());

app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(402).json({ msg: "Username or Password missing !" });
    return;
  }
  res
    .status(200)
    .json({ msg: `your username - ${username} and password - ${password}` });
});
