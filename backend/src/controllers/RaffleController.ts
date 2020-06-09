import { Request, Response } from 'express';
import raffle from '../services/raffle.service';

const players = [
  "castrolol",
  "faneli",
  "naka",
  "ronam",
  "nelsonLindo",
  "barbieroBaitola",
  "fracasso",
  "shoiti",
  "lucas",
  // "vh"
];

class RaffleController {

  async index(request: Request, response: Response) {
    
    const fights = raffle(players);
    
    return response.json(fights)

  }
};

export default RaffleController;