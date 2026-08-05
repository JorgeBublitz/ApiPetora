import consultaService from "../services/consulta.service";
import { createCrudController } from "./crud.controller";

const consultaController = createCrudController({
  service: consultaService,
  nomeRecurso: "Consulta",
});

export default consultaController;
