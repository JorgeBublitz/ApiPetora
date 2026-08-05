import { Router } from "express";
import agendamentoController from "../controllers/agendamento.controller";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createAgendamentoSchema, updateAgendamentoSchema } from "../schemas/agendamento.schema";
import { idParamSchema } from "../schemas/id.schema";

const router = Router();

// Leitura e escrita: autenticados. Delete: apenas gerentes (regra de negócio).
router.use(authenticate);

router.get("/", agendamentoController.getAll);
router.get("/:id", validate(idParamSchema, "params"), agendamentoController.getById);
router.post("/", validate(createAgendamentoSchema), agendamentoController.create);
router.put("/:id", validate(idParamSchema, "params"), validate(updateAgendamentoSchema), agendamentoController.update);
router.delete("/:id", authorize("GERENTE"), validate(idParamSchema, "params"), agendamentoController.delete);

export default router;
