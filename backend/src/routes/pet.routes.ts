import { Router } from "express";
import petController from "../controllers/pet.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createPetSchema, deletePetSchema, updatePetSchema } from "../utils/schemas/pet.schema";

const router = Router();

// rotas públicas
router.get("/", petController.getAll);
router.get("/:id", petController.getById);

// rotas protegidas (precisam de JWT válido)
router.post("/", authMiddleware, validate(createPetSchema), petController.create);
router.put("/:id", authMiddleware, validate(updatePetSchema), petController.update);
router.delete("/:id", authMiddleware, validate(deletePetSchema), petController.delete);

export default router;
