import { z } from "zod";

/**
 * Schema reutilizável para validar `req.params.id`.
 */
export const idParamSchema = z.object({
  id: z.coerce.number().int("ID inválido.").positive("ID deve ser maior que zero."),
});
