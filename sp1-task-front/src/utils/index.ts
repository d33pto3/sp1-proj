export const selectColorByStatus = (status: string) => {
  let color;
  switch (status) {
    case "Incomplete":
      color = "bg-red-500";
      break;
    case "To Do":
      color = "bg-[#4DB3FF]";
      break;
    case "Doing":
      color = "bg-[#F8E90F]";
      break;
    default:
      color = "none";
  }

  return color;
};

export const generateImgSrcByType = (type: string) => {
  if (type.split("/")[1] === "pdf") {
    return "/src/assets/PDF_file_icon.png";
  }
  return "/src/assets/no-image.jpg";
};
