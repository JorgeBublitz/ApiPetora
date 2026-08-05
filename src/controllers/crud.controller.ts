import type { Request, Response } from "express";
import { AppError } from "../middlewares/errorHandler";

type Service = {
  getAll: () => Promise<unknown[]>;
  getById: (id: number) => Promise<unknown | null>;
  create: (data: any) => Promise<unknown>;
  update: (id: number, data: any) => Promise<unknown>;
  delete: (id: number) => Promise<unknown>;
};

type CrudControllerOptions = {
  service: Service;
  nomeRecurso: string;
  sanitize?: (data: any) => any;
  conflictMessage?: string;
  referenceMessage?: string;
};

function capitalize(palavra: string) {
  return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

/**
 * Factory de controller CRUD.
 * Centraliza o fluxo: validação (prévia, via middleware), operação no service
 * e tratamento de erros (404 / 409 / 400 / 500) em um único lugar.
 *
 * @example
 * const gerenteController = createCrudController({
 *   service: gerenteService,
 *   nomeRecurso: "Gerente",
 * });
 */
export function createCrudController({
  service,
  nomeRecurso,
  sanitize,
  conflictMessage,
  referenceMessage,
}: CrudControllerOptions) {
  const Nome = capitalize(nomeRecurso);
  const conflito =
    conflictMessage ?? `Já existe ${nomeRecurso} com esses dados (campo único duplicado).`;
  const referencia =
    referenceMessage ?? `Registro relacionado não existe. Verifique os IDs informados.`;

  return {
    getAll: async (_req: Request, res: Response) => {
      const registros = await service.getAll();

      if (registros.length === 0) {
        return res.status(200).json({ message: `Nenhum ${nomeRecurso} encontrado.` });
      }

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
      const data = sanitize ? sanitize(req.body) : req.body;
      const novoRegistro = await service.create(data);

      res.status(201).json({
        message: `${Nome} criado com sucesso.`,
        data: novoRegistro,
      });
    },

    update: async (req: Request, res: Response) => {
      const id = Number(req.params.id);
      const data = sanitize ? sanitize(req.body) : req.body;

      const registro = await service.update(id, data);
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
