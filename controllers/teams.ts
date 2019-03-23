import { Request, Response } from 'express';
import Team from '../models/team';

const registerTeam = async(req: Request, res: Response): Promise<void> => {
    const teamData = {
        name: req.body.name,
    };
    const team = Team.addNewTeam(teamData);
}

// TODO: Research middleware for auth
export default class TeamController {
    public static create = (req: Request, res: Response): void => {
        registerTeam(req, res);
        res.sendStatus(200);
    }
    public static getAll = (req: Request, res: Response): void => {
        res.sendStatus(200);
    }
}
