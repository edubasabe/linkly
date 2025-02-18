import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { errorHandler } from "@/middleware/error.handler";
import { router } from "@/routes";
import redirectRouter from "@/routes/redirect.routes";
import cookieParser from "cookie-parser";
import { sessionMiddleware } from "@/middleware/session.middleware";

const app = express();

app.use(cookieParser());
app.use(sessionMiddleware);
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());

// Redirect route should be before API routes
app.use("/", redirectRouter);

// API routes
app.use("/api", router);
app.use(errorHandler as ErrorRequestHandler);

export { app };
