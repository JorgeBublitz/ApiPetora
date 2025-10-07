import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema } from "../schemas/login.schema";
import prisma from "../db/prismaClient";

const SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

const authController = {
    login: async (req: Request, res: Response) => {
        try {
            const parsed = loginSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ erros: parsed.error });
            }

            const { email, senha } = parsed.data;

            // procura o gerente
            const gerente = await prisma.gerente.findUnique({ where: { email } });
            if (!gerente) return res.status(404).json({ erro: "Email não encontrado" });

            // compara senha
            const senhaValida = await bcrypt.compare(senha, gerente.senha);
            if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

            // gera token JWT
            const token = jwt.sign(
                { id: gerente.id, email: gerente.email },
                SECRET,
                { expiresIn: "1h" }
            );

            res.json({
                user: {
                    id: gerente.id,
                    nome: gerente.nome,
                    email: gerente.email
                },
                token
            });
        } catch (err: any) {
            console.error(err);
            res.status(500).json({ erro: "Erro interno no servidor" });
        }
    }
};

export default authController;
