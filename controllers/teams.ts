import { Request, Response } from 'express';

// TODO: Research middleware for auth
export default class TeamController {
    public static create = (req: Request, res: Response): void => {
        res.sendStatus(200);
    }
    public static getAll = (req: Request, res: Response): void => {
        res.sendStatus(200);
    }
}
