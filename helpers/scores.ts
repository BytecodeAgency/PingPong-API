import IGamePlayed from '../typescript/IGamePlayed';

// TODO: Make

const getListOfActivePlayers = (gamesPlayed: IGamePlayed[]): number[] => {
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

export default (gamesPlayed: IGamePlayed[]): ITeamScoreData => {
    const headToHeadScores = getHeadToHeadScores(gamesPlayed);
};

interface ILeader {
    rank: number;
    id: number;
    username: string;
    winPercentage: number;
}

interface ITeamScoreData {
    // TODO: Create
}
