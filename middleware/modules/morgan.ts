import express from 'express';
import morgan from 'morgan';

const addMorgan = (app: express.Application) => {
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
};

export default addMorgan;
