import { Router } from "express";
import * as drawController from "./draw.controller";

const router = Router();

router.get("/:id", drawController.getDrawById);
router.delete("/:id", drawController.deleteDraw);
router.post("/", drawController.saveDraw);
router.put("/:id", drawController.updateDraw);

export default router;