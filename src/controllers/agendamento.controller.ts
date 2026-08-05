import agendamentoService from "../services/agendamento.service";
import { createCrudController } from "./crud.controller";

const agendamentoController = createCrudController({
  service: agendamentoService,
  nomeRecurso: "Agendamento",
});

export default agendamentoController;
