import express from 'express';
import RaffleController from './controllers/RaffleController';

const routes = express.Router();

const raffleController = new RaffleController;

routes.get('/matches', raffleController.index);

export default routes;