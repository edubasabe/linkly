import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { logger } from "@/lib/logger";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";

logger.info(`Loading environment variables from ${envFile}`);
const envFilePath = join(__dirname, "../../", envFile);

config({ path: envFilePath });
