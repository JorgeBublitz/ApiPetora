import { z } from "zod";

/**
 * Schema de criação de agendamento.
 * `data` é convertida automaticamente para `Date` via `z.coerce.date()`.
 */
export const createAgendamentoSchema = z.object({
  data: z.coerce.date("Data do agendamento inválida."),
  servico: z.string().min(1, "O serviço é obrigatório."),
  observacao: z.string().optional(),
  petId: z.number().int("ID do pet inválido.").positive("ID do pet deve ser maior que zero."),
});

/**
 * Schema de atualização de agendamento (todos os campos opcionais).
 */
export const updateAgendamentoSchema = createAgendamentoSchema.partial();
