const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

const taskSchema = new Schema(
  {
    userid: { type: ObjectId, ref: "user" },
    title: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
const taskModel = mongoose.model("task", taskSchema);

module.exports = { userModel, taskModel };
