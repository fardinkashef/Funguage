// course.profile 👇:

type profile = {
  name: string;
  description: string;
};

// course.sections 👇:

export type subtitleWord = {
  title: string;
  cueId: string;
  orderNumber: number;
};
export type databaseWord = {
  _id?: string;
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

export type subtitleWordList = subtitleWord[];
export type databaseWordList = databaseWord[];

export type wordsPair = {
  subtitleWordList: subtitleWordList;
  databaseWordList: databaseWordList;
};

export type wordsPairList = wordsPair[];

export type section = {
  name: string;
  description: string;
  subtitleUploaded: boolean;
  videoUploaded: boolean;
  wordsPairList: wordsPairList;
  usedDatabaseWordIds: string[];
};

type sections = section[];

// course 👇:
export type course = {
  _id?: string;
  profile: profile;
  sections: sections;
  usedDatabaseWordIds: string[];
};

// cue 👇:
export type cue = {
  id: string;
  text: string;
};
