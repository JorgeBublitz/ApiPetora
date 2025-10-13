import { Router } from "express";
import gerenteController from "../controllers/gerente.controller";
import { autenticarToken } from "../middlewares/auth.middleware";

const router = Router();

// rotas públicas
router.get("/", gerenteController.getAll);
router.get("/:id", gerenteController.getById);

// rotas protegidas (precisam de JWT válido)
router.post("/", autenticarToken, gerenteController.create);
router.put("/:id", autenticarToken, gerenteController.update);
router.delete("/:id", autenticarToken, gerenteController.delete);

export default router;
