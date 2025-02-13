import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import { userRouter } from "@/routes/user.routes";
import { errorHandler } from "@/middleware/error.handler";
import prisma from "@/lib/prisma";
import { AppError } from "@/middleware/error.handler";
import { router } from "@/routes";

const app = express();

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
