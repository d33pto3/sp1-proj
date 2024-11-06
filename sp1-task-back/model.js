import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export const File = mongoose.model("File", fileSchema);
