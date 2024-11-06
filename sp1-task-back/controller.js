import { File } from "./model.js";

export const fileUpload = async (req, res) => {
  // store in database
  const filesInfo = req.files.map((file) => ({
    filename: file.originalname,
    path: file.path,
  }));

  try {
    // save files into MONGO
    const savedFiles = await File.insertMany(filesInfo);

    res.status(200).json({
      count: savedFiles.length,
      files: savedFiles,
    });
  } catch (err) {
    console.log("There was an error saving the files to MONGODB: ", err);
    res.status(500).json({ message: "Failed to save files" });
  }
};

export const getFileCount = async (req, res) => {
  try {
    const fileCount = await File.countDocuments();
    res.status(200).json({ count: fileCount });
  } catch (err) {
    console.log("Error fetcghing file count:", err);
    res.status(500).json({ message: "Failed to fetch file count" });
  }
};
