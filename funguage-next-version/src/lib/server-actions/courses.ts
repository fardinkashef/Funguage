"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Course from "../database/models/Course";
import { course } from "../types";
// import { revalidatePath } from "next/cache";

export async function getCourses() {
  try {
    await connectToDatabase();
    const courses = await Course.find().lean();
    if (!courses) {
      throw new Error("There's not any results to return.");
    }
    return courses;
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}

export async function getCourseById(id: string) {
  try {
    await connectToDatabase();
    const course = await Course.findById(id);
    if (!course) {
      throw new Error("There's not any results to return.");
    }
    const coursePOJO: course = JSON.parse(JSON.stringify(course));
    return coursePOJO;
  } catch (error) {
    console.log(
      "This error happened when getting the course by its id:",
      error
    );
    throw error;
  }
}

export async function createCourse(courseData: course) {
  try {
    await connectToDatabase();
    const newCourse = new Course(courseData);
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
