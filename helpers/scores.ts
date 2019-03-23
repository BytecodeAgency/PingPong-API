import IGamePlayed from '../typescript/IGamePlayed';
import ILeader from '../typescript/ILeader';
import IStats from '../typescript/IStats';
import IPlayerMatrix from '../typescript/IPlayerMatrix';
import IHeadToHead from '../typescript/IHeadToHead';
import ITeamScoreData from '../typescript/ITeamScoreData';

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

// TODO: Clean this code, fix undefined stuff
export const getPlayerMatrix = (activePlayers: number[]): IPlayerMatrix[] => {
    const activePlayerMatrix = activePlayers.map((playerLeft, indexLeft) => {
        const matches = activePlayers.map((playerRight, indexRight) => {
            if (indexLeft >= indexRight) {
                return;
            }
            const playerMatrixEntry: IPlayerMatrix = {
                player1: playerLeft,
                player2: playerRight,
            };
            return playerMatrixEntry;
        });
        return matches;
    });
    const flatPlayerMatrix: IPlayerMatrix[] = activePlayerMatrix
        .reduce((acc, val) => acc.concat(val), [])
        .filter(entry => entry)
        .map(entry => {
            if (!entry) throw new Error('Undefined');
            return {
                player1: entry.player1,
                player2: entry.player2,
            };
        });
    return flatPlayerMatrix;
};

export const getHeadToHead = (gamesPlayed: IGamePlayed[]): IHeadToHead[] => {
    const activePlayers = getListOfActivePlayers(gamesPlayed);
    const playerMatrix = getPlayerMatrix(activePlayers);
    const headToHead = playerMatrix.map(pm => {
        const headToHeadGames = gamesPlayed
            .filter(game =>
                game.player1id === pm.player1 ||
                game.player1id === pm.player2)
            .filter(game =>
                game.player2id === pm.player1 ||
                game.player2id === pm.player2);
        const totalGames = headToHeadGames.length;
        const wonByP1 = headToHeadGames
            .filter(game => game.winner === pm.player1)
            .length;
        const wonByP2 = headToHeadGames
            .filter(game => game.winner === pm.player2)
            .length;
        const headToHeadEntry = {
            totalGames,
            player1: pm.player1,
            player2: pm.player2,
            player1won: wonByP1,
            player2won: wonByP2,
        };
        return headToHeadEntry;
    });
    return headToHead;
};

export const getTeamStats = (gamesPlayed: IGamePlayed[]): IStats => {
    const totalGames = gamesPlayed.length;
    const totalPoints = gamesPlayed
        .reduce((acc, val) => acc + val.player1score + val.player2score, 0);
    const stats = {
        totalGames,
        totalPoints,
    };
    return stats;
};

export default (gamesPlayed: IGamePlayed[]): ITeamScoreData => {
    return {
        leaderboard: getLeaderboard(gamesPlayed),
        headToHead: getHeadToHead(gamesPlayed),
        teamStats: getTeamStats(gamesPlayed),
    };
};
