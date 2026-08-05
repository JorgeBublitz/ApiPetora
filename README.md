# 🐾 API Petora

API para gerenciamento de **petshop**: tutores, pets, veterinários, agendamentos e consultas, construída com **Node.js**, **Express** e **Prisma** (PostgreSQL).

---

## ✨ Funcionalidades

| Módulo | Descrição |
| :--- | :--- |
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
- **Zod** (validação de schemas)
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

Preencha a `DATABASE_URL` com os dados do seu banco.

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
| Gerente | `/api/gerente` |
| Veterinário | `/api/veterinario` |
| Tutor | `/api/tutor` |
| Pet | `/api/pet` |
| Consulta | `/api/consulta` |
| Agendamento | `/api/agendamento` |

Cada rota oferece `GET /`, `GET /:id`, `POST /`, `PUT /:id` e `DELETE /:id`.

---

## 📝 Licença

MIT
