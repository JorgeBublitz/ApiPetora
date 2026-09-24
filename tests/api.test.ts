import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { api, criarGerente, criarVeterinario, prisma, resetDatabase, SENHA } from "./helpers";

beforeEach(resetDatabase);
afterAll(() => prisma.$disconnect());

async function criarTutorComPet(auth: Record<string, string>) {
  const tutor = await api()
    .post("/api/tutor")
    .set(auth)
    .send({ nome: "Carlos Souza", email: `carlos${Date.now()}@email.com` })
    .expect(201);
  const pet = await api()
    .post("/api/pet")
    .set(auth)
    .send({ nome: "Rex", especie: "Cachorro", raca: "Labrador", dataNascimento: "2020-05-10", tutorId: tutor.body.data.id })
    .expect(201);
  return { tutorId: tutor.body.data.id as number, petId: pet.body.data.id as number };
}

describe("Autenticação", () => {
  it("faz login de gerente e retorna o perfil em /me sem a senha", async () => {
    const gerente = await criarGerente();
    const me = await api().get("/api/auth/me").set(gerente.auth).expect(200);
    expect(me.body.tipo).toBe("GERENTE");
    expect(me.body.usuario).not.toHaveProperty("senha");
  });

  it("usa a mesma mensagem para e-mail inexistente e senha errada", async () => {
    await criarGerente();
    const semEmail = await api().post("/api/auth/login").send({ email: "x@x.com", senha: SENHA }).expect(401);
    const senhaErrada = await api()
      .post("/api/auth/login")
      .send({ email: "gerente@teste.com", senha: "Errada@1" })
      .expect(401);
    expect(semEmail.body.error).toBe(senhaErrada.body.error);
  });

  it("bloqueia rotas sem token ou com token inválido", async () => {
    await api().get("/api/tutor").expect(401);
    await api().get("/api/tutor").set("Authorization", "Bearer invalido").expect(401);
  });

  it("valida o corpo do login e JSON malformado", async () => {
    await api().post("/api/auth/login").send({ email: "nao-e-email" }).expect(400);
    await api().post("/api/auth/login").set("Content-Type", "application/json").send('{"email":').expect(400);
  });
});

describe("Controle de acesso por perfil", () => {
  it("veterinário lê e cadastra, mas não exclui nem gerencia a equipe", async () => {
    const vet = await criarVeterinario();
    const { petId } = await criarTutorComPet(vet.auth);

    await api().get("/api/pet").set(vet.auth).expect(200);
    await api().delete(`/api/pet/${petId}`).set(vet.auth).expect(403);
    await api().get("/api/gerente").set(vet.auth).expect(403);
    await api()
      .post("/api/veterinario")
      .set(vet.auth)
      .send({ nome: "Outro", email: "outro@vet.com", senha: "Senha@123", especialidade: "Cirurgia" })
      .expect(403);
  });

  it("gerente cadastra veterinário sem expor a senha", async () => {
    const gerente = await criarGerente();
    const res = await api()
      .post("/api/veterinario")
      .set(gerente.auth)
      .send({ nome: "Dra. Paula", email: "paula@vet.com", senha: "Senha@123", especialidade: "Cirurgia" })
      .expect(201);
    expect(res.body.data).not.toHaveProperty("senha");

    const lista = await api().get("/api/veterinario").set(gerente.auth).expect(200);
    expect(lista.body[0]).not.toHaveProperty("senha");
  });

  it("gerente não pode remover a própria conta", async () => {
    const gerente = await criarGerente();
    await api().delete(`/api/gerente/${gerente.id}`).set(gerente.auth).expect(400);
  });
});

