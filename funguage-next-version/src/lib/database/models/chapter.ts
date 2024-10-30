import { Schema, models, model } from "mongoose";

const ChapterSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: String,
    videoUrl: String,
    isPublished: Boolean,
    position: Number,
    //     usedDatabaseWordIds: [{ type: mongoose.Types.ObjectId, required: true }],
  },
  { timestamps: true }
);

const Chapter = models.Chapter || model("Chapter", ChapterSchema);

export default Chapter;
