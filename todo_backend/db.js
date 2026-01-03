const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: String,
  password: String,
});

const taskSchema = new Schema({
  userid: { type: ObjectId, ref: user },
  title: String,
  completed: { type: Boolean, default: false },
  time: { type: Date, default: Date.now },
});
