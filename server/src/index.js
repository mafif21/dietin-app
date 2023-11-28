import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { historyRouter } from "./routes/routes.js";

const app = express();
dotenv.config();

app.use(express.static("./food-scan"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/api", historyRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is live ${process.env.PORT}`);
});
