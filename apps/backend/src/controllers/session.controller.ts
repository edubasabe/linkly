import { Request, Response, NextFunction, RequestHandler } from "express";

export const createSessionController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionId = req.cookies.sessionId;
    res.json({
      status: "ok",
      sessionId,
    });
  } catch (error) {
    next(error);
  }
};
