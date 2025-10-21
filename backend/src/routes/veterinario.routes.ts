import { Router } from "express"
import veterinarioController from "../controllers/veterinario.controller"
import { validate } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createVeterinarioSchema, deleteVeterinarioSchema, updateVeterinarioSchema } from "../utils/schemas/veterinario.schema";

const router = Router();

// rotas públicas
router.get("/", veterinarioController.getAll);
router.get("/:id", veterinarioController.getById);

// rotas protegidas (precisam de JWT válido)
router.post("/", authMiddleware, validate(createVeterinarioSchema), veterinarioController.create);
router.put("/:id", authMiddleware, validate(updateVeterinarioSchema), veterinarioController.update);
router.delete("/:id", authMiddleware, validate(deleteVeterinarioSchema), veterinarioController.delete);

export default router;