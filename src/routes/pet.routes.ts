import { Router } from "express";
import petController from "../controllers/pet.controller";

const router = Router();

router.get("/", petController.getAll);
router.get("/:id", petController.getById);
router.post("/", petController.create);
router.put("/:id", petController.update);
router.delete("/:id", petController.delete);

export default router;