describe("CRUD", () => {
  it("lista vazia retorna array", async () => {
    const gerente = await criarGerente();
    const res = await api().get("/api/tutor").set(gerente.auth).expect(200);
    expect(res.body).toEqual([]);
  });

  it("cria, busca, atualiza e remove um tutor", async () => {
    const gerente = await criarGerente();
    const criado = await api()
      .post("/api/tutor")
      .set(gerente.auth)
      .send({ nome: "Mariana Lima", email: "mariana@email.com", telefone: "83999990000" })
      .expect(201);
    const id = criado.body.data.id;

    await api().get(`/api/tutor/${id}`).set(gerente.auth).expect(200);
    const atualizado = await api().put(`/api/tutor/${id}`).set(gerente.auth).send({ endereco: "Rua B, 10" }).expect(200);
    expect(atualizado.body.data.endereco).toBe("Rua B, 10");

    await api().delete(`/api/tutor/${id}`).set(gerente.auth).expect(200);
    await api().get(`/api/tutor/${id}`).set(gerente.auth).expect(404);
  });

  it("retorna 409 para e-mail duplicado e 400 para dados inválidos", async () => {
    const gerente = await criarGerente();
    const tutor = { nome: "Mariana Lima", email: "mariana@email.com" };
    await api().post("/api/tutor").set(gerente.auth).send(tutor).expect(201);
    await api().post("/api/tutor").set(gerente.auth).send(tutor).expect(409);
    await api().post("/api/tutor").set(gerente.auth).send({ nome: "Ma", email: "invalido" }).expect(400);
  });

  it("valida o ID da URL e retorna 404 para registro inexistente", async () => {
    const gerente = await criarGerente();
    await api().get("/api/pet/abc").set(gerente.auth).expect(400);
    await api().get("/api/pet/999999").set(gerente.auth).expect(404);
    await api().put("/api/pet/999999").set(gerente.auth).send({ nome: "Bob" }).expect(404);
    await api().delete("/api/pet/999999").set(gerente.auth).expect(404);
  });

  it("retorna 400 ao cadastrar pet com tutor inexistente", async () => {
    const gerente = await criarGerente();
    await api()
      .post("/api/pet")
      .set(gerente.auth)
      .send({ nome: "Rex", especie: "Cachorro", raca: "SRD", dataNascimento: "2020-01-01", tutorId: 999999 })
      .expect(400);
  });
});

describe("Consultas, agendamentos e exclusão em cascata", () => {
  it("registra consulta e agendamento de um pet", async () => {
    const gerente = await criarGerente();
    const vet = await criarVeterinario();
    const { petId } = await criarTutorComPet(gerente.auth);

    await api()
      .post("/api/consulta")
      .set(vet.auth)
      .send({ data: "2026-10-01T14:00:00Z", veterinarioId: vet.id, petId, descricao: "Check-up" })
      .expect(201);
    await api()
      .post("/api/agendamento")
      .set(vet.auth)
      .send({ data: "2026-10-02T10:00:00Z", servico: "Banho", petId })
      .expect(201);

    const pet = await api().get(`/api/pet/${petId}`).set(vet.auth).expect(200);
    expect(pet.body.consultas).toHaveLength(1);
    expect(pet.body.agendamentos).toHaveLength(1);
  });

  it("remover um tutor remove os pets e o histórico deles", async () => {
    const gerente = await criarGerente();
    const vet = await criarVeterinario();
    const { tutorId, petId } = await criarTutorComPet(gerente.auth);
    await prisma.consulta.create({ data: { data: new Date(), veterinarioId: vet.id, petId, descricao: "Vacina" } });
    await prisma.agendamento.create({ data: { data: new Date(), servico: "Tosa", petId } });

    await api().delete(`/api/tutor/${tutorId}`).set(gerente.auth).expect(200);

    expect(await prisma.pet.count()).toBe(0);
    expect(await prisma.consulta.count()).toBe(0);
    expect(await prisma.agendamento.count()).toBe(0);
  });

  it("remover um pet remove as consultas e agendamentos dele", async () => {
    const gerente = await criarGerente();
    const vet = await criarVeterinario();
    const { petId } = await criarTutorComPet(gerente.auth);
    await prisma.consulta.create({ data: { data: new Date(), veterinarioId: vet.id, petId, descricao: "Vacina" } });

    await api().delete(`/api/pet/${petId}`).set(gerente.auth).expect(200);
    expect(await prisma.consulta.count()).toBe(0);
  });

  it("não remove veterinário que tem consultas registradas (409)", async () => {
    const gerente = await criarGerente();
    const vet = await criarVeterinario();
    const { petId } = await criarTutorComPet(gerente.auth);
    await prisma.consulta.create({ data: { data: new Date(), veterinarioId: vet.id, petId, descricao: "Vacina" } });

    await api().delete(`/api/veterinario/${vet.id}`).set(gerente.auth).expect(409);
  });
});

describe("Infraestrutura", () => {
  it("health check, 404 e Swagger", async () => {
    await api().get("/health").expect(200);
    await api().get("/api/nao-existe").expect(404);
    await api().get("/api-docs/").expect(200);
  });
});
