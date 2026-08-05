import prisma from "../db/prismaClient";
import { hashUtil } from "../utils/hash.util";

type createGerenteInput = {
  nome: string;
  email: string;
  senha: string;
};

type updateGerenteInput = Partial<createGerenteInput>;

const gerenteService = {
  getAll: () =>
    prisma.gerente.findMany({
      select: { id: true, nome: true, email: true, createdAt: true, updatedAt: true },
    }),
  getById: (id: number) =>
    prisma.gerente.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true, createdAt: true, updatedAt: true },
    }),
  create: async (data: createGerenteInput) => {
    const senha = await hashUtil.hash(data.senha);
    return prisma.gerente.create({
      data: { nome: data.nome, email: data.email, senha },
      select: { id: true, nome: true, email: true, createdAt: true },
    });
  },
  update: async (id: number, data: updateGerenteInput) => {
    const updateData: updateGerenteInput = { ...data };
    if (data.senha) {
      updateData.senha = await hashUtil.hash(data.senha);
    }
    return prisma.gerente.update({
      where: { id },
      data: updateData,
      select: { id: true, nome: true, email: true, updatedAt: true },
    });
  },
  delete: (id: number) => prisma.gerente.delete({ where: { id } }),
};

export default gerenteService;
