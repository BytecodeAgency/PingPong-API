import knex from '../helpers/db';
import authHelper from '../helpers/auth';
import IPlayer from '../typescript/IPlayer';
import IPlayerNew from '../typescript/IPlayerNew';

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

    public async getJWT(): Promise<string> {
        const jwtPayloadData = {
            username: this.username,
            teamid: this.teamid,
        };
        const jwtPayload = await authHelper.generatePayload(jwtPayloadData);
        const jwt = await authHelper.generateJWT(jwtPayload);
        return jwt;
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

    // tslint:disable-next-line max-line-length
    public static async getPlayerByUsername(username: string): Promise<Player|null> {
        const playerArr = await knex.select('*')
            .from('players')
            .where({ username });
        if (playerArr.length === 0) {
            return null;
            // throw new Error('No player found');
        }
        const playerData: IPlayer = playerArr[0];
        const player: Player = new Player(playerData);
        return player;
    }

    // tslint:disable-next-line max-line-length
    public static async authenticatePlayerByUsername(username: string, password: string): Promise<boolean> {
        try {
            const player = await Player.getPlayerByUsername(username);
            const fetchedPlayer = await Player.getPlayerByUsername(username);
            if (!fetchedPlayer) return false;
            const hashed = fetchedPlayer.password;
            const isAuth = await authHelper.checkPasswordHash(password, hashed);
            return isAuth;
        } catch (err) {
            return false; // No player found
        }
    }

    public static async deletePlayerById(userId: number): Promise<number> {
        const playerCurrent = await Player.getPlayerById(userId);
        const newUsername = getRandomUsername();
        const newPlayerData = {
            username: newUsername,
            password: `${newUsername}-pass`,
            email: `${newUsername}@pingpong.bytecode.nl`
        };
        const updatedUser = { ...playerCurrent, ...newPlayerData };
        const deletedPlayerArr = await knex('players')
            .returning([ 'id' ])
            .where({ id: userId })
            .update(updatedUser);
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

const getRandomUsername = (): String => {
    const base = "Jahne Doe";
    const randomNumber = Math.floor(Math.random()*1000000000);
    const randomUsername = `${base}-${randomNumber}`;
    return randomUsername;
};

interface IPlayerClass {
    getPlayer(): IPlayer;
}

export default Player;
