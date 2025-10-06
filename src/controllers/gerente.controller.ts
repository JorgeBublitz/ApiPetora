import type { Request, Response } from "express";
import gerenteService from "../services/gerente.service";
import {
    createGerenteSchema,
    updateGerenteSchema,
    deleteGerenteSchema,
    formatZodError
} from "../schemas/gerente.schema"

const gerenteController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const gerentes = await gerenteService.getAll();

            if (gerentes.length === 0) {
                return res.status(200).json({ message: "Nenhum gerente encontrado!" });
            }
            res.json(gerentes);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const gerente = await gerenteService.getById(id);

            if (!gerente)
                return res.status(404).json({ error: "Gerente não encontrado" });

            res.json(gerente);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const data = createGerenteSchema.parse(req.body);
            const newGerente = await gerenteService.create(data);

            res.status(201).json({
                message: "Gerente criado com sucesso",
                data: newGerente,
            });
        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data = updateGerenteSchema.parse(req.body);

            const updatedGerente = await gerenteService.update(id, data);
            res.json(updatedGerente);
        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const data = deleteGerenteSchema.parse({
                id: Number(req.params.id),
                gerenteId: Number(req.body.gerenteId),
            });

            await gerenteService.delete(data.id);
            res.json({ message: "Gerente deletado com sucesso" });
        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },
};

export default gerenteController;
