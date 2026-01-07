const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  userid: { type: ObjectId, required: true, reference: "user" },
});

const userModel = mongoose.model("user", userSchema);
const taskModel = mongoose.model("task", taskSchema);

module.exports = { userModel, taskModel };
