import express from 'express';
import RaffleController from './controllers/raffle.controller';
import PlayerController from './controllers/player.controller';

const routes = express.Router();

const raffleController = new RaffleController;
const playerController = new PlayerController;

routes.get('/matches', raffleController.index);

routes.get('/players', playerController.index);

routes.post('/players', playerController.create);

routes.delete('/players/:id', playerController.delete);


export default routes;