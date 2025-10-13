import prisma from "../db/prismaClient";
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
    getAll: () => prisma.veterinario.findMany({ include: { consulta: true } }),
    getById: (id: number) => prisma.veterinario.findUnique({ where: { id }, include: { consulta: true } }),
    create: (data: createVeterinarioInput) =>
        prisma.veterinario.create({
            data: {
                ...data,
                consulta: data.consulta ? data.consulta : undefined,
            },
        }),
    update: (id: number, data: updateVeterinarioInput) =>
        prisma.veterinario.update({
            where: { id },
            data: {
                ...data,
                consulta: data.consulta ? data.consulta : undefined,
            },
        }),
    delete: (id: number) => prisma.veterinario.delete({ where: { id } }),
    canGerenteDelete: async (gerenteId: number) => {
        const gerente = await prisma.gerente.findUnique({ where: { id: gerenteId } });
        return !!gerente;
    },
};

export default veterinarioService;
