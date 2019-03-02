import { Request, Response } from 'express';

export default class Status {
    public static ok = (req: Request, res: Response): void => {
        // tslint:disable-next-line
        console.log('Route is working');
        res.sendStatus(200);
    }
}
