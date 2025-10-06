import { z, ZodError } from "zod";

// 📘 Schema de criação
export const createTutorSchema = z.object({
  nome: z.string()
        .nonempty("O nome é obrigatório")
        .min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string()
        .email("Email inválido"),
});

// 📘 Schema de atualização
export const updateTutorSchema = createTutorSchema.partial();

// 📘 Schema de exclusão
export const deleteTutorSchema = z.object({
  id: z.number().int("ID inválido"),
  tutorId: z.number().int("ID inválido"),
  }).refine(data => data.id !== data.tutorId, {
    message: "Um tutor não pode deletar a si mesmo",
    path: ["tutorId"],
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
