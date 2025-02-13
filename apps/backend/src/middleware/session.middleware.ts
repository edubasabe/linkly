import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";

const MILLISECONDS = 1000;
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const DAYS = 30;

export const sessionMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies.sessionId) {
    const sessionId = nanoid();
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MILLISECONDS * SECONDS * MINUTES * HOURS * DAYS, // Expires in 30 days
    });

    req.cookies.sessionId = sessionId;
  }
  next();
};
