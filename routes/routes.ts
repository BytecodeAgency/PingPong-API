import express from 'express';
const router = express.Router();

import controllers from '../controllers';
const { Status } = controllers;

router.get('/status', Status.ok);

export default router;
