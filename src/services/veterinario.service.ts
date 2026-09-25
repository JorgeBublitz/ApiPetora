import prisma from "../db/prismaClient";
import { hashUtil } from "../utils/hash.util";
import { AppError } from "../middlewares/errorHandler";

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
    // Gerente e Veterinario têm restrições de unicidade de e-mail independentes (tabelas
    // separadas), então este check é apenas uma camada extra em nível de aplicação — ainda
    // sujeito a race condition entre a checagem e o create (não coberto por transação/lock).
    const emailEmUsoPorGerente = await prisma.gerente.findUnique({
      where: { email: data.email },
      select: { id: true },
    });
    if (emailEmUsoPorGerente) {
      throw new AppError(409, "Este e-mail já está em uso.");
    }

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
