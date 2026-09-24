import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API PetShop",
            version: "1.2.0",
            description: "API de gestão de petshop com autenticação JWT e controle de acesso por perfil (GERENTE e VETERINARIO). Faça login em /auth/login e use o botão Authorize.",
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
