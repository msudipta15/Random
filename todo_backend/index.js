const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userModel, taskModel } = require("./db");
const jwt = require("jsonwebtoken");

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

  const hashpassword = await bcrypt.hash(password, 10);

  const founduser = await userModel.findOne({ username: username });

  if (founduser) {
    res.status(405).json({ msg: "User already exists !" });
    return;
  }

  try {
    const signup = await userModel.create({ username, password: hashpassword });
    if (signup) {
      res.status(200).json({ msg: "Sign up successfull !" });
    } else {
      res.status(402).json({ msg: "Error signing up !" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong !" });
  }
});

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const founduser = await userModel.findOne({ username });

    if (!founduser) {
      res.status(402).json({ msg: "No user found with this username !" });
      return;
    }

    const validpassword = await bcrypt.compare(password, founduser.password);

    if (!validpassword) {
      res.status(402).json({ msg: "Invalid password !" });
      return;
    }

    const token = await jwt.sign(
      { id: founduser._id.toString() },
      process.env.jwt_key
    );

    res.status(200).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong !" });
  }
});

app.listen(3000);
