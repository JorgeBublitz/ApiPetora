import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
    // 🔐 LOGIN
    login: async (req: Request, res: Response) => {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ erro: "Email e senha são obrigatórios" });
            }

            const resultado = await authService.login(email, senha);

            if (!resultado) {
                return res.status(401).json({ erro: "Credenciais inválidas" });
            }

            return res.status(200).json(resultado);
        } catch (erro) {
            console.error("Erro no login:", erro);
            return res.status(500).json({ erro: "Erro interno no servidor" });
        }
    },

    // 🔄 REFRESH TOKEN
    refresh: async (req: Request, res: Response) => {
        try {
            const token = req.headers["x-refresh-token"] as string; // 👈 token via header

            if (!token) {
                return res.status(400).json({ erro: "Refresh token não fornecido" });
            }

            const novoToken = await authService.refreshToken(token);

            if (!novoToken) {
                return res.status(401).json({ erro: "Refresh token inválido ou expirado" });
            }

            return res.status(200).json(novoToken);
        } catch (erro) {
            console.error("Erro ao renovar token:", erro);
            return res.status(500).json({ erro: "Erro interno no servidor" });
        }
    },

    // 🚪 LOGOUT
    logout: async (req: Request, res: Response) => {
        try {
            const token = req.headers["x-refresh-token"] as string;

            if (!token) {
                return res.status(400).json({ erro: "Refresh token não fornecido" });
            }

            await authService.logout(token);
            return res.status(200).json({ mensagem: "Logout realizado com sucesso" });
        } catch (erro) {
            console.error("Erro no logout:", erro);
            return res.status(500).json({ erro: "Erro interno no servidor" });
        }
    },
};
