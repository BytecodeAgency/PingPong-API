import knex from '../helpers/db';
import { getLeaderboard } from '../helpers/scores';

class GamePlayed implements IGamePlayedClass {
    private id: number;
    private teamid: number;
    private player1id: number;
    private player1score: number;
    private player2id: number;
    private player2score: number;
    private winner: number;
    private addedby: number;
    private playedon: Date;


    constructor(gamePlayedData: IGamePlayed) {
        this.id = gamePlayedData.id;
        this.teamid = gamePlayedData.teamid;
        this.player1id = gamePlayedData.player1id;
        this.player1score = gamePlayedData.player1score;
        this.player2id = gamePlayedData.player2id;
        this.player2score = gamePlayedData.player2score;
        this.winner = gamePlayedData.winner;
        this.addedby = gamePlayedData.addedby;
        this.playedon = gamePlayedData.playedon;
    }

    public getGamePlayed(): IGamePlayed {
        const gamePlayed: IGamePlayed = {
            id: this.id,
            teamid: this.teamid,
            player1id: this.player1id,
            player1score: this.player1score,
            player2id: this.player2id,
            player2score: this.player2score,
            winner: this.winner,
            addedby: this.addedby,
            playedon: this.playedon,
        };
        return gamePlayed;
    }

    // tslint:disable-next-line max-line-length
    public static async addNewGamePlayed(newGamePlayed: IGamePlayedNew): Promise<GamePlayed> {
        const addedGamePlayedArr = await knex('gamesplayed')
        .insert(newGamePlayed)
        .returning('*');
        const addedGamePlayed: IGamePlayed = addedGamePlayedArr[0];
        const gamePlayed = new GamePlayed(addedGamePlayed);
        return gamePlayed;
    }

    // TODO: What if there are no games found?
    // tslint:disable-next-line max-line-length
    public static async getGamesPlayedForTeam(id: number): Promise<GamePlayed[]> {
        const gamePlayedArr = await knex
            .select('*')
            .from('gamesplayed').where({ teamid: id });
        const gamesPlayed: GamePlayed[] = gamePlayedArr
            .map((gamePlayed: IGamePlayed) => new GamePlayed(gamePlayed));
        return gamesPlayed;
    }

    public static async getAllDataForTeam(id: number): Promise<ITeamData> {
        // return
    }
}

interface IGamePlayed {
    id: number;
    teamid: number;
    player1id: number;
    player1score: number;
    player2id: number;
    player2score: number;
    winner: number;
    addedby: number;
    playedon: Date;
}

interface IGamePlayedNew {
    teamid: number;
    player1id: number;
    player1score: number;
    player2id: number;
    player2score: number;
    winner: number;
    addedby: number;
}

interface IGamePlayedClass {
    getGamePlayed(): IGamePlayed;
}

export default GamePlayed;
