import veterinarioService from "../services/veterinario.service";
import { createCrudController } from "./crud.controller";

const veterinarioController = createCrudController({
  service: veterinarioService,
  nomeRecurso: "Veterinário",
});

export default veterinarioController;
