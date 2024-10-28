"use server";

import { connectToDatabase } from "@/lib/database/db-connection";
import Subject from "../database/models/subject";
import { subject } from "../types";
import { revalidatePath } from "next/cache";

export async function getSubjects() {
  try {
    await connectToDatabase();
    const data = await Subject.find();
    if (!data) {
      throw new Error("There's not any results to return.");
    }

    //* From Mongoose docs: By default, Mongoose queries return an instance of the Mongoose Document class. Documents are much heavier than vanilla JavaScript objects, because they have a lot of internal state for change tracking. Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO (plain old JavaScript objects): Results.find().lean()
    //* The above solution didn't work for me here so I used the way we handle this problem in a MERN app. There in Express app we do "res.json(data)" to send data, so we convert the data into json and then in client side in React app we do JSON.parse (axios does this automatically), so I did the same thing here. I saw this solution in StackOverFlow bur I think there must be a better way to handle this problem here in Next.js.
    const dataPOJO = JSON.parse(JSON.stringify(data));
    const subjectsList: subject[] = dataPOJO.map((subject: subject) => ({
      ...subject,
      id: subject._id,
    }));
    return subjectsList;
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}

export async function getSubjectById(id: string) {
  try {
    await connectToDatabase();
    const data = await Subject.findById(id);
    if (!data) {
      throw new Error("There's not any results to return.");
    }
    const dataPOJO: subject = JSON.parse(JSON.stringify(data));
    return dataPOJO;
  } catch (error) {
    console.log("This error happened when getting all the results:", error);
    throw error;
  }
}

export async function createSubject(newData: subject) {
  try {
    await connectToDatabase();
    const createdResults = new Subject(newData);
    await createdResults.save();
    // revalidatePath("/data");
  } catch (error) {
    console.log("This error happened while creating new data:", error);
    throw error;
  }
}

export async function deleteSubject(id: string) {
  let results;
  try {
    await connectToDatabase();
    results = await Subject.findById(id);
  } catch (error) {
    console.log("This error happened while deleting the data:", error);
    throw error;
  }

  if (!results) {
    const error = new Error("Could not find results for this id.");
    throw error;
  }

  try {
    await results.deleteOne();
    revalidatePath("/data");
  } catch (error) {
    console.log("This error happened while deleting the data:", error);
    throw error;
  }
}
