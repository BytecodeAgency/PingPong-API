import * as express from 'express';

import bodyparser from './modules/bodyparser';
import morgan from './modules/morgan';
import helmet from './modules/helmet';
import responseTimeHeader from './modules/response-time-header';

const addMiddleware = (app: express.Application) => {
    bodyparser(app);
    morgan(app);
    helmet(app);
    responseTimeHeader(app);
};

export default addMiddleware;
