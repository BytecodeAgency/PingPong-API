import { Request, Response } from 'express';

export default class StatusController {
    public static ok = (req: Request, res: Response): void => {
        res.sendStatus(200);
    }
}
