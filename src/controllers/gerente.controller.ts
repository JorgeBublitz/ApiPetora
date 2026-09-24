import type { Request, Response } from "express";
import gerenteService from "../services/gerente.service";
import { createCrudController } from "./crud.controller";
import { AppError } from "../middlewares/errorHandler";

const crud = createCrudController({
  service: gerenteService,
  nomeRecurso: "Gerente",
});

const gerenteController = {
  ...crud,

  // Impede que o gerente logado remova a própria conta e perca o acesso administrativo
  delete: async (req: Request, res: Response) => {
    if (req.user?.id === Number(req.params.id)) {
      throw new AppError(400, "Você não pode remover a sua própria conta.");
    }
    return crud.delete(req, res);
  },
};

export default gerenteController;
