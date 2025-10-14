import { z, ZodError } from "zod";

// 📘 Schema de criação
export const createConsultaSchema = z.object({
    data: z
        .string()
        .refine(
            (val) => !isNaN(Date.parse(val)),
            "Data da consulta inválida"
        ),
    veterinarioId: z.number().int("ID do veterinário inválido"),
    descricao: z.string().nonempty("Descrição obrigatória"),
    tratamento: z.string().optional(),
    petId: z.number().int("ID do pet inválido"),
});

// 📘 Schema de atualização (parcial)
export const updateConsultaSchema = createConsultaSchema.partial();

// 📘 Schema de exclusão
export const deleteConsultaSchema = z.object({
    consultaId: z.number().int("ID da consulta inválido"),
    gerenteId: z.number().int("ID do solicitante inválido"),
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
