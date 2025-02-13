import { Router } from "express";
import { createSessionController } from "@/controllers/session.controller";

const router = Router();

router.get("/", createSessionController);

export default router;
