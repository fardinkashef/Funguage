export type profile = {
  firstName: string;
  lastName: string;
  age: string;
  gender: "male" | "female" | undefined;
  groupCode: string;
  caseCode: string;
};
export type results = {
  byEachQuestion: (boolean | null)[];
  byEachEmotion: {
    emotion: string;
    emoji: string;
    correct: number;
    wrong: number;
    missed: number;
  }[];

  byAnswerStatus: {
    correct: number;
    wrong: number;
    missed: number;
  };
};
export type subject = {
  _id?: string;
  id?: string;
  profile: profile;
  results: results;
};
export type answers = (boolean | null)[];
