import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { connectDB } from "./db.js";
import { fileUpload, getFileCount } from "./controller.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const port = process.env.PORT;

connectDB();

app.get("/", (req, res) => res.send("Task for SP1"));

app.get("/files", getFileCount);

app.post("/upload", upload.array("files"), fileUpload);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
