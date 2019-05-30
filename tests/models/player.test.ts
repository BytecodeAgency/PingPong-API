import Player from '../../models/player';
import knex from '../../helpers/db';
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
    teamid: 1,
};

const createNewPlayer = async (): Promise<Player> => {
    const newTeamData = { name: 'playermodeltestteam '};
    const newTeam = await knex('teams').returning(['id']).insert(newTeamData);
    const newTeamId = newTeam[0].id;
    const testNewPlayerDataWithId = { ...testNewPlayerData, teamid: newTeamId};
    const newPlayerObject = await Player.addNewPlayer(testNewPlayerDataWithId);
    return newPlayerObject;
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

    it('should be possible to add users and fetch by id', async () => {
        expect.assertions(5);
        const newPlayerObject = await createNewPlayer();
        const newPlayer = newPlayerObject.getPlayer();
        const fetchedNewPlayerObject = await Player.getPlayerById(newPlayer.id);
        const fetchedNewPlayer = fetchedNewPlayerObject.getPlayer();
        expect(newPlayer.id).toBe(fetchedNewPlayer.id);
        expect(newPlayer.username).toBe(fetchedNewPlayer.username);
        expect(newPlayer.email).toBe(fetchedNewPlayer.email);
        expect(newPlayer.teamid).toBe(fetchedNewPlayer.teamid);
        expect(newPlayer.timecreated).toEqual(fetchedNewPlayer.timecreated);
    });

    it('should be possible to add users and fetch by username', async () => {
        expect.assertions(5);
        const newPlayerObject = await createNewPlayer();
        const newPlayer = newPlayerObject.getPlayer();
        const fetchedNewPlayerObject =
            await Player.getPlayerByUsername(newPlayer.username);
        if (!fetchedNewPlayerObject) throw new Error('No player');
        const fetchedNewPlayer = fetchedNewPlayerObject.getPlayer();
        expect(newPlayer.id).toBe(fetchedNewPlayer.id);
        expect(newPlayer.username).toBe(fetchedNewPlayer.username);
        expect(newPlayer.email).toBe(fetchedNewPlayer.email);
        expect(newPlayer.teamid).toBe(fetchedNewPlayer.teamid);
        expect(newPlayer.timecreated).toEqual(fetchedNewPlayer.timecreated);
    });

    it('added users should have hashed passwords', async () => {
        expect.assertions(2);
        const newPlayerObject = await createNewPlayer();
        const newPlayer = newPlayerObject.getPlayer();
        const fetchedNewPlayerObject = await Player.getPlayerById(newPlayer.id);
        const fetchedNewPlayer = fetchedNewPlayerObject.getPlayer();
        expect(newPlayer.id).toBe(fetchedNewPlayer.id);
        expect(newPlayer.password).not.toBe(testNewPlayerData.password);
    });

    it('should be possible to authenticate users by username', async () => {
        expect.assertions(1);
        const newPlayerObject = await createNewPlayer();
        const newPlayer = newPlayerObject.getPlayer();
        const user = testNewPlayerData.username;
        const pass = testNewPlayerData.password;
        const isAuth = await Player.authenticatePlayerByUsername(user, pass);
        expect(isAuth).toBe(true);
    });

    it('should not authenticate users with incorrect an password', async () => {
        expect.assertions(1);
        const newPlayerObject = await createNewPlayer();
        const newPlayer = newPlayerObject.getPlayer();
        const user = testNewPlayerData.username;
        const pass = 'incorrectpass';
        const isAuth = await Player.authenticatePlayerByUsername(user, pass);
        expect(isAuth).toBe(false);
    });

    it('should be possible to delete users using anonymization', async () => {
        expect.assertions(5);
        const newPlayerObject = await createNewPlayer();
        const newPlayer = newPlayerObject.getPlayer();
        expect(newPlayer.id).toBeDefined();

        const deletedUserId = await Player.deletePlayerById(newPlayer.id);
        expect (deletedUserId).toBe(newPlayer.id);

        const fetchedPlayerObject = await Player.getPlayerById(deletedUserId);
        const fetchedPlayer = fetchedPlayerObject.getPlayer();
        expect(fetchedPlayer.username).not.toBe(newPlayer.username);
        expect(fetchedPlayer.password).not.toBe(newPlayer.password);
        expect(fetchedPlayer.email).not.toBe(newPlayer.email);
    });
});

