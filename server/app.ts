import express from 'express';
import routes from '../routes';
import middleware from '../middleware';

const app = express();
middleware(app);
app.use('/api/v1/', routes);

export default app;

