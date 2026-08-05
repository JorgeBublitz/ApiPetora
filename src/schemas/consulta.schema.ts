import { z } from "zod";

/**
 * Schema de criação de consulta.
 * `data` é convertida automaticamente para `Date` via `z.coerce.date()`.
 */
export const createConsultaSchema = z.object({
  data: z.coerce.date("Data da consulta inválida."),
  veterinarioId: z.number().int("ID do veterinário inválido.").positive("ID do veterinário deve ser maior que zero."),
  descricao: z.string().min(1, "Descrição obrigatória."),
  tratamento: z.string().optional(),
  petId: z.number().int("ID do pet inválido.").positive("ID do pet deve ser maior que zero."),
});

/**
 * Schema de atualização de consulta (todos os campos opcionais).
 */
export const updateConsultaSchema = createConsultaSchema.partial();
