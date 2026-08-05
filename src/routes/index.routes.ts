import { Router } from "express";
import authRoutes from "./auth.routes";
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
      <li><a href="/api/auth/login">Auth - Login</a></li>
      <li><a href="/api/gerente">Gerente</a></li>
      <li><a href="/api/veterinario">Veterinario</a></li>
      <li><a href="/api/tutor">Tutor</a></li>
      <li><a href="/api/pet">Pets</a></li>
      <li><a href="/api/consulta">Consultas</a></li>
      <li><a href="/api/agendamento">Agendamentos</a></li>
    </ul>
  `);
});

// rotas principais
router.use("/auth", authRoutes);
router.use("/gerente", gerenteRoutes);
router.use("/veterinario", veterinarioRoutes);
router.use("/tutor", tutorRoutes);
router.use("/pet", petRoutes);
router.use("/consulta", consultaRoutes);
router.use("/agendamento", agendamentoRoutes);

export default router;
