import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { databaseWord, wordsPair } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// To extract database word ids from a chapter's words pair list
const extractFromDatabaseWordList = (databaseWordList: databaseWord[]) => {
  const ids = databaseWordList.map((databaseWord) => databaseWord._id);
  return ids;
};

export function extractDBWordIDs(wordsPairList: wordsPair[]) {
  let ids: string[] = [];
  wordsPairList.forEach(
    (pair) =>
      (ids = [...ids, ...extractFromDatabaseWordList(pair.databaseWordList)])
  );

  //Remove duplicate items:
  return Array.from(new Set(ids));
}
