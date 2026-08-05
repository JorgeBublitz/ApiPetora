import { z } from "zod";

/**
 * Schema de criação de tutor.
 */
export const createTutorSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Email inválido."),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
});

/**
 * Schema de atualização de tutor (todos os campos opcionais).
 */
export const updateTutorSchema = createTutorSchema.partial();
