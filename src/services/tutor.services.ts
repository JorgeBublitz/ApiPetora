import prisma from "../db/prismaClient";

type createTutorInput = {
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
};

type updateTutorInput = Partial<createTutorInput>;

const tutorService = {
  getAll: () => prisma.tutor.findMany(),
  getById: (id: number) => prisma.tutor.findUnique({ where: { id } }),
  create: (data: createTutorInput) => prisma.tutor.create({ data }),
  update: (id: number, data: updateTutorInput) => prisma.tutor.update({ where: { id }, data }),
  delete: (id: number) => prisma.tutor.delete({ where: { id } }),
};

export default tutorService; 