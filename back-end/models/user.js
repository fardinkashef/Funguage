const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passWord: { type: String, required: true, minlength: 6 },
  // image: { type: String, required: true },
  enrolledCourses: [{ type: mongoose.Types.ObjectId, required: true }],
  createdCourses: [{ type: mongoose.Types.ObjectId, required: true }],
  learntWordsIds: [{ type: mongoose.Types.ObjectId, required: true }],
});

module.exports = mongoose.model("User", userSchema);
