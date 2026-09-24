import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

/**
 * Erro de aplicação com status HTTP explícito.
 * Use `throw new AppError(404, "Registro não encontrado")` nos services/controllers.
 */
export class AppError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

/**
 * Traduz erros Prisma conhecidos em respostas HTTP amigáveis.
 */
function getPrismaErrorInfo(err: unknown, method: string): { status: number; message: string } | null {
  if (typeof err !== "object" || err === null) return null;
  const code = (err as { code?: string }).code;

  switch (code) {
    case "P2002":
      return { status: 409, message: "Já existe um registro com esses dados (campo único duplicado)." };
    case "P2025":
      return { status: 404, message: "Registro não encontrado para essa operação." };
    case "P2003":
      // Em DELETE, a violação de chave estrangeira significa que há registros vinculados
      if (method === "DELETE") {
        return { status: 409, message: "O registro possui outros registros vinculados e não pode ser removido." };
      }
      return { status: 400, message: "Registro relacionado não existe. Verifique os IDs informados." };
    default:
      return null;
  }
}

/**
 * Middleware global de erros. Plugado no final do pipeline em src/index.ts.
 */
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }

  // JSON malformado no corpo da requisição
  if ((err as { type?: string })?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "JSON inválido no corpo da requisição." });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Dados inválidos.",
      erros: err.issues.map((issue) => ({
        campo: issue.path.join("."),
        mensagem: issue.message,
      })),
    });
  }

  const prismaError = getPrismaErrorInfo(err, req.method);
  if (prismaError) {
    return res.status(prismaError.status).json({ error: prismaError.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Erro interno do servidor." });
}
