"use server";
import { signIn } from "@/auth";
import { connectToDatabase } from "../database/db-connection";
import User from "../database/models/User";
import {
  LoginFormFields,
  RegisterFormFields,
  registerFormSchema,
} from "../zodSchemas";
import bcrypt from "bcrypt";
import { user } from "../types";

export async function register(values: RegisterFormFields) {
  // Validate the input values (this is server side validation).
  const validationResult = registerFormSchema.safeParse(values);
  if (validationResult.error) throw new Error("Invalid data input");

  try {
    await connectToDatabase();
    const hashedPassword = await bcrypt.hash(values.password, 12);
    const newUser = new User({
      ...values,
      password: hashedPassword,
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

export async function login(values: LoginFormFields) {
  // Server side validation for login form is done in authorize method. Check auth.ts file
  try {
    await signIn("credentials", { ...values, redirect: false });
    return { success: true };
  } catch (error) {
    console.log("This error happened while signing in:", error);
  }
}

export async function getUser(email: string, password: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  } catch (error) {
    console.log("This error happened when getting a user from DB:", error);
    throw error;
  }
}
export async function getUserByID(_id: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id });
    if (!user) {
      return null;
    }

    return user as user;
  } catch (error) {
    console.log("This error happened when getting a user from DB:", error);
    throw error;
  }
}
export async function addToUserWords(userId: string, newWordIds: string[]) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return null;
    }
    user.learntWordsIds = [...user.learntWordsIds, ...newWordIds];
    user.save();
  } catch (error) {
    console.log("This error happened when getting a user from DB:", error);
    throw error;
  }
}
