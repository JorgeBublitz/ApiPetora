import type { Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler";

type Service<TCreate, TUpdate> = {
  getAll: () => Promise<unknown[]>;
  getById: (id: number) => Promise<unknown | null>;
  create: (data: TCreate) => Promise<unknown>;
  update: (id: number, data: TUpdate) => Promise<unknown>;
  delete: (id: number) => Promise<unknown>;
};

type CrudControllerOptions<TCreate, TUpdate> = {
  service: Service<TCreate, TUpdate>;
  nomeRecurso: string;
};

function capitalize(palavra: string) {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

/**
 * Factory de controller CRUD.
 * Centraliza o fluxo CRUD. A validação acontece antes, nos middlewares Zod,
 * e os erros (404 / 409 / 400 / 500) são tratados pelo errorHandler global.
 *
 * @example
 * const gerenteController = createCrudController({
 *   service: gerenteService,
 *   nomeRecurso: "Gerente",
 * });
 */
export function createCrudController<TCreate, TUpdate>({
  service,
  nomeRecurso,
}: CrudControllerOptions<TCreate, TUpdate>) {
  const Nome = capitalize(nomeRecurso);

  return {
    getAll: async (_req: Request, res: Response) => {
      // Sempre retorna um array (vazio quando não há registros), para o cliente tratar de um jeito só
      const registros = await service.getAll();
      res.json(registros);
    },

    getById: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      const registro = await service.getById(id);

      if (!registro) {
        throw new AppError(404, `${Nome} não encontrado.`);
      }

      res.json(registro);
    },

    create: async (req: Request, res: Response) => {
      // req.body já foi validado pelo schema Zod da rota
      const novoRegistro = await service.create(req.body as TCreate);

      res.status(201).json({
        message: `${Nome} criado com sucesso.`,
        data: novoRegistro,
      });
    },

    update: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      const registro = await service.update(id, req.body as TUpdate);
      res.json({
        message: `${Nome} atualizado com sucesso.`,
        data: registro,
      });
    },

    delete: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      await service.delete(id);

      res.json({ message: `${Nome} deletado com sucesso.` });
    },
  };
}
