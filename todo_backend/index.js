const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { userModel, taskModel } = require("./db");

dotenv.config();

const app = express();

async function main() {
  try {
    console.log("Connecting to db....");
    await mongoose.connect(process.env.db_url);
    console.log("Connected");
  } catch (error) {
    console.log("Error connection to db");
  }
}

main();

app.use(express.json());

app.post("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const founduser = await userModel.findOne({ username: username });

  if (founduser) {
    res.status(405).json({ msg: "User already exists !" });
    return;
  }

  try {
    const signup = await userModel.create({ username, password });
    if (signup) {
      res.status(200).json({ msg: "Sign up successfull !" });
    } else {
      res.status(402).json({ msg: "Error signing up !" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong !" });
  }
});

app.listen(3000);
