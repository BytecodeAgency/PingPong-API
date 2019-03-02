import express from 'express';

const addResponseTimeHeader = (app: express.Application) => {
    if (process.env.NODE_ENV === 'development') {
        const responseTime = require('response-time');
        app.use(responseTime());
    }
};

export default addResponseTimeHeader;
