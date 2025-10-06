import { z, ZodError } from "zod";

// 📘 Schema de criação
export const createVeterinarioSchema = z.object({
    nome: z.string().nonempty("O nome é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .regex(/\d/, "A senha deve conter pelo menos um número")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial"),
    especialidade: z.string().nonempty("Especialidade obrigatória"),
    consultaIds: z.array(z.number().int()).optional(), // IDs opcionais, valida depois no controller
});

// 📘 Schema de atualização (parcial)
export const updateVeterinarioSchema = createVeterinarioSchema.partial();

// 📘 Schema de exclusão (somente por gerente)
export const deleteVeterinarioSchema = z.object({
    veterinarioId: z.number().int("ID do veterinário inválido"),
    gerenteId: z.number().int("ID do gerente inválido"),
});

// 📘 Função para formatar erros do Zod de forma bonita
export function formatZodError(error: unknown) {
    if (error instanceof ZodError) {
        return error.issues.map(err => ({
            campo: err.path.join("."),
            mensagem: err.message,
        }));
    }
    return [{ campo: "desconhecido", mensagem: "Erro de validação" }];
}
