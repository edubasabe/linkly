import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
const envFilePath = join(__dirname, "../../", envFile);

config({ path: envFilePath });
