import { Router } from "express";
import gerenteController from "../controllers/gerente.controller";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createGerenteSchema, updateGerenteSchema } from "../schemas/gerente.schema";
import { idParamSchema } from "../schemas/id.schema";

const router = Router();

// Gestão de gerentes é exclusiva de gerentes (área administrativa)
router.use(authenticate);
router.use(authorize("GERENTE"));

router.get("/", gerenteController.getAll);
router.get("/:id", validate(idParamSchema, "params"), gerenteController.getById);
router.post("/", validate(createGerenteSchema), gerenteController.create);
router.put("/:id", validate(idParamSchema, "params"), validate(updateGerenteSchema), gerenteController.update);
router.delete("/:id", validate(idParamSchema, "params"), gerenteController.delete);

export default router;
