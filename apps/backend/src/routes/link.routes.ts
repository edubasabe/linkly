import { Router } from "express";
import {
  createLinkController,
  deleteLinkController,
  getLinkByIdController,
  getLinksController,
  updateLinkController,
} from "@/controllers/link.controller";

const router = Router();

router.post("/", createLinkController);
router.get("/", getLinksController);
router.get("/:id", getLinkByIdController);
router.patch("/:id", updateLinkController);
router.delete("/:id", deleteLinkController);

export default router;
