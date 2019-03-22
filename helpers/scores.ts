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

export const getLeaderboard = (gamesPlayed: IGamePlayed[]): ILeader[] => {
    const activePlayerIds = getListOfActivePlayers(gamesPlayed);
    const leaderboardWithoutRanks = activePlayerIds.map(playerid => {
        const gamesByPlayer = gamesPlayed.filter(game =>
            game.player1id === playerid || game.player2id === playerid);
        const gamesWon = gamesByPlayer.filter(game => game.winner === playerid);
        const winPercentage = gamesWon.length / gamesByPlayer.length * 100;
        return { winPercentage, id: playerid, };
    });
    const sortedLeaderboardBase = leaderboardWithoutRanks.sort((a, b) =>
        b.winPercentage - a.winPercentage);
    const leaderboard = sortedLeaderboardBase.map((entry, index) => {
        const rank = index + 1;
        return {
            rank,
            ...entry,
        };
    });
    return leaderboard;
};

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

interface ILeader {
    rank: number;
    id: number;
    // username: string;
    winPercentage: number;
}

interface ITeamScoreData {
    // TODO: Create
}
