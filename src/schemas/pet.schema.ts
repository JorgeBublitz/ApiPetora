import { z } from "zod";

/**
 * Schema de criação de pet.
 * `dataNascimento` é convertida automaticamente para `Date` via `z.coerce.date()`.
 */
export const createPetSchema = z.object({
  nome: z.string().min(1, "O nome do pet é obrigatório."),
  especie: z.string().min(1, "A espécie é obrigatória."),
  raca: z.string().min(1, "A raça é obrigatória."),
  dataNascimento: z.coerce.date("Data de nascimento inválida."),
  tutorId: z.number().int("ID do tutor inválido.").positive("ID do tutor deve ser maior que zero."),
});

/**
 * Schema de atualização de pet (todos os campos opcionais).
 */
export const updatePetSchema = createPetSchema.partial();
