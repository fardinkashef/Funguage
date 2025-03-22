// words 👇:
export type subtitleWord = {
  title: string;
  cueId: string;
  cueStartTime: number;
  cueEndTime: number;
  previousCueStartTime: number | null;
  previousCueEndTime: number | null;
  nextCueStartTime: number | null;
  nextCueEndTime: number | null;
  orderNumber: number;
};

export type databaseWord = {
  _id: string;
  word: string;
  pronunciation: string;
  tooltip: { text: string; title: string } | null;
  frequency: { text: string; title: string }[];
  partOfSpeech: string;
  register: string;
  inflections: string;
  title: string;
  images: number[];
  geo: string;
  f2n: {
    heading: string;
    explanation: string;
    examples: string[];
  } | null;
  meaning: {
    index: string;
    definition: {
      lexUnit: string;
      registers: string;
      text: string;
      synonyms: string[];
      oppositions: string[];
    };
    translation: string;
    examples: { type: "example" | "grammer" | "collocation"; text: string }[];
  };
};

export type wordsPair = {
  subtitleWordList: subtitleWord[];
  databaseWordList: databaseWord[];
};
// cue 👇:
export type cue = {
  id: string;
  text: string;
};

// course 👇:
export type course = {
  _id?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  isPublished?: boolean;
  usedDatabaseWordIds?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};

// chapter 👇:
export type chapter = {
  _id?: string;
  title: string;
  description?: string;
  videoUrl?: string;
  subtitle: {
    url: string;
    name: string;
  };
  wordsPairList: wordsPair[];
  usedDatabaseWordIds: string[];
  isPublished?: boolean;
  position?: number;
  course?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// user 👇:
export type user = {
  _id?: string;
  email: string;
  username: string;
  password: string;
  enrolledCourses: string[];
  //   createdCourses: string[],
  learntWordsIds: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
