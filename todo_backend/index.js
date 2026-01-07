const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

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

app.listen(3000);
