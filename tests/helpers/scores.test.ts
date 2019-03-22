import testGames from '../data/testgames';

import { getListOfActivePlayers } from '../../helpers/scores';

describe('getListOfActivePlayers', () => {
    it('should return all active players', () => {
        const activePlayers = getListOfActivePlayers(testGames);
        const expectedPlayers = [ 42, 142, 420 ];
        expect(activePlayers).toEqual(expectedPlayers);
    });
});
