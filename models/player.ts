import knex from '../helpers/db';

class Player implements IPlayerClass {
    private id: number;
    private username: string;
    private password: string;
    private email: string;
    private teamid: number;
    private timecreated: Date;


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

    public static async addNewPlayer(newPlayer: IPlayerNew): Promise<Player> {
        const returning = [
            'id', 'username', 'password', 'email', 'teamid', 'timecreated',
        ];
        const addedPlayerArr = await knex('players')
            .insert(newPlayer)
            .returning(returning);
        const addedPlayer: IPlayer = addedPlayerArr[0];
        const player = new Player(addedPlayer);
        return player;
    }

    public static async getPlayerById(id: number): Promise<Player> {
        const playerArr = await knex.select('*').from('players').where({id});
        const playerData: IPlayer = playerArr[0];
        const player: Player = new Player(playerData);
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
    getPlayer(): IPlayer;
}

export default Player;
