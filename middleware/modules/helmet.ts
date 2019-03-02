import express from 'express';
import helmet from 'helmet';

const addHelmet = (app: express.Application) => {
    app.use(helmet());
};

export default addHelmet;
