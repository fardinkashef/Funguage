import { Schema, models, model } from "mongoose";

// export interface ISubject extends Document {
//   profile: object;
//   results: object;
// }

const SubjectSchema = new Schema({
  profile: {
    firstName: String,
    lastName: String,
    age: String,
    gender: String,
    groupCode: String,
    caseCode: String,
  },
  results: {
    byEachQuestion: Array,
    byEachEmotion: [
      {
        emotion: String,
        emoji: String,
        correct: Number,
        wrong: Number,
        missed: Number,
      },
    ],

    byAnswerStatus: {
      correct: Number,
      wrong: Number,
      missed: Number,
    },
  },
});

const Subject = models.Subject || model("Subject", SubjectSchema);

export default Subject;
