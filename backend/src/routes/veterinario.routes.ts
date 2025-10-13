import { Router } from "express"
import veterinarioController from "../controllers/veterinario.controller"

const router = Router();

router.get("/", veterinarioController.getAll);
router.get("/:id", veterinarioController.getById);
router.post("/", veterinarioController.create);
router.put("/:id", veterinarioController.update);
router.delete("/:id", veterinarioController.delete);

export default router;