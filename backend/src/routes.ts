import express from 'express';
import RaffleController from './controllers/raffle.controller';
import PlayerController from './controllers/player.controller';
import AuthController from './controllers/auth.controller';

const routes = express.Router();

const raffleController = new RaffleController;
const playerController = new PlayerController;
const authController = new AuthController;

routes.get('/rafflematchs', raffleController.index);

routes.get('/players', playerController.index);
routes.post('/players', playerController.create);
routes.delete('/players/:id', playerController.delete);

routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

export default routes;