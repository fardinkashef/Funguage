import { Schema, models, model } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    imageUrl: String,
    isPublished: Boolean,
    //     usedDatabaseWordIds: [{ type: mongoose.Types.ObjectId, required: true }],
    // creator: { type: String, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Course = models.Course || model("Course", CourseSchema);

export default Course;