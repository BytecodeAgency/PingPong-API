import express from 'express';
import routes from '../routes';
import middleware from '../middleware';

const app = express();
middleware(app);
app.use('/', routes);

export default app;

