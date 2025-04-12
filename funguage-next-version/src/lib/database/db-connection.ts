import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  // mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    if (process.env.NODE_ENV === "development") {
      if (!process.env.MONGODB_LOCAL_URL)
        return console.log("MISSING MONGODB_LOCAL_URL");

      await mongoose.connect(process.env.MONGODB_LOCAL_URL, {
        dbName: "funguage-local",
        enableUtf8Validation: false,
      });
    } else if (process.env.NODE_ENV === "production") {
      if (!process.env.MONGODB_ATLAS_URL)
        return console.log("MISSING MONGODB_ATLAS_URL");

      await mongoose.connect(process.env.MONGODB_ATLAS_URL, {
        dbName: "funguage",
        enableUtf8Validation: false,
      });
    }

    isConnected = true;
    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
