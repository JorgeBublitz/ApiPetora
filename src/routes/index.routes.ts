import { Router } from "express";
import gerenteRoutes from "./gerente.routes";
import veterinarioRoutes from "./veterinario.routes";
import tutorRoutes from "./tutor.routes";
import petRoutes from "./pet.routes";
import consultaRoutes from "./consulta.routes";
import agendamentoRoutes from "./agendamento.routes";

const router = Router();

router.get("", (_req, res) => {
  res.send(`
    <h1>Rotas disponíveis</h1>
    <ul>
      <li><a href="/api/gerente">Gerente</a></li>
      <li><a href="/api/veterinario">Veterinario</a></li>
      <li><a href="/api/tutor">Tutor</a></li>
      <li><a href="/api/pets">Pets</a></li>
      <li><a href="/api/consultas">Consultas</a></li>
      <li><a href="/api/agendamentos">Agendamentos</a></li>
    </ul>
  `);
});

// rotas principais
router.use("/gerente", gerenteRoutes);
router.use("/veterinario", veterinarioRoutes);
router.use("/tutor", tutorRoutes);
router.use("/pet", petRoutes);
router.use("/consulta", consultaRoutes);
router.use("/agendamento", agendamentoRoutes);

export default router;
