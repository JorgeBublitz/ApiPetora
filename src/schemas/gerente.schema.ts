import { z } from "zod";

/**
 * Schema de criação de gerente.
 */
export const createGerenteSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("Email inválido."),
  senha: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .regex(/\d/, "A senha deve conter pelo menos um número.")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial."),
});

/**
 * Schema de atualização de gerente (todos os campos opcionais).
 */
export const updateGerenteSchema = createGerenteSchema.partial();
