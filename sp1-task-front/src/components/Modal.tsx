import { ChangeEvent, FC, useEffect, useState } from "react";
import { generateImgSrcByType } from "../utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, setCount }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles([...event.target.files]);
    }
  };
  console.log(selectedFiles);

  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      return alert("Select some files");
    }

    setLoading(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        onClose();
        alert("Successfully uploaded files");
      }
    } catch (err) {
      alert("There was an error! Try again.");
      console.log(err);
    } finally {
      setLoading(true);
      setCount((prev) => prev + selectedFiles.length);
      setSelectedFiles([]);
    }
  };

  const filePreview = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (isImage) {
      const imageUrl = URL.createObjectURL(file);
      return (
        <div className="group relative">
          <img
            src={imageUrl}
            alt={file.name}
            className="w-24 h-24 object-cover border-[1px] border-black rounded-md"
          />
          <div className="absolute left-[50%] top-[-25px] transform -translate-x-1/2 bg-slate-600 text-white text-xs rounded-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-max whitespace-nowrap">
            {file.name}
          </div>
        </div>
      );
    } else {
      return (
        <div className="group relative">
          <img
            src={generateImgSrcByType(file.type)}
            alt={file.name}
            className="w-24 h-24 object-cover border-[1px] border-black rounded-md"
          />
          <div className="absolute left-[50%] top-[-25px] transform -translate-x-1/2 bg-slate-600 text-white text-xs rounded-sm px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 min-w-max whitespace-nowrap">
            {file.name}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[45%] relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 bg-red-500 text-black font-bold px-3 py-1 rounded-full hover:bg-red-600 transition"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Upload Your File</h2>
        <div className="bg-slate-400 rounded-sm text-white cursor-pointer font-bold">
          <input
            type="file"
            multiple
            className="w-full cursor-pointer text-sm text-white file:mr-6 file:py-2 file:px-4 file:border-[1px] file: rounded-sm file:text-sm file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
            onChange={(event) => onFileChange(event)}
          />
        </div>
        <input />
        <div className="pb-3">
          <p className="mb-4 border-b-[1px] border-black py-[2px]">
            Attached Files ({selectedFiles?.length})
          </p>
          <div className="grid grid-cols-5 gap-2">
            {selectedFiles.map((file) => (
              <div key={file.name} className="flex items-center gap-2">
                {filePreview(file)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            className="w-1/3 text-center text-[#1F1F1F] bg-blue-300 hover:bg-blue-400 font-semibold py-[2px] rounded-sm"
            onClick={uploadFiles}
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
