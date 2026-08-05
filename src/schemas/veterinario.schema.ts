import { z } from "zod";

/**
 * Schema de criação de veterinário.
 */
export const createVeterinarioSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("Email inválido."),
  senha: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .regex(/\d/, "A senha deve conter pelo menos um número.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial."),
  especialidade: z.string().min(1, "Especialidade obrigatória."),
});

/**
 * Schema de atualização de veterinário (todos os campos opcionais).
 */
export const updateVeterinarioSchema = createVeterinarioSchema.partial();
