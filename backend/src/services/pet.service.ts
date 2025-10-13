import prisma from "../db/prismaClient";
import { Agendamento, Consulta, Prisma } from "@prisma/client";

type createPetInput = {
    nome: string,
    especie: string,
    raca: string,
    dataNascimento: Date,
    tutorId: number;
    agendamento?: Prisma.AgendamentoCreateNestedManyWithoutPetInput;
    consulta?: Prisma.ConsultaCreateNestedManyWithoutPetInput;
};

type updatePetInput = {
    nome?: string,
    especie?: string,
    raca?: string,
    dataNascimento?: Date,
    tutorId?: number;
    agendamento?: Prisma.AgendamentoCreateNestedManyWithoutPetInput;
    consulta?: Prisma.ConsultaCreateNestedManyWithoutPetInput;
}

const petService = {
    getAll: () => prisma.pet.findMany({ include: { agendamentos: true, consultas: true } }),
    getById: (id: number) => prisma.pet.findUnique({ where: { id }, include: { agendamentos: true, consultas: true } }),
    create: (data: createPetInput) =>
        prisma.pet.create({
            data: {
                ...data,
                consultas: data.consulta ? data.consulta : undefined,
                agendamentos: data.agendamento ? data.agendamento : undefined,
            },
        }),
    update: (id: number, data: updatePetInput) =>
        prisma.pet.update({
            where: { id },
            data: {
                ...data,
                consultas: data.consulta ? data.consulta : undefined,
                agendamentos: data.agendamento ? data.agendamento : undefined,
            },
        }),
    delete: (id: number) => prisma.pet.delete({ where: { id } }),
    canGerenteDelete: async (gerenteId: number) => {
        const gerente = await prisma.gerente.findUnique({ where: { id: gerenteId } });
        return !!gerente;
    },
};

export default petService;
