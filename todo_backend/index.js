const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { userModel, taskModel } = require("./db");

const app = express();

dotenv.config();

app.use(express.json());

async function main() {
  try {
    if (!process.env.db_url) {
      console.log("Invalid db connection string !");
      return;
    }
    await mongoose.connect(process.env.db_url).then(() => {
      console.log("Connected to db.");
    });
  } catch (error) {
    console.log("Error connecting to db !");
  }
}

main();

app.post("/signup", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const founduser = await userModel.findOne({ username: username });

  if (founduser) {
    res.status(405).json({ msg: "username already exists !" });
    return;
  }

  try {
    await userModel.create({
      username,
      password,
    });
    res.status(200).json({ msg: "Sign up successfull !" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong !" });
  }
});

app.listen(3000);
