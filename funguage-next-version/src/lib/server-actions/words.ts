"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Word from "../database/models/Word";
import { databaseWord } from "../types";

// import { revalidatePath } from "next/cache";

export async function getWords(ids: string[]) {
  try {
    await connectToDatabase();
    const words = (await Word.find({
      _id: { $in: ids },
    }).lean()) as databaseWord[];
    if (!words) {
      throw new Error("There's not any results to return.");
    }
    return words.map((word) => ({ ...word, _id: word._id.toString() }));
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}

// export async function getChapterById(id: string) {
//   try {
//     await connectToDatabase();
//     const chapter = await Chapter.findById(id);
//     if (!chapter) {
//       throw new Error("There's not any results to return.");
//     }
//     const chapterPOJO: chapter = JSON.parse(JSON.stringify(chapter));
//     return chapterPOJO;
//   } catch (error) {
//     console.log("This error happened when getting all the results:", error);
//     throw error;
//   }
// }

// export async function createChapter(chapterData: chapter) {
//   try {
//     await connectToDatabase();
//     const newChapter = new Chapter(chapterData);
//     await newChapter.save();
//     return { newChapterId: newChapter._id.toString() };
//     // revalidatePath("/data");
//   } catch (error) {
//     console.log("This error happened while creating new data:", error);
//     throw error;
//   }
// }

//* Updating functions 👇:

// export async function updateChapterTitle(chapterId: string, newTitle: string) {
//   let chapter;
//   try {
//     await connectToDatabase();
//     chapter = await Chapter.findById(chapterId);
//   } catch (error) {
//     console.log("This error happened while updating the data:", error);
//     throw error;
//   }

//   if (!chapter) {
//     const error = new Error("Could not find chapters for this id.");
//     throw error;
//   }

//   try {
//     chapter.title = newTitle;
//     await chapter.save();
//   } catch (error) {
//     console.log("This error happened while updating the data:", error);
//     throw error;
//   }
// }

//* Updating functions 👆:

// export async function deleteChapter(id: string) {
//   let chapter;
//   try {
//     await connectToDatabase();
//     chapter = await Chapter.findById(id);
//   } catch (error) {
//     console.log("This error happened while deleting the data:", error);
//     throw error;
//   }

//   if (!chapter) {
//     const error = new Error("Could not find chapters for this id.");
//     throw error;
//   }

//   try {
//     await chapter.deleteOne();
//     // revalidatePath("/data");
//   } catch (error) {
//     console.log("This error happened while deleting the data:", error);
//     throw error;
//   }
// }
