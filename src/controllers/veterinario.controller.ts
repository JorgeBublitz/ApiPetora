import type { Request, Response } from "express";
import veterinarioService from "../services/veterinario.service";
import {
    createVeterinarioSchema,
    updateVeterinarioSchema,
    deleteVeterinarioSchema,
    formatZodError,
} from "../schemas/veterinario.schema"



const veterinarioController = {

    getAll: async (req: Request, res: Response) => {
        try {
            const veterinario = await veterinarioService.getAll();

            if (veterinario.length === 0) {
                return res.status(200).json({ message: "Nenhum veterinário cadastrado!" });
            }

            res.json(veterinario);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const veterinario = await veterinarioService.getById(id);

            if (!veterinario)
                return res.status(404).json({ error: "Veterinario não encontado" });

            res.json(veterinario);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const data = createVeterinarioSchema.parse(req.body);
            const newVeterinario = await veterinarioService.create(data);

            res.status(201).json({
                message: "VeterinarioId criado com sucesso",
                data: newVeterinario,
            });
        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data = updateVeterinarioSchema.parse(req.body);

            const updatedVeterinario = await veterinarioService.update(id, data);
            res.json(updatedVeterinario);
        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const veterinarioId = Number(req.params.id);
            const gerenteId = Number(req.query.gerenteId);

            const data = deleteVeterinarioSchema.parse({ veterinarioId, gerenteId });

            const podeDeletar = await veterinarioService.canGerenteDelete(data.gerenteId);
            if (!podeDeletar) {
                return res.status(403).json({ error: "Apenas gerentes podem deletar veterinários" });
            }

            await veterinarioService.delete(data.veterinarioId);
            res.json({ message: "Veterinário deletado com sucesso" });

        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },
}

export default veterinarioController;