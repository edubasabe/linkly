import { Router } from "express";
import linkRoutes from "./link.routes";
import sessionRoutes from "./session.routes";

const router = Router();

router.use("/sessions", sessionRoutes);
router.use("/links", linkRoutes);

export { router };
