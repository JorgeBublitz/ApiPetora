import prisma from "../db/prismaClient";

type createConsultaInput = {
    data: Date,
    veterinarioId: number,
    petId: number,
    descricao: string,
    tratamento?: string
}

type updateConsultaInput = {
    data?: Date,
    veterinarioId?: number,
    petId?: number,
    descricao?: string,
    tratamento?: string
}


const consultaService = {
    getAll: () => prisma.consulta.findMany(),
    getById: (id: number) => prisma.consulta.findUnique({ where: { id } }),
    create: (data: createConsultaInput) => prisma.consulta.create({ data }),
    update: (id: number, data: updateConsultaInput) => prisma.consulta.update({ where: { id }, data }),
    delete: (id: number) => prisma.consulta.delete({ where: { id } }),
};


export default consultaService;
