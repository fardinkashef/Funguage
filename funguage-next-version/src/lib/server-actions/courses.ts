"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Course from "../database/models/Course";
import { course } from "../types";
// import { revalidatePath } from "next/cache";

export async function getCourses(): Promise<course[]> {
  try {
    await connectToDatabase();
    const courses = (await Course.find().lean()) as course[];
    if (!courses) {
      throw new Error("There's not any results to return.");
    }
    // * If you only need to retrieve SOME properties of course objects from DB, this is how you can type the data in TypeScript. Pick<Type, Keys> is a built-in utility type in TypeScript that allows you to create a new type by selecting a set of properties from an existing type.
    // type CourseTitleAndDescription = Pick<Course, 'title' | 'description'>;
    return courses;
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}

export async function getCourseById(id: string): Promise<course> {
  try {
    await connectToDatabase();
    const course = (await Course.findById(id).lean()) as course;
    if (!course) {
      throw new Error("There's not any results to return.");
    }

    //* In /learning/courses/[courseid] page, I need course.usedDatabaseWordIds to determine how many new words there are for the user to learn in the course. The problem is even two new ObjectID(...) s with the same id are not considered the same by JavaScript, so I have to convert IDs in course.usedDatabaseWordIds to string. I hope in the future we can find a solution to retrieve IDs from MongoDB as strings not objects so we don't have to convert them to strings afterwards.
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.log(
      "This error happened when getting the course by its id:",
      error
    );
    throw error;
  }
}

export async function createCourse(title: string): Promise<{
  newCourseId: string;
}> {
  try {
    await connectToDatabase();
    const newCourse = new Course({ title });
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
export async function updateCourseLevel(courseId: string, newLevel: string) {
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
    course.level = newLevel;
    await course.save();
  } catch (error) {
    console.log("This error happened while updating the course level:", error);
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
