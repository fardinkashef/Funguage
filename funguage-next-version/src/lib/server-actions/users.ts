"use server";
import { connectToDatabase } from "../database/db-connection";
import User from "../database/models/User";
import { RegisterFormFields, registerFormSchema } from "../zodSchemas";

export async function register(values: RegisterFormFields) {
  // Validate the input values (this is server side validation).
  const validationResult = registerFormSchema.safeParse(values);
  if (validationResult.error) throw new Error("Invalid data input");

  try {
    await connectToDatabase();
    const newUser = new User({
      ...values,
      enrolledCourses: [],
      learntWordsIds: [],
    });
    await newUser.save();
    // return { newUserId: newUser._id.toString() };
  } catch (error) {
    console.log("This error happened while creating new user:", error);
    throw error;
  }
}
