import { Request, Response } from 'express';
import Player from '../models/player';
import Team from '../models/team';
import authHelper from '../helpers/auth';

// TODO: Move to helper
const authUser = async (username: string, pass: string): Promise<boolean> => {
    const isAuth = await Player.authenticatePlayerByUsername(username, pass);
    return isAuth;
};

const handleAuth = async (req: Request, res: Response): Promise<void> => {
    const reqUser = req.body.username;
    const reqPass = req.body.password;
    const isAuth = authUser(reqUser, reqPass);
    if (!isAuth) {
        res.sendStatus(401);
        return;
    }
    const userObj = await Player.getPlayerByUsername(reqUser);
    if (!userObj) {
        res.sendStatus(400);
        return;
    }
    const user = userObj.getPlayer();
    const jwt = await userObj.getJWT();
    const payload = {
        jwt,
        userid: user.id,
        username: user.username,
        teamid: user.teamid,
    };
    res.status(201).send(payload);
};

const checkTeamExists = async (teamId: number): Promise<boolean> => {
    const team = await Team.getTeamById(teamId);
    if (team) return true;
    return false;
};

const registerUser = async(req: Request, res: Response): Promise<void> => {
    // TODO: Improve and clean up validation
    if (!req.body.username || !req.body.email || !req.body.teamid ||
        !req.body.password) {
        res.sendStatus(400);
        return;
    }
    const playerExists = await Player.getPlayerByUsername(req.body.username);
    if (playerExists) {
        res.sendStatus(400);
        return;
    }
    const teamExists = await checkTeamExists(req.body.teamid);
    if (!teamExists) {
        res.sendStatus(400);
        return;
    }

    const playerData = {
        username: req.body.username,
        email: req.body.email,
        teamid: req.body.teamid,
        password: req.body.password,
    };
    const player = await Player.addNewPlayer(playerData);
    const user = player.getPlayer();
    const jwt = player.getJWT();
    const payload = {
        jwt,
        userid: user.id,
        username: user.username,
        teamid: user.teamid,
    };
    res.status(201).send(payload);
};

export default class PlayerController {
    public static auth = async (req: Request, res: Response): Promise<void> => {
        try {
            await handleAuth(req, res);
        } catch (err) {
            res.sendStatus(500);
        }
    }
    public static register = (req: Request, res: Response): void => {
        try {
            registerUser(req, res);
        } catch {
            res.sendStatus(500);
        }
    }
}
