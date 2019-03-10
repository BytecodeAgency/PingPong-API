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

    it('should be possible to use the getPlayer method', () => {
        const playerInstance = new Player(testPlayerData);
        const player = playerInstance.getPlayer();
        expect(player).toEqual(testPlayerData);
    });


    it('should be possible to add and fetch users', async () => {
        expect.assertions(5);
        const newPlayerObject = await Player.addNewPlayer(testNewPlayerData);
        const newPlayer = newPlayerObject.getPlayer();
        const fetchedNewPlayerObject = await Player.getPlayerById(newPlayer.id);
        const fetchedNewPlayer = fetchedNewPlayerObject.getPlayer();
        expect(newPlayer.id).toBe(fetchedNewPlayer.id);
        expect(newPlayer.username).toBe(fetchedNewPlayer.username);
        expect(newPlayer.email).toBe(fetchedNewPlayer.email);
        expect(newPlayer.teamid).toBe(fetchedNewPlayer.teamid);
        expect(newPlayer.timecreated).toEqual(fetchedNewPlayer.timecreated);
    });
});

