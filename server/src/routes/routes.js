import express from "express";
import historyController from "../controller/history-controller.js";
import { isAuthenticated } from "../middleware/auth-middleware.js";

const historyRouter = new express.Router();

historyRouter.get("/history", isAuthenticated, historyController.getHistories);
historyRouter.post(
  "/history",
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
