import { Router } from "express";
import authController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { loginSchema } from "../schemas/auth.schema";

const router = Router();

// Rota pública de autenticação
router.post("/login", validate(loginSchema), authController.login);

// Perfil do usuário logado (token obrigatório)
router.get("/me", authenticate, authController.me);

export default router;
