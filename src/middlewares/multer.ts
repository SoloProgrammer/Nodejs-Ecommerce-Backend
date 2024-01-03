import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = "_" + new Date().getTime();
    cb(null, file.originalname + uniqueSuffix);
  },
});

export const SingleUpload = multer({ storage }).single("photo");
