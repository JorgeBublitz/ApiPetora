import express from "express";
import routes from "./routes/index.routes"

import { swaggerDocs } from "./config/swagger";

const app = express();
app.use(express.json());

app.use("/api", routes);


// Swagger
swaggerDocs(app);
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server rodando em http://localhost:${PORT}/api`);
});
