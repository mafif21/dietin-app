import { Storage } from "@google-cloud/storage";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const storage = new Storage({
  projectId: "dietin-capstone",
  keyFilename: path.join(__dirname, "../../key.json"),
});
