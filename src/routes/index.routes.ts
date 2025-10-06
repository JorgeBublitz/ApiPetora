import { Router } from "express";
import gerenteRoutes from "./gerente.routes";

const router = Router();

router.get("", (req, res) => {
  res.send(`
    <h1>Rotas disponível</h1>
    <ul>
        <li><a href="/api/anime">/api/gerente</a></li>
    </ul>
  `);
});

router.use("/gerente", gerenteRoutes);

export default router;
