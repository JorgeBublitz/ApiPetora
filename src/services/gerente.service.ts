import prisma from "../db/prismaClient";

type createGerenteInput = {
    nome: string;
    email: string;
    senha: string;
};

type updateGerenteInput = Partial<createGerenteInput>;

const gerenteService = {
    getAll: () => prisma.gerente.findMany(),
    getById: (id: number) => prisma.gerente.findUnique({ where: { id } }),
    create: (data: createGerenteInput) => prisma.gerente.create({ data }),
    update: (id: number, data: updateGerenteInput) => prisma.gerente.update({ where: { id }, data }),
    delete: (id: number) => prisma.gerente.delete({ where: { id } }),
};

export default gerenteService;