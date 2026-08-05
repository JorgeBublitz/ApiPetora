import type { Request, Response } from "express";
import authService from "../services/auth.service";

const authController = {
  login: async (req: Request, res: Response) => {
    const { email, senha } = req.body;
    const resultado = await authService.login(email, senha);
    res.json(resultado);
  },

  me: async (req: Request, res: Response) => {
    const user = req.user!;
    const perfil = await authService.me(user.id, user.tipo);
    res.json({ tipo: user.tipo, usuario: perfil });
  },
};

export default authController;
