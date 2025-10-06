import type { Request, Response } from "express";
import tutorService from "../services/tutor.service";
import {
    createTutorSchema,
    updateTutorSchema,
    deleteTutorSchema,
    formatZodError
} from "../schemas/tutor.schema"

const tutorController = {
    getAll: async (req: Request, res: Response) => {
        try {
            const tutors = await tutorService.getAll();
            res.json(tutors);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

  getById: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const tutor = await tutorService.getById(id);

            if (!tutor)
                return res.status(404).json({ error: "Tutor não encontrado" });

            res.json(tutor);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

  create: async (req: Request, res: Response) => {
        try {
            const data = createTutorSchema.parse(req.body);
            const newTutor = await tutorService.create(data);

            res.status(201).json({
                message: "Tutor criado com sucesso",
                data: newTutor,
            });
        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },

   update: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data = updateTutorSchema.parse(req.body);

            const updatedTutor= await tutorService.update(id, data);
            res.json(updatedTutor);
        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },

 delete: async (req: Request, res: Response) => { 
        try {
            const tutorId = Number(req.params.Id);
            const gerenteId = Number(req.query.gerenteId);

            const data = deleteTutorSchema.parse({ tutorId, gerenteId });

            const podeDeletar = await tutorService.canGerenteDelete(data.gerenteId);
            if (!podeDeletar) {
                return res.status(403).json({ error: "Apenas gerentes podem deletar tutores" });
            }

            await tutorService.delete(data.tutorId);
            res.json({ message: "Veterinário deletado com sucesso" });

        } catch (error) {
            return res.status(400).json({ erros: formatZodError(error) });
        }
    },
}

export default tutorController;