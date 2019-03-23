import { Request, Response } from 'express';
import Player from '../models/player';
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
    const user = userObj.getPlayer();
    const jwt = userObj.getJWT();
    const payload = {
        jwt: jwt,
        userid: user.id,
        username: user.username,
        teamid: user.teamid,
    };
    res.status(201).send(payload);
};

const registerUser = async(req: Request, res: Response): Promise<void> => {
    const hashedPass = await authHelper.generatePasswordHash(req.body.password);
    const playerData = {
        username: req.body.username,
        email: req.body.email,
        teamid: req.body.teamid,
        password: hashedPass,
    };
    const player = await Player.addNewPlayer(playerData);
    const user = player.getPlayer();
    const jwt = player.getJWT();
    const payload = {
        jwt: jwt,
        userid: user.id,
        username: user.username,
        teamid: user.teamid,
    };
    res.status(201).send(payload);
}

export default class PlayerController {
    public static auth = async (req: Request, res: Response): Promise<void> => {
        try {
            await handleAuth(req, res);
        } catch (err) {
            res.sendStatus(500);
        }
    }
    public static register = (req: Request, res: Response): void => {
        registerUser(req, res);
        res.sendStatus(200);
    }
}
