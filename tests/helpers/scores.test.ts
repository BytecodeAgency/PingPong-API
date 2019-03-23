import testGames from '../data/testgames';

import {
    getListOfActivePlayers,
    getLeaderboard,
    getPlayerMatrix,
    getHeadToHead,
    getTeamStats,
} from '../../helpers/scores';

describe('getListOfActivePlayers', () => {
    it('should return all active players', () => {
        const activePlayers = getListOfActivePlayers(testGames);
        const expectedPlayers = [ 42, 142, 420 ];
        expect(activePlayers).toEqual(expectedPlayers);
    });
});

describe('getLeaderboard', () => {
    it('should return the correct leaderboard', () => {
        const leaderboard = getLeaderboard(testGames);
        const expectedLeaderboard = [
            {
                rank: 1,
                winPercentage: 75,
                id: 420,
            },
            {
                rank: 2,
                winPercentage: 50,
                id: 42,
            },
            {
                rank: 3,
                winPercentage: 40,
                id: 142,
            },
        ];
        expect(leaderboard).toEqual(expectedLeaderboard);
    });
});

describe('getPlayerMatrix', () => {
    it('should return the correct player matrix', () => {
        const activePlayers = getListOfActivePlayers(testGames);
        const matrix = getPlayerMatrix(activePlayers);
        const expectedMatrix = [
            {player1: 42, player2: 142},
            {player1: 42, player2: 420},
            {player1: 142, player2: 420},
        ];
        expect(matrix).toEqual(expectedMatrix);
    });
});

describe('getPlayerMatrix', () => {
    it('should return the correct player matrix', () => {
        const activePlayers = getListOfActivePlayers(testGames);
        const matrix = getPlayerMatrix(activePlayers);
        const expectedMatrix = [
            {player1: 42, player2: 142},
            {player1: 42, player2: 420},
            {player1: 142, player2: 420},
        ];
        expect(matrix).toEqual(expectedMatrix);
    });
});

describe('getHeadToHead', () => {
    it('should return the correct getPlayerMatrix data', () => {
        const headToHead = getHeadToHead(testGames);
        const expectedHeadToHead = [
            {
                player1: 42, player2: 142,
                player1won: 3, player2won: 3, totalGames: 6,
            },
            {
                player1: 42, player2: 420,
                player1won: 0, player2won: 0, totalGames: 0,
            },
            {
                player1: 142, player2: 420,
                player1won: 1, player2won: 3, totalGames: 4,
            },
        ];
        expect(headToHead).toEqual(expectedHeadToHead);
    });
});

describe('getTeamStats', () => {
    it('should return the correct getPlayerMatrix data', () => {
        const teamStats = getTeamStats(testGames);
        const expectedStats = {
            totalGames: 10,
            totalPoints: 192,
        };
        expect(teamStats).toEqual(expectedStats);

    });
});


