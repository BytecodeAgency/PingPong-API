import express from 'express';

import morgan from './modules/morgan';
import helmet from './modules/helmet';
import responseTimeHeader from './modules/response-time-header';

const addMiddleware = (app: express.Application) => {
    morgan(app);
    helmet(app);
    responseTimeHeader(app);
};

export default addMiddleware;
