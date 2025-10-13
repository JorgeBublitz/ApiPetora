import { Request, Response } from "express";
import petService from "../services/pet.service";
import { createPetSchema, updatePetSchema, deletePetSchema, formatZodError } from "../schemas/pet.schema";

const petController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const pets = await petService.getAll();
            res.json(pets);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar pets" });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const pet = await petService.getById(Number(req.params.id));
            if (!pet) return res.status(404).json({ error: "Pet não encontrado" });
            res.json(pet);
        } catch (err) {
            res.status(500).json({ error: "Erro ao buscar pet" });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const data = createPetSchema.parse(req.body);

            const petData = {
                ...data,
                dataNascimento: new Date(data.dataNascimento), // converte string para Date
                agendamento: data.agendamentoIds ? { connect: data.agendamentoIds.map(id => ({ id })) } : undefined,
                consulta: data.consultaIds ? { connect: data.consultaIds.map(id => ({ id })) } : undefined,
            };

            const pet = await petService.create(petData);
            res.status(201).json(pet);
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const data = updatePetSchema.parse(req.body);

            const petData = {
                ...data,
                dataNascimento: data.dataNascimento ? new Date(data.dataNascimento) : undefined,
                agendamento: data.agendamentoIds ? { connect: data.agendamentoIds.map(id => ({ id })) } : undefined,
                consulta: data.consultaIds ? { connect: data.consultaIds.map(id => ({ id })) } : undefined,
            };

            const pet = await petService.update(Number(req.params.id), petData);
            res.json(pet);
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const data = deletePetSchema.parse({
                petId: Number(req.params.id),
                solicitanteId: Number(req.body.solicitanteId)
            });

            const canDelete = await petService.canGerenteDelete(data.solicitanteId);
            if (!canDelete) return res.status(403).json({ error: "Não autorizado" });

            await petService.delete(data.petId);
            res.json({ message: "Pet deletado com sucesso" });
        } catch (err) {
            res.status(400).json({ errors: formatZodError(err) });
        }
    },
};

export default petController;
