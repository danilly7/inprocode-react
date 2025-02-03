import { Request, Response } from 'express';
import Competitor from '../models/competitors'; // Asegúrate de importar el modelo correctamente

export const getCompetitors = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const result = await Competitor.findAndCountAll({
            limit: Number(limit),
            offset: (Number(page) - 1) * Number(limit),
        });

        res.json({
            total: result.count,
            pages: Math.ceil(result.count / Number(limit)),
            currentPage: Number(page),
            data: result.rows,
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ups, there was an error when trying to get all the competitors',
        });
    }
};

export const getCompetitor = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const competitor = await Competitor.findByPk(id);

        if (competitor) {
            res.json(competitor);
        } else {
            res.status(404).json({
                msg: `Competitor with id ${id} does NOT exist (yet)`,
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Ups, there was an error when trying to get the competitor',
        });
    }
};