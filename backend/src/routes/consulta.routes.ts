import { Router } from "express";
import consultaController from "../controllers/consulta.controller";

const router = Router();

router.get("/", consultaController.getAll);
router.get("/:id", consultaController.getById);
router.post("/", consultaController.create);
router.put("/:id", consultaController.update);
router.delete("/:id", consultaController.delete);

export default router;
