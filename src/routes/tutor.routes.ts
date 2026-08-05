import { Router } from "express";
import tutorController from "../controllers/tutor.controller";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createTutorSchema, updateTutorSchema } from "../schemas/tutor.schema";
import { idParamSchema } from "../schemas/id.schema";

const router = Router();

// Leitura e escrita: autenticados. Delete: apenas gerentes (regra de negócio).
router.use(authenticate);

router.get("/", tutorController.getAll);
router.get("/:id", validate(idParamSchema, "params"), tutorController.getById);
router.post("/", validate(createTutorSchema), tutorController.create);
router.put("/:id", validate(idParamSchema, "params"), validate(updateTutorSchema), tutorController.update);
router.delete("/:id", authorize("GERENTE"), validate(idParamSchema, "params"), tutorController.delete);

export default router;
