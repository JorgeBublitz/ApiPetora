import prisma from "../db/prismaClient";
import { hashUtil } from "../utils/hash.util";
import { Prisma } from "@prisma/client";

type createVeterinarioInput = {
    nome: string;
    email: string;
    senha: string;
    especialidade: string;
    consulta?: Prisma.ConsultaCreateNestedManyWithoutVeterinarioInput;
};

type updateVeterinarioInput = {
    nome?: string;
    email?: string;
    senha?: string;
    especialidade?: string;
    consulta?: Prisma.ConsultaUpdateManyWithoutVeterinarioNestedInput;
};

const veterinarioService = {
    getAll: () =>
        prisma.veterinario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
                especialidade: true,
                consulta: { select: { id: true, data: true, descricao: true, tratamento: true, petId: true } },
            },
        }),
    getById: (id: number) =>
        prisma.veterinario.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
                especialidade: true,
                consulta: { select: { id: true, data: true, descricao: true, tratamento: true, petId: true } },
            },
        }),
    create: async (data: createVeterinarioInput) => {
        const senha = await hashUtil.hash(data.senha);
        return prisma.veterinario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha,
                especialidade: data.especialidade,
                consulta: data.consulta ? data.consulta : undefined,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                especialidade: true,
                consulta: { select: { id: true, data: true, descricao: true, tratamento: true, petId: true } },
            },
        });
    },
    update: async (id: number, data: updateVeterinarioInput) => {
        const updateData: updateVeterinarioInput = { ...data };
        if (data.senha) {
            updateData.senha = await hashUtil.hash(data.senha);
        }
        return prisma.veterinario.update({
            where: { id },
            data: {
                ...updateData,
                consulta: updateData.consulta ? updateData.consulta : undefined,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                especialidade: true,
                consulta: { select: { id: true, data: true, descricao: true, tratamento: true, petId: true } },
            },
        });
    },
    delete: (id: number) => prisma.veterinario.delete({ where: { id } }),
    canGerenteDelete: async (gerenteId: number) => {
        const gerente = await prisma.gerente.findUnique({ where: { id: gerenteId } });
        return !!gerente;
    },
};

export default veterinarioService;
