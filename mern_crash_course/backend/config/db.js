import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB: ${db.connection.host}`);
    return db;
  } catch (error) {
    console.error("Error connecting to MongoDB");
    console.error(error);
    process.exit(1);
  }
};
