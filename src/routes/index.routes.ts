import { Router } from "express";
import gerenteRoutes from "./gerente.routes";
import tutorRoutes from "./tutor.routes";

const router = Router();

router.get("/", (req, res) => {
    res.send(`
    <h1>Rotas disponível</h1>
    <ul>
        <li><a href="/api/gerente">/api/gerente</a></li>
        <li><a href="/api/tutor">/api/tutor</a></li>
    </ul>
  `);
});

router.use("/gerente", gerenteRoutes);
router.use("/tutor", tutorRoutes);

export default router;
