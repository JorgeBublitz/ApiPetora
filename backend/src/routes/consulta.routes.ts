import { Router } from "express";
import consultaController from "../controllers/consulta.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createConsultaSchema, updateConsultaSchema, deleteConsultaSchema } from "../utils/schemas/consulta.schema";

const router = Router();

// rotas públicas
router.get("/", consultaController.getAll);
router.get("/:id", consultaController.getById);

// rotas protegidas (precisam de JWT válido)
router.post("/", authMiddleware, validate(createConsultaSchema), consultaController.create);
router.put("/:id", authMiddleware, validate(updateConsultaSchema), consultaController.update);
router.delete("/:id", authMiddleware, validate(deleteConsultaSchema), consultaController.delete);

export default router;
