import prisma from "../db/prismaCliente";

type createTutorInput = {
  nome: String;
  email: String;
  telefone: string;
  endereco: String;
};

type updateTutorInput = Partial<createTutorInput>;

const tutorService = {
  getAll: () => prima.tutor.findmany(),
  getById: (id: number) => prisma.tutor.findUnique({ where: { id } }),
  create: (data: createTutorInput) => prisma.tutor.create({ data }),
  update: (id: number, data: updateTutorInput) => prisma.tutor.update({ where: { id }, data }),
  delete: (id: number) => prisma.tutor.delete({ where: { id } }),
};

export default tutorService;  
