import prisma from "../db/prismaClient";

type createTutorInput = {
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
};

type updateTutorInput = Partial<createTutorInput>;

const tutorService = {
  getAll: () => prisma.tutor.findMany({ include: {pets: true} }),
  getById: (id: number) => prisma.tutor.findUnique({ where: { id }, include: {pets: true} }),
  create: (data: createTutorInput) => prisma.tutor.create({ data }),
  update: (id: number, data: updateTutorInput) => prisma.tutor.update({ where: { id }, data }),
  delete: (id: number) => prisma.tutor.delete({ where: { id } }),
  canGerenteDelete: async (gerenteId: number) => {
        const gerente = await prisma.gerente.findUnique({ where: { id: gerenteId } });
        return !!gerente;
    },
};

export default tutorService; 