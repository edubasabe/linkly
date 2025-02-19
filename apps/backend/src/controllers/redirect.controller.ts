import { RequestHandler } from "express";
import { getLinkByShortCode, updateLink } from "@/services/link.service";
import { AppError } from "@/middleware/error.handler";
import { logger } from "@/lib/logger";

export const redirectController: RequestHandler = async (req, res, next) => {
  try {
    const link = await getLinkByShortCode(req.params.shortCode);

    if (!link) {
      logger.error(`Link not found: ${req.params.shortCode}`);
      throw new AppError(404, "Link not found");
    }

    await updateLink(link.id, {
      clicks: { increment: 1 },
    });
    logger.info(`Redirecting to ${link.original}`);
    res.redirect(link.original);
  } catch (error) {
    next(error);
  }
};
