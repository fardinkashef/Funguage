import { Schema, models, model } from "mongoose";

const WordSchema = new Schema({
  word: { type: String, required: true },
  pronunciation: { type: String, required: true },
  frequency: { type: Object, required: true },
  partOfSpeech: { type: String, required: true },
  additionalInfo: { type: String, required: true },
  register: { type: String, required: true },
  meaning: { type: Object, required: true },
  title: { type: String, required: true },
  translation: { type: String, required: true },
  images: { type: Array, required: true },
});

const Word = models.Word || model("Word", WordSchema);

export default Word;
