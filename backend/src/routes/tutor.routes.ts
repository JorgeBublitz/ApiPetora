import { Router } from "express"
import tutorController from "../controllers/tutor.controller"
import { validate } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTutorSchema, deleteTutorSchema, updateTutorSchema } from "../utils/schemas/tutor.schema";
const router = Router();

// rotas públicas
router.get("/", tutorController.getAll);
router.get("/:id", tutorController.getById);

// rotas protegidas (precisam de JWT válido)
router.post("/", authMiddleware, validate(createTutorSchema), tutorController.create);
router.put("/:id", authMiddleware, validate(updateTutorSchema), tutorController.update);
router.delete("/:id", authMiddleware, validate(deleteTutorSchema), tutorController.delete);

export default router;
