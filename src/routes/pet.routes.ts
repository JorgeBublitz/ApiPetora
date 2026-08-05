import { Router } from "express";
import petController from "../controllers/pet.controller";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createPetSchema, updatePetSchema } from "../schemas/pet.schema";
import { idParamSchema } from "../schemas/id.schema";

const router = Router();

// Leitura e escrita: autenticados. Delete: apenas gerentes (regra de negócio).
router.use(authenticate);

router.get("/", petController.getAll);
router.get("/:id", validate(idParamSchema, "params"), petController.getById);
router.post("/", validate(createPetSchema), petController.create);
router.put("/:id", validate(idParamSchema, "params"), validate(updatePetSchema), petController.update);
router.delete("/:id", authorize("GERENTE"), validate(idParamSchema, "params"), petController.delete);

export default router;
