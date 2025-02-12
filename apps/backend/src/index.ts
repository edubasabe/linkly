import express from "express";
import cors from "cors";
import { userRouter } from "@/routes/user.routes";
import { linkRouter } from "@/routes/link.routes";
import { errorHandler } from "@/middleware/error.handler";
import { logger } from "@/lib/logger";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
