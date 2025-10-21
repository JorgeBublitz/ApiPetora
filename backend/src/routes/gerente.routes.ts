import { Router } from "express";
import gerenteController from "../controllers/gerente.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createGerenteSchema, updateGerenteSchema, deleteGerenteSchema } from "../utils/schemas/gerente.schema";


const router = Router();

// rotas públicas
router.get("/", gerenteController.getAll);
router.get("/:id", gerenteController.getById);
router.get("/search/by-name", gerenteController.getByName);
router.get("/search/by-email", gerenteController.getByEmail);

// rotas protegidas (precisam de JWT válido)
router.post("/", authMiddleware, validate(createGerenteSchema), gerenteController.create);
router.put("/:id", authMiddleware, validate(updateGerenteSchema), gerenteController.update);
router.delete("/:id", authMiddleware, validate(deleteGerenteSchema), gerenteController.delete);

export default router;
