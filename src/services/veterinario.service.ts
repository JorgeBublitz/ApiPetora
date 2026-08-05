import prisma from "../db/prismaClient";
import { hashUtil } from "../utils/hash.util";

type createVeterinarioInput = {
  nome: string;
  email: string;
  senha: string;
  especialidade: string;
};

type updateVeterinarioInput = Partial<createVeterinarioInput>;

const veterinarioService = {
  getAll: () =>
    prisma.veterinario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        especialidade: true,
        consulta: { select: { id: true, data: true, descricao: true, tratamento: true, petId: true } },
      },
    }),
  getById: (id: number) =>
    prisma.veterinario.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        especialidade: true,
        consulta: { select: { id: true, data: true, descricao: true, tratamento: true, petId: true } },
      },
    }),
  create: async (data: createVeterinarioInput) => {
    const senha = await hashUtil.hash(data.senha);
    return prisma.veterinario.create({
      data: { nome: data.nome, email: data.email, senha, especialidade: data.especialidade },
      select: {
        id: true,
        nome: true,
        email: true,
        especialidade: true,
      },
    });
  },
  update: async (id: number, data: updateVeterinarioInput) => {
    const updateData: updateVeterinarioInput = { ...data };
    if (data.senha) {
      updateData.senha = await hashUtil.hash(data.senha);
    }
    return prisma.veterinario.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        nome: true,
        email: true,
        especialidade: true,
      },
    });
  },
  delete: (id: number) => prisma.veterinario.delete({ where: { id } }),
};

export default veterinarioService;
