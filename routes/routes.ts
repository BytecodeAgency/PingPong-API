import * as express from 'express';
const router = express.Router();

import controllers from '../controllers';
const { Status, Player, Team } = controllers;

router.get('/status', Status.ok);
router.post('/player/authenticate', Player.authenticate);
router.post('/player/register', Player.register);
router.post('/team/create', Team.create);
router.post('/team/get-all-data', Team.getAll);

export default router;
