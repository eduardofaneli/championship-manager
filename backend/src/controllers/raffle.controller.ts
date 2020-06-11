import { Request, Response } from 'express';
import raffle from '../services/raffle.service';
import knex from '../database/connection';

class RaffleController {

  async index(request: Request, response: Response) {
    let players: string[] = [];
    
    await knex('players').select('id').then(result => {
      result.forEach(row =>  players.push(row.id))
    });
    
    const fights = raffle(players);
    
    return response.json(fights)

  }
};

export default RaffleController;