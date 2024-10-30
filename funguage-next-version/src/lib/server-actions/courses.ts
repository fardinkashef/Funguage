"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Course from "../database/models/course";
import { course } from "../types";
// import { revalidatePath } from "next/cache";

// export async function getScourses() {
//   try {
//     await connectToDatabase();
//     const data = await Scourse.find();
//     if (!data) {
//       throw new Error("There's not any results to return.");
//     }

//     //* From Mongoose docs: By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO (plain old JavaScript objects): Results.find().lean()
//     //* The above solution didn't work for me here so I used the way we handle this problem in a MERN app. There in Express app we do "res.json(data)" to send data, so we convert the data into json and then in client side in React app we do JSON.parse (axios does this automatically), so I did the same thing here. I saw this solution in StackOverFlow bur I think there must be a better way to handle this problem here in Next.js.
//     const dataPOJO = JSON.parse(JSON.stringify(data));
//     const scoursesList: scourse[] = dataPOJO.map((scourse: scourse) => ({
//       ...scourse,
//       id: scourse._id,
//     }));
//     return scoursesList;
//   } catch (error) {
//     console.log("This error happened when getting all the results:", error);
//     throw error;
//   }
// }

export async function getCourseById(id: string) {
  try {
    await connectToDatabase();
    const data = await Course.findById(id);
    if (!data) {
      throw new Error("There's not any results to return.");
    }
    const dataPOJO: course = JSON.parse(JSON.stringify(data));
    return dataPOJO;
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}

export async function createCourse(newData: course) {
  try {
    await connectToDatabase();
    const newCourse = new Course(newData);
    await newCourse.save();
    return { newCourseId: newCourse._id.toString() };
    // revalidatePath("/data");
  } catch (error) {
    console.log("This error happened while creating new data:", error);
    throw error;
  }
}

//* Updating functions 👇:

// export async function updateCourse(courseId: string, newData: any) {
//   let result;
//   try {
//     await connectToDatabase();
//     result = await Course.findById(courseId);
//   } catch (error) {
//     console.log("This error happened while updating the data:", error);
//     throw error;
//   }

//   if (!result) {
//     const error = new Error("Could not find results for this id.");
//     throw error;
//   }

//   try {
//     console.log("newData", newData);

//     await result.updateOne({ _id: courseId }, newData);
//     // revalidatePath("/data");
//   } catch (error) {
//     console.log("This error happened while deleting the data:", error);
//     throw error;
//   }
// }
export async function updateCourseTitle(courseId: string, newTitle: string) {
  let course;
  try {
    await connectToDatabase();
    course = await Course.findById(courseId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!course) {
    const error = new Error("Could not find courses for this id.");
    throw error;
  }

  try {
    course.title = newTitle;
    await course.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updateCourseDescription(
  courseId: string,
  newDescription: string
) {
  let course;
  try {
    await connectToDatabase();
    course = await Course.findById(courseId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!course) {
    const error = new Error("Could not find courses for this id.");
    throw error;
  }

  try {
    course.description = newDescription;
    await course.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
export async function updateCourseImageUrl(
  courseId: string,
  newImageUrl: string
) {
  let course;
  try {
    await connectToDatabase();
    course = await Course.findById(courseId);
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }

  if (!course) {
    const error = new Error("Could not find courses for this id.");
    throw error;
  }

  try {
    course.imageUrl = newImageUrl;
    await course.save();
  } catch (error) {
    console.log("This error happened while updating the data:", error);
    throw error;
  }
}
//* Updating functions 👆:

export async function deleteCourse(id: string) {
  let course;
  try {
    await connectToDatabase();
    course = await Course.findById(id);
  } catch (error) {
    console.log("This error happened while deleting the data:", error);
    throw error;
  }

  if (!course) {
    const error = new Error("Could not find courses for this id.");
    throw error;
  }

  try {
    await course.deleteOne();
    // revalidatePath("/data");
  } catch (error) {
    console.log("This error happened while deleting the data:", error);
    throw error;
  }
}
