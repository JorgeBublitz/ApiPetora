import { Router } from "express";
import agendamentoController from "../controllers/agendamento.controller";

const router = Router();

router.get("/", agendamentoController.getAll);
router.get("/:id", agendamentoController.getById);
router.post("/", agendamentoController.create);
router.put("/:id", agendamentoController.update);
router.delete("/:id", agendamentoController.delete);

export default router;
