import Player from '../../models/player';

const testPlayerData = {
    username: 'testUser',
    password: 'password',
    email: 'info@test.com',
    teamid: 42,
    timecreated: new Date(),
};

describe('Player model', () => {
    it('should create a player object without errors', () => {
        expect(() => new Player(testPlayerData)).not.toThrow();
    });


});

