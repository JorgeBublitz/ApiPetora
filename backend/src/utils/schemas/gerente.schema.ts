import { z, ZodError } from "zod";

const idSchema = z
    .string()
    .nonempty("O ID deve ser preenchido")
    .refine((val) => !isNaN(Number(val)), {
        message: "O ID deve ser um número válido",
    })
    .transform((val) => Number(val))
    .refine((val) => Number.isInteger(val), {
        message: "O ID deve ser um número inteiro",
    })
    .refine((val) => val > 0, {
        message: "O ID deve ser um número positivo",
    });


export const createGerenteSchema = z.object({
    nome: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .nonempty("O nome é obrigatório"),

    email: z
        .string()
        .email("Formato de e-mail inválido")
        .nonempty("O e-mail é obrigatório"),

    senha: z
        .string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/\d/, "A senha deve conter pelo menos um número")
        .regex(/[!@#$%^&*(),.?":{}|<>]/, "A senha deve conter pelo menos um caractere especial"),
});

export const updateGerenteSchema = createGerenteSchema.partial();

export const getGerenteSchema = z.object({
    id: idSchema,
});

const gerenteIdSchema = idSchema;

export const deleteGerenteSchema = z
    .object({
        id: idSchema,
        gerenteId: gerenteIdSchema,
    })
    .refine((data) => data.id !== data.gerenteId, {
        message: "Um gerente não pode deletar a si mesmo",
        path: ["gerenteId"],
    });
export function formatZodError(error: unknown) {
    if (error instanceof ZodError) {
        return error.issues.map((err) => ({
            campo: err.path.join(".") || "geral",
            mensagem: err.message,
        }));
    }

    return [
        {
            campo: "desconhecido",
            mensagem: "Erro de validação desconhecido",
        },
    ];
}
