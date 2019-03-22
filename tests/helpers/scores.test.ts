import testGames from '../data/testgames';

import { getListOfActivePlayers, getLeaderboard } from '../../helpers/scores';

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
