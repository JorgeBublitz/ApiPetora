import prisma from "../db/prismaClient";

// Tipos de entrada
type createAgendamentoInput = {
    data: Date,
    servico: string,
    observacao?: string,
    petId: number
}

type updateAgendamentoInput = {
    data?: Date,
    servico?: string,
    observacao?: string,
    petId?: number
}

const agendamentoService = {
    getAll: () => prisma.agendamento.findMany(),
    getById: (id: number) => prisma.agendamento.findUnique({ where: { id } }),
    create: (data: createAgendamentoInput) => prisma.agendamento.create({ data }),
    update: (id: number, data: updateAgendamentoInput) => prisma.agendamento.update({ where: { id }, data }),
    delete: (id: number) => prisma.agendamento.delete({ where: { id } }),
};

export default agendamentoService;
