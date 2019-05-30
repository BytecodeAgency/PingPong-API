import { Request, Response } from 'express';
import Team from '../models/team';
import GamePlayed from '../models/gameplayed';
import Player from '../models/player';

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
    if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
        res.sendStatus(400);
        return;
    }
    if (!req.body.teamid) {
        res.sendStatus(400);
        return;
    }
    const jwt = req.headers.authorization.split(' ')[1];
    const teamid = req.body.teamid;
    const authenticated = await Player.checkTeamJWT(jwt, teamid);
    if (!authenticated) {
        res.sendStatus(400);
        return;
    }
    const teamData = await GamePlayed.getTeamScores(teamid);
    res.send(teamData);
};

const getTeamMembers = async (req: Request, res: Response): Promise<void> => {
    if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
        res.sendStatus(400);
        return;
    }
    if (!req.body.teamid) {
        res.sendStatus(400);
        return;
    }
    const jwt = req.headers.authorization.split(' ')[1];
    const teamid = req.body.teamid;
    const authenticated = await Player.checkTeamJWT(jwt, teamid);
    if (!authenticated) {
        res.sendStatus(400);
        return;
    }

    const team = await Team.getTeamById(teamid);
    if (!team) { res.sendStatus(500); return; }
    const members = await team.getTeamMembers();
    res.send(members);
}

// TODO: Research middleware for auth
export default class TeamController {
    public static create = (req: Request, res: Response): void => {
        registerTeam(req, res);
    }
    public static getMembers = (req: Request, res: Response): void => {
        getTeamMembers(req, res);
    }
    public static getAll = (req: Request, res: Response): void => {
        getTeamData(req, res);
    }
}
