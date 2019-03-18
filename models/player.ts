import knex from '../helpers/db';
import authHelper from '../helpers/auth';

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
        const newPlayerData = await getNewPlayerData(newPlayer);
        const returning = [
            'id', 'username', 'password', 'email', 'teamid', 'timecreated',
        ];
        const addedPlayerArr = await knex('players')
            .insert(newPlayerData)
            .returning(returning);
        const addedPlayer: IPlayer = addedPlayerArr[0];
        const player = new Player(addedPlayer);
        return player;
    }

    public static async getPlayerById(id: number): Promise<Player> {
        const playerArr = await knex.select('*').from('players').where({ id });
        const playerData: IPlayer = playerArr[0];
        const player: Player = new Player(playerData);
        return player;
    }

    public static async getPlayerByUsername(username: string): Promise<Player> {
        const playerArr = await knex.select('*')
            .from('players')
            .where({ username });
        if (playerArr.length === 0) {
            throw new Error('No player found');
        }
        const playerData: IPlayer = playerArr[0];
        const player: Player = new Player(playerData);
        return player;
    }

    // tslint:disable-next-line max-line-length
    public static async authenticatePlayerByUsername(username: string, password: string): Promise<boolean> {
        const player = await Player.getPlayerByUsername(username);
        const hashed = player.password;
        const isAuth = await authHelper.checkPasswordHash(password, hashed);
        return isAuth;
    }

    public static async deletePlayerById(userId: number): Promise<number> {
        const deletedPlayerArr = await knex('players')
            .returning([ 'id' ])
            .where({ id: userId })
            .delete();
        const deletedPlayer = deletedPlayerArr[0];
        const deletedPlayerId = deletedPlayer.id;
        return deletedPlayerId;
    }
}

const getNewPlayerData = async (newPlayer: IPlayerNew): Promise<IPlayerNew> => {
    const plainTextPass = newPlayer.password;
    const hashedPass = await authHelper.generatePasswordHash(plainTextPass);
    const newPlayerWithPassHash = {
        ...newPlayer,
        password: hashedPass,
    };
    return newPlayerWithPassHash;
};


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
