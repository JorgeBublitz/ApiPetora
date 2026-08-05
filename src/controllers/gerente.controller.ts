import gerenteService from "../services/gerente.service";
import { createCrudController } from "./crud.controller";

const gerenteController = createCrudController({
  service: gerenteService,
  nomeRecurso: "Gerente",
});

export default gerenteController;
