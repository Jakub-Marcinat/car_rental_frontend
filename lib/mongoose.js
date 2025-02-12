import mongoose from "mongoose";

export async function mongooseConnect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing environment variable: MONGODB_URI");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  }

  try {
    return await mongoose.connect(uri);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("Stack trace:", error.stack);
    throw new Error("MongoDB connection failed");
  }
}
