import knex from '../helpers/db';

class Player implements IPlayerClass {
    id: number;
    username: string;
    password: string;
    email: string;
    teamid: number;
    timecreated: Date;


    constructor(playerData: IPlayer) {
        this.id = playerData.id;
        this.username = playerData.username;
        this.password = playerData.password;
        this.email = playerData.email;
        this.teamid = playerData.teamid;
        this.timecreated = playerData.timecreated;
    }

    public getPlayer(): IPlayer {
        const player: IPlayer = {
            id: this.id,
            username: this.username,
            password: this.password,
            email: this.email,
            teamid: this.teamid,
            timecreated: this.timecreated,
        };
        return player;
    }

    public static async addNewPlayer(newPlayer: IPlayerNew): Promise<IPlayer> {
        const returning = ['id', 'username', 'email', 'teamid', 'timecreated'];
        const addedPlayerArr = await knex('players')
            .insert(newPlayer)
            .returning(returning);
        const addedPlayer: IPlayer = addedPlayerArr[0];
        return addedPlayer;
    }

    public static async getPlayerById(id: number): Promise<IPlayer> {
        const playerArr = await knex.select('*').from('players').where({id});
        const player: IPlayer = playerArr[0];
        return player;
    }
}


interface IPlayer {
    id: number;
    username: string;
    password: string;
    email: string;
    teamid: number;
    timecreated: Date;
}

interface IPlayerNew {
    username: string;
    password: string;
    email: string;
    teamid: number;
}

interface IPlayerClass {
    username: string;
    password: string;
    email: string;
    teamid: number;
    getPlayer(): IPlayer;
}

export default Player;
