import type { Request, Response } from "express";
import gerenteService from "../services/gerente.service";
import {
    createGerenteSchema,
    updateGerenteSchema,
    deleteGerenteSchema,
    getGerenteSchema,
    formatZodError,
} from "../utils/schemas/gerente.schema";

const gerenteController = {
    /* 📘 Buscar todos */
    getAll: async (_req: Request, res: Response) => {
        try {
            const gerentes = await gerenteService.getAll();
            if (gerentes.length === 0) {
                return res.status(200).json({ message: "Nenhum gerente encontrado." });
            }
            return res.status(200).json(gerentes);
        } catch (err: any) {
            return res.status(500).json({ error: "Erro interno do servidor.", detalhe: err.message });
        }
    },

    /* 📘 Buscar por ID */
    getById: async (req: Request, res: Response) => {
        const validation = getGerenteSchema.safeParse({ id: req.params.id });
        if (!validation.success) {
            return res.status(400).json({ erros: formatZodError(validation.error) });
        }

        try {
            const gerente = await gerenteService.getById(validation.data.id);
            if (!gerente) return res.status(404).json({ error: "Gerente não encontrado." });
            return res.status(200).json(gerente);
        } catch (err: any) {
            return res.status(500).json({ error: "Erro interno do servidor.", detalhe: err.message });
        }
    },

    /* 📘 Criar gerente */
    create: async (req: Request, res: Response) => {
        const validation = createGerenteSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({ erros: formatZodError(validation.error) });
        }

        try {
            const newGerente = await gerenteService.create(validation.data);
            return res.status(201).json({
                message: "Gerente criado com sucesso!",
                data: newGerente,
            });
        } catch (err: any) {
            return res.status(500).json({ error: "Erro ao criar gerente.", detalhe: err.message });
        }
    },

    /* 📘 Atualizar gerente */
    update: async (req: Request, res: Response) => {
        const idValidation = getGerenteSchema.safeParse({ id: req.params.id });
        if (!idValidation.success) return res.status(400).json({ erros: formatZodError(idValidation.error) });

        const dataValidation = updateGerenteSchema.safeParse(req.body);
        if (!dataValidation.success) return res.status(400).json({ erros: formatZodError(dataValidation.error) });

        try {
            const updatedGerente = await gerenteService.update(idValidation.data.id, dataValidation.data);
            return res.status(200).json({
                message: "Gerente atualizado com sucesso!",
                data: updatedGerente,
            });
        } catch (err: any) {
            return res.status(500).json({ error: "Erro ao atualizar gerente.", detalhe: err.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        const validation = deleteGerenteSchema.safeParse({
            id: req.params.id,
            gerenteId: req.query.gerenteId,
        });

        if (!validation.success) {
            return res.status(400).json({ erros: formatZodError(validation.error) });
        }

        const { id, gerenteId } = validation.data;

        try {
            const gerenteAtuando = await gerenteService.getById(gerenteId);
            if (!gerenteAtuando) {
                return res.status(400).json({
                    erros: [
                        { campo: "gerenteId", mensagem: "O gerente que está tentando deletar não existe" },
                    ],
                });
            }

            const gerenteDeletado = await gerenteService.getById(id);
            if (!gerenteDeletado) {
                return res.status(404).json({
                    erros: [{ campo: "id", mensagem: "Gerente a ser deletado não encontrado" }],
                });
            }

            if (id === gerenteId) {
                return res.status(400).json({
                    erros: [{ campo: "gerenteId", mensagem: "Um gerente não pode deletar a si mesmo" }],
                });
            }

            await gerenteService.delete(id);
            return res.status(200).json({ message: "Gerente deletado com sucesso!" });

        } catch (err: any) {
            console.error("Erro ao deletar gerente:", err);
            return res.status(500).json({
                error: "Erro ao deletar gerente.",
                detalhe: err.message,
            });
        }
    },
}

export default gerenteController;
