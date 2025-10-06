import { Router } from "express";
import gerenteRoutes from "./gerente.routes";
import veterinarioRoutes from "./veterinario.routes"

const router = Router();

router.get("", (req, res) => {
  res.send(`
    <h1>Rotas disponível</h1>
    <ul>
        <li><a href="/api/gerente">/api/gerente</a></li>
        <li><a href="/api/veterinario">/api/veterinario</a></li>
    </ul>
  `);
});

router.use("/gerente", gerenteRoutes);
router.use("/veterinario", veterinarioRoutes)

export default router;