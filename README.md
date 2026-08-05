# 🐾 API Petora

> 🎓 **Projeto Acadêmico** — desenvolvido durante o curso de Ciência da Computação (UNIPE).

API para gerenciamento de **petshop**: tutores, pets, veterinários, agendamentos e consultas, construída com **Node.js**, **Express** e **Prisma** (PostgreSQL).

---

## ✨ Funcionalidades

| Módulo | Descrição |
| :--- | :--- |
| Autenticação | Login JWT (`Gerente` ou `Veterinário`) + RBAC |
| Gerentes | CRUD de gerentes (com senha **hasheada** com bcrypt) |
| Veterinários | CRUD de veterinários (senha **hasheada**, nunca retornada na API) |
| Tutores | CRUD de tutores com seus pets |
| Pets | CRUD de pets (espécie, raça, data de nascimento) |
| Consultas | Registro de consultas veterinárias |
| Agendamentos | Agendamento de serviços (banho, tosa, etc.) |
| Swagger | Documentação interativa em `/api-docs` |

---

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express** 5
- **Prisma** (PostgreSQL)
- **Bcrypt** (hash de senhas)
- **Zod** (validação de schemas, body e params)
- **JWT** (autenticação com `jsonwebtoken`)
- **Helmet** + **Express Rate Limit** (segurança)

---

## ⚙️ Configuração Local

### Pré-requisitos

- 🟢 **Node.js**
- 🐘 **PostgreSQL**

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Preencha a `DATABASE_URL` com os dados do seu banco e defina um `JWT_SECRET` forte:

```bash
# Gere um segredo, por exemplo:
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

### 3. Rodar as migrações

```bash
npm run prisma:migrate
```

### 4. Rodar a aplicação

```bash
npm run dev
```

A aplicação estará rodando em `http://localhost:3000` (Swagger em `/api-docs`).

### 5. Comandos úteis

```bash
# Rodar migrations
npx prisma migrate dev

# Resetar o banco e rodar seed novamente
npx prisma migrate reset

# Rodar o seed manualmente
npm run prisma:seed
```

---

## 📡 Endpoints

| Módulo | Rotas |
| :--- | :--- |
| Autenticação | `POST /api/auth/login`, `GET /api/auth/me` |
| Gerente | `/api/gerente` |
| Veterinário | `/api/veterinario` |
| Tutor | `/api/tutor` |
| Pet | `/api/pet` |
| Consulta | `/api/consulta` |
| Agendamento | `/api/agendamento` |

Cada rota oferece `GET /`, `GET /:id`, `POST /`, `PUT /:id` e `DELETE /:id`.

---

## 🔐 Autenticação e RBAC

A API é protegida por **JWT Bearer**. Faça login para obter o token:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "alice@admin.com", "senha": "senha1234"}'
```

Resposta: `{ "token": "...", "tipo": "GERENTE", "usuario": { ... } }`

Use o token nas demais rotas:

```bash
curl http://localhost:3000/api/tutor \
  -H "Authorization: Bearer SEU_TOKEN"
```

### Regras de acesso

| Recurso | Leitura | Escrita (POST/PUT) | Exclusão |
| :--- | :--- | :--- | :--- |
| Gerente | GERENTE | GERENTE | GERENTE |
| Veterinário | Autenticado | GERENTE | GERENTE |
| Tutor / Pet / Consulta / Agendamento | Autenticado | Autenticado | GERENTE |

> ⚠️ A autorização vem do **token** (nunca do corpo da requisição). Antigamente o delete exigia `gerenteId`/`solicitanteId` enviados pelo cliente — isso era forjável e foi removido.

---

## 📝 Licença

MIT
