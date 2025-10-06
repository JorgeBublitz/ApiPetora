import { Router } from "express"
import tutorController from "../controllers/tutor.controller"

const router = Router();

router.get("/", tutorController.getAll);
router.get("/:id", tutorController.getById);
router.post("/", tutorController.create);
router.put("/:id", tutorController.update);
router.delete("/:id", tutorController.delete);

export default router;
