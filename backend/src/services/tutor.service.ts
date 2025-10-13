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
  
  canGerenteDelete: async (gerenteId: number) => {
      return !!(await prisma.gerente.findUnique({ where: { id: gerenteId } }));
  },

  delete: async (tutorId: number) => {
      // Busca todos os pets do tutor
      const pets = await prisma.pet.findMany({ 
          where: { tutorId }, 
          include: { agendamentos: true, consultas: true } 
      });

      // Deleta agendamentos e consultas de cada pet
      for (const pet of pets) {
          await prisma.agendamento.deleteMany({ where: { petId: pet.id } });
          await prisma.consulta.deleteMany({ where: { petId: pet.id } });
      }

      // Deleta os pets do tutor
      await prisma.pet.deleteMany({ where: { tutorId } });

      // Finalmente, deleta o tutor
      return prisma.tutor.delete({ where: { id: tutorId } });
  },
};

export default tutorService;
