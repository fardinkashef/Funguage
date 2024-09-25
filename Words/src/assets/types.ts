export type data = {
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
