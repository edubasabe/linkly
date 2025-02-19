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

// Serve static files from frontend/dist
app.use(express.static(FRONTEND_DIST));

// API routes
app.use("/api", router);

// Redirect route should be before API routes
app.get("/:shortCode", redirectController);

// Serve index.html for all other routes (SPA fallback)
app.get("*", (_, res) => {
  res.sendFile(path.join(FRONTEND_DIST, "index.html"));
});

app.use(errorHandler as ErrorRequestHandler);

export { app };
