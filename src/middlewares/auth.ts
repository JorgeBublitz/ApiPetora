import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppError } from "./errorHandler";

export type TipoUsuario = "GERENTE" | "VETERINARIO";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; tipo: TipoUsuario };
    }
  }
}

/**
 * Extrai e valida o token JWT do header Authorization.
 * Coloca `req.user = { id, tipo }` para uso nos controllers.
 */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return next(new AppError(401, "Token não fornecido."));
  }

  const token = header.slice(7);

  try {
    const payload = jwt.verify(token, env.jwtSecret) as jwt.JwtPayload;

    const id = Number(payload.sub);
    const tipo = payload.tipo as TipoUsuario;

    if (!id || !["GERENTE", "VETERINARIO"].includes(tipo)) {
      return next(new AppError(401, "Token inválido."));
    }

    req.user = { id, tipo };
    next();
  } catch {
    return next(new AppError(401, "Token inválido ou expirado."));
  }
}

/**
 * Restringe o acesso a determinados tipos de usuário.
 * Deve ser usado APÓS `authenticate`.
 *
 * @example router.delete("/:id", authenticate, authorize("GERENTE"), controller.delete);
 */
export function authorize(...tipos: TipoUsuario[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return next(new AppError(401, "Não autenticado."));
    }

    if (!tipos.includes(user.tipo)) {
      return next(new AppError(403, "Acesso negado para o seu perfil."));
    }

    next();
  };
}
