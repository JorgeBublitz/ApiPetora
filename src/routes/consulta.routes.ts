import { Router } from "express";
import consultaController from "../controllers/consulta.controller";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createConsultaSchema, updateConsultaSchema } from "../schemas/consulta.schema";
import { idParamSchema } from "../schemas/id.schema";

const router = Router();

// Leitura e escrita: autenticados. Delete: apenas gerentes (regra de negócio).
router.use(authenticate);

router.get("/", consultaController.getAll);
router.get("/:id", validate(idParamSchema, "params"), consultaController.getById);
router.post("/", validate(createConsultaSchema), consultaController.create);
router.put("/:id", validate(idParamSchema, "params"), validate(updateConsultaSchema), consultaController.update);
router.delete("/:id", authorize("GERENTE"), validate(idParamSchema, "params"), consultaController.delete);

export default router;
