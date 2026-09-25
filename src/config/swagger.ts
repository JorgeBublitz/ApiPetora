import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API PetShop",
            version: "1.2.0",
            description:
                "API REST para gestão de um petshop: gerentes, veterinários, tutores, pets, consultas e agendamentos. " +
                "Autenticação via JWT (Bearer token) com dois perfis de usuário — GERENTE e VETERINARIO —, cada um com " +
                "permissões próprias descritas na seção de cada recurso abaixo (leitura, criação, edição e exclusão). " +
                "Para testar: faça login em POST /auth/login com um e-mail e senha cadastrados, copie o token retornado " +
                "e clique em 'Authorize' (topo desta página) informando apenas o token, sem o prefixo 'Bearer'. " +
                "Todas as respostas de erro seguem um formato padrão ({ error } ou, em validações, { error, erros }). " +
                "A API também aplica um limite de 100 requisições a cada 15 minutos por IP.",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Servidor local",
            },
        ],
        security: [{ bearerAuth: [] }],
    },
    apis: ["./src/docs/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Application) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
