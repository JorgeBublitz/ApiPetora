import { get } from "http";
import prisma from "../db/prismaClient";
import bcrypt from "bcrypt";

type createGerenteInput = {
    nome: string;
    email: string;
    senha: string;
};

type updateGerenteInput = Partial<createGerenteInput>;

const gerenteService = {
    getAll: () => prisma.gerente.findMany(),
    getById: (id: string) => prisma.gerente.findUnique({ where: { id } }),

    getByEmail: (email: string) => prisma.gerente.findUnique({ where: { email } }),
    getByName: (nome: string) => prisma.gerente.findMany({ where: { nome: { contains: nome, mode: "insensitive" } } }),

    create: async (data: createGerenteInput) => {
        const hashedPassword = await bcrypt.hash(data.senha, 10);
        return prisma.gerente.create({
            data: {
                ...data,
                password: hashedPassword,
            }
        })
    },
    update: async (id: string, data: updateGerenteInput) => {
        if (data.email) {
            const existing = await prisma.gerente.findUnique({ where: { email: data.email } });
            if (existing && existing.id !== id) {
                throw new Error("Email já está em uso por outro gerente.");
            }
        }
        if (data.senha) {
            data.senha = await bcrypt.hash(data.senha, 10);
        }
        return prisma.gerente.update({
            where: { id },
            data,
        });
    },
    delete: async (id: string) => {
        const gerente = await prisma.gerente.findUnique({ where: { id } });
        if (!gerente) {
            throw new Error("Gerente não encontrado");
        }
        return prisma.gerente.delete({ where: { id } });
    },
};

export default gerenteService;