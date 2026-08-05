import tutorService from "../services/tutor.service";
import { createCrudController } from "./crud.controller";

const tutorController = createCrudController({
  service: tutorService,
  nomeRecurso: "Tutor",
});

export default tutorController;
