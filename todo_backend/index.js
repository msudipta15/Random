const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

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
});
