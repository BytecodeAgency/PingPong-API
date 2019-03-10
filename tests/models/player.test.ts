import Player from '../../models/player';
import { useTestDatabase } from '../config';

useTestDatabase();

const testPlayerData = {
    id: 420,
    username: 'testUser',
    password: 'password',
    email: 'info@test.com',
    teamid: 42,
    timecreated: new Date(),
};

const testNewPlayerData = {
    username: 'someuser',
    password: 'supersecret',
    email: 'admin@bytecode.nl',
    teamid: 100,
};

describe('Player model', () => {
    it('should create a player object without errors', () => {
        expect(() => new Player(testPlayerData)).not.toThrow();
    });


    it('should be possible to add and fetch users', async () => {
        expect.assertions(5);
        const newPlayer = await Player.addNewPlayer(testNewPlayerData);
        const fetchedNewPlayer = await Player.getPlayerById(newPlayer.id);
        expect(newPlayer.id).toBe(fetchedNewPlayer.id);
        expect(newPlayer.username).toBe(fetchedNewPlayer.username);
        expect(newPlayer.email).toBe(fetchedNewPlayer.email);
        expect(newPlayer.teamid).toBe(fetchedNewPlayer.teamid);
        expect(newPlayer.timecreated).toEqual(fetchedNewPlayer.timecreated);
    });

    it('should not return pass hash after creation', async () => {
        expect.assertions(1);
        const newPlayer = await Player.addNewPlayer(testNewPlayerData);
        expect(newPlayer.password).toBeUndefined();
    });
});

