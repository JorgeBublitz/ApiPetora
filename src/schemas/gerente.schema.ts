import { z, ZodError } from "zod";

// 📘 Schema de criação
export const createGerenteSchema = z.object({
    nome: z.string()
        .nonempty("O nome é obrigatório"),
    email: z.string()
        .email("Email inválido"),
    senha: z.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .regex(/\d/, "A senha deve conter pelo menos um número")
        .regex(/[!@#$%^&*(),.?\":{}|<>]/, "A senha deve conter pelo menos um caractere especial"),
});
// 📘 Schema de atualização
export const updateGerenteSchema = createGerenteSchema.partial();

// 📘 Schema de exclusão
export const deleteGerenteSchema = z.object({
    id: z.number().int("ID inválido"),
    gerenteId: z.number().int("ID inválido"),
}).refine(data => data.id !== data.gerenteId, {
    message: "Um gerente não pode deletar a si mesmo",
    path: ["gerenteId"],
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
