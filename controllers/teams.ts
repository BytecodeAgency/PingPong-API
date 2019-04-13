import { Request, Response } from 'express';
import Team from '../models/team';
import GamePlayed from '../models/gameplayed';

const registerTeam = async(req: Request, res: Response): Promise<void> => {
    const teamData = {
        name: req.body.name,
    };
    const existingTeam = await Team.getTeamByName(teamData.name);
    if (existingTeam) {
        // TODO: Normalize responses with errors, createErrResponse helper
        res.status(400).send({ err: 'Team exists' });
        return;
    }
    const team = await Team.addNewTeam(teamData);
    res.status(201).send(team);
};

const getTeamData = async(req: Request, res: Response): Promise<void> => {
    const teamData = await GamePlayed.getTeamScores(req.body.id);
    res.send(teamData);
};

// TODO: Research middleware for auth
export default class TeamController {
    public static create = (req: Request, res: Response): void => {
        registerTeam(req, res);
    }
    public static getAll = (req: Request, res: Response): void => {
        getTeamData(req, res);
    }
}
