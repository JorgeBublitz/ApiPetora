import { Router } from "express"
import gerenteController from "../controllers/gerente.controller"

const router = Router();

router.get("/", gerenteController.getAll);
router.get("/:id", gerenteController.getById);
router.post("/", gerenteController.create);
router.put("/:id", gerenteController.update);
router.delete("/:id", gerenteController.delete);

export default router;