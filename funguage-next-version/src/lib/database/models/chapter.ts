import { Schema, models, model } from "mongoose";

const ChapterSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    videoUrl: String,
    isPublished: Boolean,
    position: Number,
    course: { type: Schema.Types.ObjectId, ref: "Course" },

    //     usedDatabaseWordIds: [{ type: Schema.Types.ObjectId, required: true }],
  },
  { timestamps: true }
);

const Chapter = models.Chapter || model("Chapter", ChapterSchema);

export default Chapter;
