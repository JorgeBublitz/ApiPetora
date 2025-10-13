import { Request, Response } from "express";
import agendamentoService from "../services/agendamento.service";
import { createAgendamentoSchema, updateAgendamentoSchema, deleteAgendamentoSchema, formatZodError } from "../schemas/agendamento.schema";

const agendamentoController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const agendamentos = await agendamentoService.getAll();
            res.json(agendamentos);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar agendamentos" });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const agendamento = await agendamentoService.getById(Number(req.params.id));
            if (!agendamento) return res.status(404).json({ error: "Agendamento não encontrado" });
            res.json(agendamento);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar agendamento" });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            // validação Zod
            const data = createAgendamentoSchema.parse(req.body);

            // converte string para Date
            const agendamentoData = {
                ...data,
                data: new Date(data.data)
            };

            const agendamento = await agendamentoService.create(agendamentoData);
            res.status(201).json(agendamento);
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const data = updateAgendamentoSchema.parse(req.body);

            const agendamentoData = {
                ...data,
                data: data.data ? new Date(data.data) : undefined
            };

            const agendamento = await agendamentoService.update(Number(req.params.id), agendamentoData);
            res.json(agendamento);
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const data = deleteAgendamentoSchema.parse({
                agendamentoId: Number(req.params.id),
                solicitanteId: Number(req.body.solicitanteId)
            });

            const canDelete = await agendamentoService.canGerenteDelete(data.solicitanteId);
            if (!canDelete) return res.status(403).json({ error: "Não autorizado" });

            await agendamentoService.delete(data.agendamentoId);
            res.json({ message: "Agendamento deletado com sucesso" });
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },
};

export default agendamentoController;
