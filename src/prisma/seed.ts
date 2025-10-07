// Arquivo: prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
    // ===== Gerentes =====
    const gerente1 = await prisma.gerente.create({
        data: {
            nome: "Alice Silva",
            email: "alice@admin.com",
            senha: await bcrypt.hash("senha1234", 10),
        },
    });

    const gerente2 = await prisma.gerente.create({
        data: {
            nome: "Bruno Costa",
            email: "bruno@admin.com",
            senha: await bcrypt.hash("senha5678", 10),
        },
    });

    // ===== Tutores =====
    const tutor1 = await prisma.tutor.create({
        data: {
            nome: "Carlos Souza",
            email: "carlos@email.com",
            telefone: "11999999999",
            endereco: "Rua A, 123",
        },
    });

    const tutor2 = await prisma.tutor.create({
        data: {
            nome: "Mariana Lima",
            email: "mariana@email.com",
            telefone: "11988888888",
            endereco: "Avenida B, 456",
        },
    });

    // ===== Pets =====
    const pet1 = await prisma.pet.create({
        data: {
            nome: "Rex",
            especie: "Cachorro",
            raca: "Labrador",
            dataNascimento: new Date("2018-05-10"),
            tutorId: tutor1.id,
        },
    });

    const pet2 = await prisma.pet.create({
        data: {
            nome: "Mimi",
            especie: "Gato",
            raca: "Siamês",
            dataNascimento: new Date("2020-03-15"),
            tutorId: tutor2.id,
        },
    });

    // ===== Veterinários =====
    const vet1 = await prisma.veterinario.create({
        data: {
            nome: "Dra. Fernanda",
            email: "fernanda@vet.com",
            senha: await bcrypt.hash("vet5678", 10),
            especialidade: "Cardiologia",
        },
    });

    const vet2 = await prisma.veterinario.create({
        data: {
            nome: "Dr. Ricardo",
            email: "ricardo@vet.com",
            senha: await bcrypt.hash("vet1234", 10),
            especialidade: "Dermatologia",
        },
    });

    // ===== Agendamentos =====
    const agendamento1 = await prisma.agendamento.create({
        data: {
            data: new Date("2025-10-10T10:00:00"),
            servico: "Banho",
            observacao: "Banho com shampoo antialérgico",
            petId: pet1.id,
        },
    });

    const agendamento2 = await prisma.agendamento.create({
        data: {
            data: new Date("2025-10-12T15:00:00"),
            servico: "Tosa",
            observacao: "Aparar as unhas e tosar pelo",
            petId: pet2.id,
        },
    });

    // ===== Consultas =====
    const consulta1 = await prisma.consulta.create({
        data: {
            data: new Date("2025-10-11T09:00:00"),
            veterinarioId: vet1.id,
            descricao: "Check-up cardíaco",
            tratamento: "Nenhum, apenas acompanhamento",
            petId: pet1.id,
        },
    });

    const consulta2 = await prisma.consulta.create({
        data: {
            data: new Date("2025-10-13T14:00:00"),
            veterinarioId: vet2.id,
            descricao: "Problema de pele",
            tratamento: "Pomada tópica por 7 dias",
            petId: pet2.id,
        },
    });

    console.log("Seed finalizada com sucesso!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
