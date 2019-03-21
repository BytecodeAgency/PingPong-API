const getListOfPlayers = (gamesPlayed: IGamePlayed[]): number[] => {
    return [0];
};

export const getLeaderboard = (gamesPlayed: IGamePlayed[]): ILeader[] => {
    return [{
        rank: 1,
        id: 1,
        username: 'Luciano',
        winPercentage: 65.9,
    }];
};

export const getHeadToHeadScores = (gamesPlayed: IGamePlayed[]): IHeadToHead[] => {
    return [{
        rank: 1,
        id: 1,
        username: 'Luciano',
        winPercentage: 65.9,
    }];
};

export const getStats = (gamesPlayed: IGamePlayed[]): ILeader[] => {
    return [{
        rank: 1,
        id: 1,
        username: 'Luciano',
        winPercentage: 65.9,
    }];
};

export default (gamesPlayed: IGamePlayed[]): IData => {
    const headToHeadScores = getHeadToHeadScores(gamesPlayed)
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

interface ILeader {
    rank: number;
    id: number;
    username: string;
    winPercentage: number;
}

interface IData {

}
