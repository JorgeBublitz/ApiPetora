import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export function autenticarToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ erro: "Token não fornecido" });

  try {
    const payload = jwt.verify(token, SECRET) as { id: number; email: string };
    req.user = payload; 
    next();
  } catch {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}
