import { z, ZodError } from "zod";

// 📘 Schema de criação
export const createAgendamentoSchema = z.object({
    data: z
        .string()
        .refine(
            (val) => !isNaN(Date.parse(val)),
            "Data do agendamento inválida"
        ),
    servico: z.string().nonempty("O serviço é obrigatório"),
    observacao: z.string().optional(),
    petId: z.number().int("ID do pet inválido"),
});

// 📘 Schema de atualização (parcial)
export const updateAgendamentoSchema = createAgendamentoSchema.partial();

// 📘 Schema de exclusão
export const deleteAgendamentoSchema = z.object({
    agendamentoId: z.number().int("ID do agendamento inválido"),
    solicitanteId: z.number().int("ID do solicitante inválido"), 
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
