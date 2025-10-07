import { z, ZodError } from "zod";

// 📘 Schema de criação
export const createTutorSchema = z.object({
  nome: z.string()
        .nonempty("O nome é obrigatório")
        .min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
});

// 📘 Schema de atualização
export const updateTutorSchema = createTutorSchema.partial();

// 📘 Schema de exclusão
export const deleteTutorSchema = z.object({
  tutorId: z.number({ message: "ID do tutor deve ser um número" })
             .int("ID do tutor deve ser inteiro")
             .positive("ID do tutor deve ser maior que zero"),
  gerenteId: z.number({ message: "ID do gerente deve ser um número" })
             .int("ID do gerente deve ser inteiro")
             .positive("ID do gerente deve ser maior que zero"),
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
