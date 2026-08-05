import { z } from "zod";

/**
 * Schema de login (POST /api/auth/login).
 */
export const loginSchema = z.object({
  email: z.string().email("Email inválido."),
  senha: z.string().min(1, "A senha é obrigatória."),
});
