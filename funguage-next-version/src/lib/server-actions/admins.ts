"use server";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../database/db-connection";
import Admin from "../database/models/admin";

export async function getAdmin(email: string, password: string) {
  try {
    await connectToDatabase();
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (isPasswordValid) return admin;
    return null;
  } catch (error) {
    console.log("This error happened when getting an admin:", error);
    throw error;
  }
}
