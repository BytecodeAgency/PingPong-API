import { Request, Response } from 'express';
import GamePlayed from '../models/gameplayed';

// TODO: Move to helper
const addGame = async (req: Request, res: Response): Promise<GamePlayed> => {
    const gamedata = {
        teamid: req.body.teamid,
        player1id: req.body.player1id,
        player1score: req.body.player1score,
        player2id: req.body.player2id,
        player2score: req.body.player2score,
        winner: req.body.winner,
        addedby: req.body.addedby,
    }
    return await GamePlayed.addNewGamePlayed(gamedata);
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
