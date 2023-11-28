import express from "express";
import historyController from "../controller/history-controller.js";
import { isAuthenticated } from "../middleware/auth-middleware.js";
import multer from "multer";

const historyRouter = new express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

historyRouter.get("/history", isAuthenticated, historyController.getHistories);
historyRouter.post(
  "/history",
  upload.single("image"),
  isAuthenticated,
  historyController.createHistory
);
historyRouter.get(
  "/history/:historyId",
  isAuthenticated,
  historyController.getHistory
);
historyRouter.delete(
  "/history/:historyId",
  isAuthenticated,
  historyController.deleteHistory
);

export { historyRouter };
