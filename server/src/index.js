import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { historyRouter } from "./routes/routes.js";

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";
dotenv.config();

app.use(express.static("./food-scan"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", historyRouter);

app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
