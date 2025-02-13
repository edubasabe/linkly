import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { errorHandler } from "@/middleware/error.handler";
import prisma from "@/lib/prisma";
import { AppError } from "@/middleware/error.handler";
import { router } from "@/routes";
import cookieParser from "cookie-parser";
import { sessionMiddleware } from "@/middleware/session.middleware";

const app = express();

app.use(cookieParser());
app.use(sessionMiddleware);
app.use(cors());
app.use(express.json());

// Redirect route should be before API routes
app.get("/:shortCode", async (req, res, next) => {
  try {
    const link = await prisma.link.update({
      where: { shortCode: req.params.shortCode },
      data: { clicks: { increment: 1 } },
    });
    if (!link) {
      throw new AppError(404, "Link not found");
    }
    res.redirect(link.original);
  } catch (error) {
    next(error);
  }
});

// API routes
app.use("/api", router);
app.use(errorHandler as ErrorRequestHandler);

export { app };
