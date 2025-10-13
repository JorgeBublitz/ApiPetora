import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API PetShop",
            version: "1.1.0",
            description: "📘 Documentação da API do sistema PetShop 🐾",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Servidor local",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Token de acesso (JWT). Exemplo: Bearer <token>",
                },
                refreshToken: {
                    type: "apiKey",
                    in: "header",
                    name: "x-refresh-token",
                    description: "Token de atualização (Refresh Token)",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        "./src/routes/*.ts",
        "./src/controllers/*.ts",
        "./src/docs/*.ts",
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📘 Swagger disponível em: http://localhost:3000/api-docs");
};
