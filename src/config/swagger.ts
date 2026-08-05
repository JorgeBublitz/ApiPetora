import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API PetShop",
            version: "1.0.0",
            description: "📘 Documentação da API do sistema PetShop 🐾",
        },
        servers: [
            {
                url: "http://localhost:3000/api",
                description: "Servidor local",
            },
        ],
    },
    // 👇 Aqui ficam todos os lugares onde o swagger vai procurar as anotações
    apis: [
        "./src/routes/*.ts",
        "./src/controllers/*.ts",
        "./src/docs/*.ts", // 👈 se for usar arquivos separados de documentação
    ],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: Application) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📘 Swagger disponível em: http://localhost:3000/api-docs");
};
