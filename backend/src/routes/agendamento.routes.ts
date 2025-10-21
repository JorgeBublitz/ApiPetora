import { Router } from "express";
import agendamentoController from "../controllers/agendamento.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createAgendamentoSchema, deleteAgendamentoSchema } from "../utils/schemas/agendamento.schema";

const router = Router();

// rotas públicas
router.get("/", agendamentoController.getAll);
router.get("/:id", agendamentoController.getById);

// rotas protegidas (precisam de JWT válido)
router.post("/", authMiddleware, validate(createAgendamentoSchema), agendamentoController.create);
router.put("/:id", authMiddleware, validate(createAgendamentoSchema), agendamentoController.update);
router.delete("/:id", authMiddleware, validate(deleteAgendamentoSchema), agendamentoController.delete);

export default router;
