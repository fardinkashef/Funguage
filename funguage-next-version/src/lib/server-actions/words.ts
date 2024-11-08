"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Word from "../database/models/Word";

// import { revalidatePath } from "next/cache";

export async function getWords() {
  try {
    await connectToDatabase();
    const words = await Word.find();
    if (!words) {
      throw new Error("There's not any results to return.");
    }

    //* From Mongoose docs: By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO (plain old JavaScript objects): Results.find().lean()
    //* The above solution didn't work for me here so I used the way we handle this problem in a MERN app. There in Express app we do "res.json(data)" to send data, so we convert the data into json and then in client side in React app we do JSON.parse (axios does this automatically), so I did the same thing here. I saw this solution in StackOverFlow bur I think there must be a better way to handle this problem here in Next.js.
    const dataPOJO = JSON.parse(JSON.stringify(words));
    return dataPOJO;
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
