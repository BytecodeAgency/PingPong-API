import { Request, Response } from 'express';

export default class PlayerController {
    public static authenticate = (req: Request, res: Response): void => {
        res.sendStatus(200);
    }
    public static register = (req: Request, res: Response): void => {
        res.sendStatus(200);
    }
}
