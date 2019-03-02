import express from 'express';
import routes from '../routes';
import middleware from '../middleware';

const app = express();
middleware(app);
app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
    // tslint:disable-next-line
    console.log(`Server listening on port ${PORT}`);
});
