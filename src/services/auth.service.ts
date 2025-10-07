import prisma from "../db/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo";

export const authService = {
    login: async (email: string, senha: string) => {
        const user = await prisma.gerente.findUnique({ where: { email } });
        if (!user) return null;

        const senhaValida = await bcrypt.compare(senha, user.senha);
        if (!senhaValida) return null;

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "1h" });
        return { user: { id: user.id, nome: user.nome, email: user.email }, token };
    }
};
