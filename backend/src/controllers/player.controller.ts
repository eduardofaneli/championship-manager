import { Request, Response } from 'express';
import knex from '../database/connection';

class PlayerController {
    async index(request: Request, response: Response) {
        const players = await knex('players').select('*');

        return response.json({ players });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
        } = request.body;

        const player = {
            name,
            email,
            whatsapp        
        }

        const playerId = await knex('players').insert(player);

        return response.json({
            id: playerId,
            ...player,
        });
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;        

        await knex('players').where('id', id).delete();        

        return response.status(204).send();
    }
};

export default PlayerController;