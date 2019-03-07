import { Request, Response } from 'express';

export default class Status {
    public static ok = (req: Request, res: Response): void => {
        res.sendStatus(200);
    }
}
