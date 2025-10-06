import { Router } from "express";
import gerenteRoutes from "./gerente.routes";
import veterinarioRoutes from "./veterinario.routes";
import tutorRoutes from "./tutor.routes";


const router = Router();

router.get("", (req, res) => {
  res.send(`
    <h1>Rotas disponível</h1>
    <ul>
        <li><a href="/api/gerente">Gerente</a></li>
        <li><a href="/api/veterinario">Veterinario</a></li>
        <li><a href="/api/tutor">Tutor</a></li>
    </ul>
  `);
});

router.use("/gerente", gerenteRoutes);
router.use("/veterinario", veterinarioRoutes);
router.use("/tutor", tutorRoutes);

export default router;
