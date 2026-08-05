import { Router } from "express";
import veterinarioController from "../controllers/veterinario.controller";
import { authenticate, authorize } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createVeterinarioSchema, updateVeterinarioSchema } from "../schemas/veterinario.schema";
import { idParamSchema } from "../schemas/id.schema";

const router = Router();

// Leitura: autenticados. Escrita: apenas gerentes (cadastro de equipe).
router.use(authenticate);

router.get("/", veterinarioController.getAll);
router.get("/:id", validate(idParamSchema, "params"), veterinarioController.getById);
router.post("/", authorize("GERENTE"), validate(createVeterinarioSchema), veterinarioController.create);
router.put(
  "/:id",
  authorize("GERENTE"),
  validate(idParamSchema, "params"),
  validate(updateVeterinarioSchema),
  veterinarioController.update
);
router.delete("/:id", authorize("GERENTE"), validate(idParamSchema, "params"), veterinarioController.delete);

export default router;
