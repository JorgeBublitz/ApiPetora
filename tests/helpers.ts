import request from "supertest";
import app from "../src/app";
import prisma from "../src/db/prismaClient";
import { hashUtil } from "../src/utils/hash.util";

export const api = () => request(app);

export async function resetDatabase() {
  await prisma.agendamento.deleteMany();
  await prisma.consulta.deleteMany();
  await prisma.pet.deleteMany();
  await prisma.tutor.deleteMany();
  await prisma.veterinario.deleteMany();
  await prisma.gerente.deleteMany();
}

const SENHA = "Senha@123";

async function login(email: string) {
  const res = await api().post("/api/auth/login").send({ email, senha: SENHA }).expect(200);
  return { Authorization: `Bearer ${res.body.token}` };
}

/** Cria um gerente direto no banco e devolve o id e o header de autenticação. */
export async function criarGerente(email = "gerente@teste.com") {
  const gerente = await prisma.gerente.create({
    data: { nome: "Gerente Teste", email, senha: await hashUtil.hash(SENHA) },
  });
  return { id: gerente.id, auth: await login(email) };
}

/** Cria um veterinário direto no banco e devolve o id e o header de autenticação. */
export async function criarVeterinario(email = "vet@teste.com") {
  const vet = await prisma.veterinario.create({
    data: { nome: "Vet Teste", email, senha: await hashUtil.hash(SENHA), especialidade: "Clínica geral" },
  });
  return { id: vet.id, auth: await login(email) };
}

export { prisma, SENHA };
