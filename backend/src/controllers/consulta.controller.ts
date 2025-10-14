import { Request, Response } from "express";
import consultaService from "../services/consulta.service";
import { createConsultaSchema, updateConsultaSchema, deleteConsultaSchema, formatZodError } from "../utils/schemas/consulta.schema";

const consultaController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const consultas = await consultaService.getAll();
            res.json(consultas);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar consultas" });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const consulta = await consultaService.getById(Number(req.params.id));
            if (!consulta) return res.status(404).json({ error: "Consulta não encontrada" });
            res.json(consulta);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar consulta" });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const data = createConsultaSchema.parse(req.body);

            const consultaData = {
                ...data,
                data: new Date(data.data)
            };

            const consulta = await consultaService.create(consultaData);
            res.status(201).json(consulta);
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const data = updateConsultaSchema.parse(req.body);

            const consultaData = {
                ...data,
                data: data.data ? new Date(data.data) : undefined
            };

            const consulta = await consultaService.update(Number(req.params.id), consultaData);
            res.json(consulta);
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },


    delete: async (req: Request, res: Response) => {
        try {
            const data = deleteConsultaSchema.parse({
                consultaId: Number(req.params.id),
                gerenteId: Number(req.body.gerenteId)
            });

            const canDelete = await consultaService.canGerenteDelete(data.gerenteId);
            if (!canDelete) return res.status(403).json({ error: "Não autorizado" });

            await consultaService.delete(data.consultaId);
            res.json({ message: "Consulta deletada com sucesso" });
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },
};

export default consultaController;
