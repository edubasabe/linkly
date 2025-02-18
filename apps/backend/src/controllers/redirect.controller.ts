import { RequestHandler } from "express";
import { getLinkById, updateLink } from "@/services/link.service";
import { AppError } from "@/middleware/error.handler";

export const redirectController: RequestHandler = async (req, res, next) => {
  try {
    const link = await getLinkById(req.params.shortCode);

    if (!link) {
      throw new AppError(404, "Link not found");
    }

    await updateLink(req.params.shortCode, {
      clicks: { increment: 1 },
    });

    res.redirect(link.original);
  } catch (error) {
    next(error);
  }
};
