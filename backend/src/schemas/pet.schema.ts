import { z, ZodError } from "zod";

// 📘 Schema de criação
export const createPetSchema = z.object({
    nome: z.string().nonempty("O nome do pet é obrigatório"),
    especie: z.string().nonempty("A espécie é obrigatória"),
    raca: z.string().nonempty("A raça é obrigatória"),
    dataNascimento: z
        .string()
        .refine(
            (val) => !isNaN(Date.parse(val)),
            "Data de nascimento inválida"
        ),
    tutorId: z.number().int("ID do tutor inválido"),
    agendamentoIds: z.array(z.number().int()).optional(), // IDs opcionais de agendamentos
    consultaIds: z.array(z.number().int()).optional(), // IDs opcionais de consultas
});

// 📘 Schema de atualização (parcial)
export const updatePetSchema = createPetSchema.partial();

// 📘 Schema de exclusão (exemplo: apenas o tutor ou gerente pode deletar)
export const deletePetSchema = z.object({
    petId: z.number().int("ID do pet inválido"),
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
