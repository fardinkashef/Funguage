import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    enrolledCourses: [{ type: Schema.Types.ObjectId, required: true }],
    //   createdCourses: [{ type: Schema.Types.ObjectId, required: true }],
    learntWordsIds: [{ type: Schema.Types.ObjectId, required: true }],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
