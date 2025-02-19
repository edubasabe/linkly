import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { errorHandler } from "@/middleware/error.handler";
import { router } from "@/routes";
import cookieParser from "cookie-parser";
import { sessionMiddleware } from "@/middleware/session.middleware";
import { redirectController } from "./controllers/redirect.controller";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIST = path.join(__dirname, "../../../apps/frontend/dist");
const isProd = process.env.NODE_ENV === "production";

const app = express();
app.use(cookieParser());
app.use(sessionMiddleware);
app.use(
  cors({
    origin: isProd ? process.env.FRONTEND_URL : "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());

// API routes should come first
app.use("/api", router);

// Redirect route for short URLs
app.get("/:shortCode", redirectController);

// Static files and SPA fallback should come last
app.use(express.static(FRONTEND_DIST));
app.get("*", (_, res) => {
  res.sendFile(path.join(FRONTEND_DIST, "index.html"));
});

app.use(errorHandler as ErrorRequestHandler);

export { app };
