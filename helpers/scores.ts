import IGamePlayed from '../typescript/IGamePlayed';

// TODO: Make

// tslint:disable-next-line max-line-length
export const getListOfActivePlayers = (gamesPlayed: IGamePlayed[]): number[] => {
    const players1 = gamesPlayed.map(game => game.player1id);
    const players2 = gamesPlayed.map(game => game.player2id);
    const players = [...players1, ...players2];
    const uniquePlayers = [...new Set(players)];
    return uniquePlayers;
};

// export const getLeaderboard = (gamesPlayed: IGamePlayed[]): ILeader[] => {
//     return [{
//         rank: 1,
//         id: 1,
//         // username: 'Luciano',
//         winPercentage: 65.9,
//     }];
// };

// export const getHeadToHeadScores = (gamesPlayed: IGamePlayed[]): IHeadToHead[] => {
//     return [{
//         rank: 1,
//         id: 1,
//         username: 'Luciano',
//         winPercentage: 65.9,
//     }];
// };

// export const getStats = (gamesPlayed: IGamePlayed[]): ILeader[] => {
//     return [{
//         rank: 1,
//         id: 1,
//         username: 'Luciano',
//         winPercentage: 65.9,
//     }];
// };

// export default (gamesPlayed: IGamePlayed[]): ITeamScoreData => {
//     const headToHeadScores = getHeadToHeadScores(gamesPlayed);
// };

interface IActivePlayer {
    id: number;
}

interface ILeader {
    rank: number;
    id: number;
    // username: string;
    winPercentage: number;
}

interface ITeamScoreData {
    // TODO: Create
}
