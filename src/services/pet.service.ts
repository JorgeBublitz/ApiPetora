import prisma from "../db/prismaClient";

type createPetInput = {
  nome: string;
  especie: string;
  raca: string;
  dataNascimento: Date;
  tutorId: number;
};

type updatePetInput = Partial<createPetInput>;

const petService = {
  getAll: () => prisma.pet.findMany({ include: { agendamentos: true, consultas: true } }),
  getById: (id: number) =>
    prisma.pet.findUnique({ where: { id }, include: { agendamentos: true, consultas: true } }),
  create: (data: createPetInput) => prisma.pet.create({ data }),
  update: (id: number, data: updatePetInput) => prisma.pet.update({ where: { id }, data }),
  delete: (id: number) => prisma.pet.delete({ where: { id } }),
};

export default petService;
