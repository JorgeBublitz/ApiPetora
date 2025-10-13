# API Petora

API para gerenciamento de pets, tutores, veterinários, agendamentos e consultas, construída com **Node.js**, **Express** e **Prisma** (PostgreSQL).

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- 🟢 **Node.js**
- 📦 **npm** ou **Yarn**
- 🐘 **PostgreSQL** (ou outro banco compatível)
- 🧪 **Postman** ou **Insomnia** (opcional, para testar a API)

---

## 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/petshop-api.git
cd petshop-api
```
### 2. Instalar dependências
```bash
npm install
```
### 3. Configurar variáveis de ambiente
Crie um arquivo ```.env``` na raiz do projeto com as seguintes variáveis:
```bash
# Banco de dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
```
Substitua ```usuario, senha e nome_do_banco``` pelas informações do seu banco.

### 4. Configurar o banco de dados
```bash
npx prisma migrate dev --name init
```
### 5. Rodar a aplicação
```bash
npm run dev
```
A aplicação estará rodando em ```http://localhost:3000```.

### 6. Comandos úteis
```bash
# Rodar migrations
npx prisma migrate dev

# Resetar o banco e rodar seed novamente
npx prisma migrate reset
```
### Tecnologias utilizadas

- Node.js + Express
- Prisma ORM
- PostgreSQL
- TypeScript
