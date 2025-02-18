import { redirectController } from "@/controllers/redirect.controller";
import { Router } from "express";

const router = Router();

router.get(":shortCode", redirectController);

export default router;
