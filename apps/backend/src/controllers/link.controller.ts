import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  createLink,
  LinkSchema,
  getAllLinks,
  getLinkById,
  updateLink,
  deleteLink,
  DeleteLinkSchema,
} from "@/services/link.service";
import { AppError } from "@/middleware/error.handler";

export const createLinkController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { original } = LinkSchema.parse(req.body);

    if (!original) {
      res.status(400).json({ error: "Original URL is required" });
    }

    const link = await createLink(original);

    res.status(201).json(link);
  } catch (error) {
    next(error);
  }
};

// Get all links
export const getLinksController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const links = await getAllLinks();
    res.json(links);
  } catch (error) {
    next(error);
  }
};

// Get link by ID
export const getLinkByIdController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const link = await getLinkById(req.params.id);
    if (!link) {
      throw new AppError(404, "Link not found");
    }
    res.json(link);
  } catch (error) {
    next(error);
  }
};

// Update link
export const updateLinkController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = LinkSchema.partial().parse(req.body);
    const link = await updateLink(req.params.id, data);
    res.json(link);
  } catch (error) {
    next(error);
  }
};

// Delete link
export const deleteLinkController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = DeleteLinkSchema.parse(req.params);
    if (!id) {
      throw new AppError(400, "Link ID is required");
    }
    await deleteLink(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
