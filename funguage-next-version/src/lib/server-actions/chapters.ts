"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import { chapter, wordsPair } from "../types";
import { extractDBWordIDs } from "../utils";
import Course from "../database/models/Course";
import Chapter from "../database/models/Chapter";

// import { revalidatePath } from "next/cache";

export async function getChapters(courseId: string) {
  try {
    await connectToDatabase();
    const data = await Chapter.find({ course: courseId }).sort({
      position: 1,
    });
    if (!data) {
      throw new Error("There's not any results to return.");
    }

    //* From Mongoose docs: By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO (plain old JavaScript objects): Results.find().lean()
    //* The above solution didn't work for me here so I used the way we handle this problem in a MERN app. There in Express app we do "res.json(data)" to send data, so we convert the data into json and then in client side in React app we do JSON.parse (axios does this automatically), so I did the same thing here. I saw this solution in StackOverFlow bur I think there must be a better way to handle this problem here in Next.js.
    const dataPOJO = JSON.parse(JSON.stringify(data));
    return dataPOJO;
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}

export async function getChapterById(id: string) {
  try {
    await connectToDatabase();
    const chapter = await Chapter.findById(id);
    if (!chapter) {
      throw new Error("There's not any results to return.");
    }
    const chapterPOJO: chapter = JSON.parse(JSON.stringify(chapter));
    return chapterPOJO;
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}

export async function getChaptersByWordID(wordID: string) {
  try {
    await connectToDatabase();
    const chapters = await Chapter.find(
      {
        usedDatabaseWordIds: wordID,
      },
      { _id: 0 }
    ).lean();
    if (!chapters) {
      throw new Error("There's not any results to return.");
    }
    return chapters;
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}
export async function createChapter(chapterData: {
  title: string;
  position: number;
  course: string;
}) {
  try {
    await connectToDatabase();
    const newChapter = new Chapter(chapterData);
    await newChapter.save();
    return { newChapterId: newChapter._id.toString() };
    // revalidatePath("/data");
  } catch (error) {
    console.log("This error happened while creating new data:", error);
    throw error;
  }
}

//* Updating functions 👇:

export async function updateChapterTitle(chapterId: string, newTitle: string) {
  let chapter;
  try {
    await connectToDatabase();
    chapter = await Chapter.findById(chapterId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!chapter) {
    const error = new Error("Could not find chapters for this id.");
    throw error;
  }

  try {
    chapter.title = newTitle;
    await chapter.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updateChapterDescription(
  chapterId: string,
  newDescription: string
) {
  let chapter;
  try {
    await connectToDatabase();
    chapter = await Chapter.findById(chapterId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!chapter) {
    const error = new Error("Could not find chapters for this id.");
    throw error;
  }

  try {
    chapter.description = newDescription;
    await chapter.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updateChapterVideoUrl(
  chapterId: string,
  newVideoUrl: string
) {
  let chapter;
  try {
    await connectToDatabase();
    chapter = await Chapter.findById(chapterId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!chapter) {
    const error = new Error("Could not find chapters for this id.");
    throw error;
  }

  try {
    chapter.videoUrl = newVideoUrl;
    await chapter.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updateChapterSubtitle(
  chapterId: string,
  newSubtitle: { url: string; name: string }
) {
  let chapter;
  try {
    await connectToDatabase();
    chapter = await Chapter.findById(chapterId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!chapter) {
    const error = new Error("Could not find chapters for this id.");
    throw error;
  }

  try {
    chapter.subtitle = newSubtitle;
    await chapter.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updateChapterWords(
  chapterId: string,
  newChapterWords: wordsPair[],
  courseId: string
) {
  // First update the chapter words
  let chapter;
  try {
    await connectToDatabase();
    chapter = await Chapter.findById(chapterId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!chapter) {
    const error = new Error("Could not find chapters for this id.");
    throw error;
  }

  try {
    chapter.wordsPairList = newChapterWords;
    chapter.usedDatabaseWordIds = extractDBWordIDs(newChapterWords);
    await chapter.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
  // Then update the course words
  let course;
  let chapters;
  try {
    await connectToDatabase();
    course = await Course.findById(courseId);
    chapters = await Chapter.find({ course: courseId });
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!course || !chapters) {
    const error = new Error(
      "Could not find the course or the chapters for these ids."
    );
    throw error;
  }
  let chaptersWords: string[] = [];
  chapters.forEach(
    (chapter) =>
      (chaptersWords = [...chaptersWords, ...chapter.usedDatabaseWordIds])
  );
  const newUsedDatabaseWordIds = Array.from(new Set(chaptersWords));
  console.log("newused", newUsedDatabaseWordIds);

  try {
    course.usedDatabaseWordIds = newUsedDatabaseWordIds;
    await course.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}

//* Updating functions 👆:

export async function deleteChapter(id: string) {
  let chapter;
  try {
    await connectToDatabase();
    chapter = await Chapter.findById(id);
  } catch (error) {
    console.log("This error happened while deleting the data:", error);
    throw error;
  }

  if (!chapter) {
    const error = new Error("Could not find chapters for this id.");
    throw error;
  }

  try {
    await chapter.deleteOne();
    // revalidatePath("/data");
  } catch (error) {
    console.log("This error happened while deleting the data:", error);
    throw error;
  }
}

export async function reorderChapters(
  reorderingData: { id: string; position: number }[]
) {
  try {
    await connectToDatabase();
    for (const item of reorderingData) {
      const chapter = await Chapter.findById(item.id);
      chapter.position = item.position;
      await chapter.save();
    }
  } catch (error) {
    console.log("This error happened while deleting the data:", error);
    throw error;
  }
}
