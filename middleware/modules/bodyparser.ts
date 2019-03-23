import express from 'express';
import bodyParser from 'body-parser';

const addBodyParser = (app: express.Application) => {
    app.use(bodyParser.json());
};

export default addBodyParser;
