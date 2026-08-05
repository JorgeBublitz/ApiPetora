import petService from "../services/pet.service";
import { createCrudController } from "./crud.controller";

const petController = createCrudController({
  service: petService,
  nomeRecurso: "Pet",
});

export default petController;
