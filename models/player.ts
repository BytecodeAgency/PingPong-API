import db from '../helpers/db';

class Player implements IPlayerClass {
    id?: number;
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

    public get getPlayer(): IPlayer {
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
}


interface IPlayer {
    id?: number;
    username: string;
    password: string;
    email: string;
    teamid: number;
    timecreated: Date;
}

interface IPlayerClass {
    username: string;
    password: string;
    email: string;
    teamid: number;
}

export default Player;
