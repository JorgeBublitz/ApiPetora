import prisma from "../db/prismaClient";

type createTutorInput = {
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
};

type updateTutorInput = Partial<createTutorInput>;

const tutorService = {
  getAll: () => prisma.tutor.findMany({ include: { pets: true } }),
  getById: (id: number) => prisma.tutor.findUnique({ where: { id }, include: { pets: true } }),
  create: (data: createTutorInput) => prisma.tutor.create({ data }),
  update: (id: number, data: updateTutorInput) => prisma.tutor.update({ where: { id }, data }),

  // Remove o tutor junto com os pets e o histórico deles, tudo em uma única transação
  delete: (tutorId: number) =>
    prisma.$transaction(async (tx) => {
      const pets = await tx.pet.findMany({ where: { tutorId }, select: { id: true } });
      const petIds = pets.map((pet) => pet.id);

      await tx.agendamento.deleteMany({ where: { petId: { in: petIds } } });
      await tx.consulta.deleteMany({ where: { petId: { in: petIds } } });
      await tx.pet.deleteMany({ where: { tutorId } });

      return tx.tutor.delete({ where: { id: tutorId } });
    }),
};

export default tutorService;
