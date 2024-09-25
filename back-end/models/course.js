const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  profile: { type: Object, required: true },
  sections: { type: Array, required: true },
  usedDatabaseWordIds: [{ type: mongoose.Types.ObjectId, required: true }],
  // creator: { type: String, required: true, ref: "User" },
});

module.exports = mongoose.model("Course", courseSchema);
