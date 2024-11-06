import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const databaeUrl = `mongodb+srv://rakinfrhn:${process.env.MONGODB_PASS}@cluster0.wlfg1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export const connectDB = async () => {
  try {
    await mongoose.connect(databaeUrl);
  } catch (err) {
    console.log("MONGODB connection error", err);
  } finally {
    console.log("db connected");
  }
};
