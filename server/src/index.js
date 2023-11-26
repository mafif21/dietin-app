import express from "express";
import multer from "multer";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import { historyRouter } from "./routes/routes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "./food-scan");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.static("./food-scan"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/api", historyRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is live ${process.env.PORT}`);
});
