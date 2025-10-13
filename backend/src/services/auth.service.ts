import prisma from "../db/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_super_secreto";

export const authService = {
    // 🔐 LOGIN
    login: async (email: string, senha: string) => {
        const user = await prisma.gerente.findUnique({ where: { email } });
        if (!user) return null;
        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) return null;
        // Gera tokens
        const accessToken = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, REFRESH_SECRET, { expiresIn: "7d" });
        // Salva o refresh token no banco
        await prisma.refreshToken.create({
            data: {
                token: refreshToken,
                gerenteId: user.id
            }
        });
        return {
            user: { id: user.id, nome: user.nome, email: user.email },
            accessToken,
            refreshToken
        };
    },

    // 🔄 REFRESH TOKEN
    refreshToken: async (token: string) => {
        if (!token) return null;

        const tokenSalvo = await prisma.refreshToken.findUnique({ where: { token } });
        if (!tokenSalvo) return null;

        try {
            const payload = jwt.verify(token, REFRESH_SECRET) as { id: number; email: string };
            const novoAccessToken = jwt.sign({ id: payload.id, email: payload.email }, SECRET, { expiresIn: "1h" });
            return { accessToken: novoAccessToken };
        } catch {
            return null;
        }
    },

    // 🚪 LOGOUT
    logout: async (token: string) => {
        await prisma.refreshToken.deleteMany({ where: { token } });
        return true;
    }
};
