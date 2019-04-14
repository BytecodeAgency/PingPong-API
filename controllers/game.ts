import { Request, Response } from 'express';
import GamePlayed from '../models/gameplayed';
import Player from '../models/player';

// TODO: Move to helper
const addGame = async (req: Request, res: Response): Promise<void> => {
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
    
    const gamedata = {
        teamid: req.body.teamid,
        player1id: req.body.player1id,
        player1score: req.body.player1score,
        player2id: req.body.player2id,
        player2score: req.body.player2score,
        winner: req.body.winner,
        addedby: req.body.addedby,
    }

    const player1 = await Player.getPlayerById(gamedata.player1id);
    const player2 = await Player.getPlayerById(gamedata.player2id);
    const playerAdd = await Player.getPlayerById(gamedata.player2id);
    const p1InTeam = player1.getPlayer().teamid === gamedata.teamid;
    const p2InTeam = player2.getPlayer().teamid === gamedata.teamid;
    const pAddInTeam = playerAdd.getPlayer().teamid === gamedata.teamid;

    if (!p1InTeam || !p2InTeam || !pAddInTeam) {
        res.sendStatus(400)
        return;
    }

    if (gamedata.player1id !== gamedata.winner || gamedata.player2id !== gamedata.winner) {
        res.sendStatus(400);
        return;
    }

    // TODO: Add checks for scores etc.

    const newGame = await GamePlayed.addNewGamePlayed(gamedata);
    res.send(newGame);
};

export default class PlayerController {
    public static createGame = async (req: Request, res: Response): Promise<void> => {
        try {
            await addGame(req, res);
        } catch (err) {
            res.sendStatus(500);
        }
    }
}
