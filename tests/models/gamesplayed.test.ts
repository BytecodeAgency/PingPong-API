import Player from '../../models/player';
import GamePlayed from '../../models/gameplayed';
import knex from '../../helpers/db';
import { useTestDatabase } from '../config';

useTestDatabase();

const addNewTeam = async (): Promise<number> => {
    const name = `testteam-${Math.floor(Math.random()*100000000)}`;
    const newTeamData = { name };
    const newTeamId = await knex('teams')
        .returning(['id'])
        .insert(newTeamData)
        .first();
    return newTeamId;
};

const getTestNewPlayerData1 = (team: number) => {
    const username = `luciano-${Math.floor(Math.random()*100000000)}`;
    const email = `luciano-${Math.floor(Math.random()*100000000)}@bytecode.nl`;
    return {
        username,
        email,
        password: 'supersecret1',
        teamid: 1,
    };
};

const getTestNewPlayerData2 = (team: number) => {
    const username = `jeroen-${Math.floor(Math.random()*100000000)}`;
    const email = `jeroen-${Math.floor(Math.random()*100000000)}@bytecode.nl`;
    return {
        username,
        email,
        password: 'supersecret2',
        teamid: 1,
    };
};

const getTestGameData = (team:number, idPlayer1:number, idPlayer2:number) => {
    const testData = {
        teamid: team,
        player1id: idPlayer1,
        player1score: 11,
        player2id: idPlayer2,
        player2score: 8,
        winner: idPlayer1,
        addedby: idPlayer1,
    };
    return testData;
};

const createTestGamePlayed = async (): Promise<GamePlayed> => {
    const teamId = await addNewTeam();
    const player1obj = await Player.addNewPlayer(getTestNewPlayerData1(teamId));
    const player1 = player1obj.getPlayer();
    const player2obj = await Player.addNewPlayer(getTestNewPlayerData2(teamId));
    const player2 = player2obj.getPlayer();
    const testGameData = getTestGameData(teamId, player1.id, player2.id);
    const addedGamePlayed = await GamePlayed.addNewGamePlayed(testGameData);
    return addedGamePlayed;
};

const createTwoTestGamePlayed = async (): Promise<any[]> => {
    const teamId = await addNewTeam();
    const player1obj = await Player.addNewPlayer(getTestNewPlayerData1(teamId));
    const player1 = player1obj.getPlayer();
    const player2obj = await Player.addNewPlayer(getTestNewPlayerData2(teamId));
    const player2 = player2obj.getPlayer();
    const testGameData = getTestGameData(teamId, player1.id, player2.id);
    const addedGamePlayed1 = await GamePlayed.addNewGamePlayed(testGameData);
    const addedGamePlayed2 = await GamePlayed.addNewGamePlayed(testGameData);
    const addedGamesPlayed = [ addedGamePlayed1, addedGamePlayed2 ];
    return addedGamesPlayed;
};


describe('Game Played model', () => {
    it('should create a game played object without errors', () => {
        const testGamePlayedBase = getTestGameData(1, 2, 3);
        const testGamePlayed = {
            ...testGamePlayedBase,
            id: 1,
            playedon: new Date(),
        };
        expect(() => new GamePlayed(testGamePlayed)).not.toThrow();
    });

    it('should be possible to use the getGamePlayed method', async () => {
        expect.assertions(7);
        const testGamePlayedBase = getTestGameData(1, 2, 3);
        const testGamePlayed = {
            ...testGamePlayedBase,
            id: 1,
            playedon: new Date(),
        };
        const gamePlayedInstance = new GamePlayed(testGamePlayed);
        const gamePlayed = gamePlayedInstance.getGamePlayed();

        expect(gamePlayed.teamid).toBe(testGamePlayed.teamid);
        expect(gamePlayed.player1id).toBe(testGamePlayed.player1id);
        expect(gamePlayed.player1score).toBe(testGamePlayed.player1score);
        expect(gamePlayed.player2id).toBe(testGamePlayed.player2id);
        expect(gamePlayed.player2score).toBe(testGamePlayed.player2score);
        expect(gamePlayed.winner).toBe(testGamePlayed.winner);
        expect(gamePlayed.addedby).toBe(testGamePlayed.addedby);
    });

    it('should be possible to persist played games', async () => {
        expect.assertions(2);
        const gamePlayedData = getTestGameData(0,0,0);
        const addedGameData = await createTestGamePlayed();
        const addedGame = addedGameData.getGamePlayed();

        expect(addedGame.player1score).toBe(gamePlayedData.player1score);
        expect(addedGame.player2score).toBe(gamePlayedData.player2score);
    });

    it('should be possible to fetch all games played for a team', async () => {
        expect.assertions(15);
        const gamePlayedDatas = await createTwoTestGamePlayed();
        const gamePlayedData1 = gamePlayedDatas[0];
        const gamePlayedData2 = gamePlayedDatas[1];
        const addedGame1 = gamePlayedData1.getGamePlayed();
        const addedGame2 = gamePlayedData2.getGamePlayed();
        const teamId = gamePlayedData1.teamid;
        const expectedLength = 2;
        const gamesPlayed = await GamePlayed.getGamesPlayedForTeam(teamId);

        expect(gamesPlayed.length).toBe(expectedLength);

        expect(addedGame1.teamid).toBe(gamePlayedData1.teamid);
        expect(addedGame1.player1id).toBe(gamePlayedData1.player1id);
        expect(addedGame1.player1score).toBe(gamePlayedData1.player1score);
        expect(addedGame1.player2id).toBe(gamePlayedData1.player2id);
        expect(addedGame1.player2score).toBe(gamePlayedData1.player2score);
        expect(addedGame1.winner).toBe(gamePlayedData1.winner);
        expect(addedGame1.addedby).toBe(gamePlayedData1.addedby);

        expect(addedGame2.teamid).toBe(gamePlayedData2.teamid);
        expect(addedGame2.player1id).toBe(gamePlayedData2.player1id);
        expect(addedGame2.player1score).toBe(gamePlayedData2.player1score);
        expect(addedGame2.player2id).toBe(gamePlayedData2.player2id);
        expect(addedGame2.player2score).toBe(gamePlayedData2.player2score);
        expect(addedGame2.winner).toBe(gamePlayedData2.winner);
        expect(addedGame2.addedby).toBe(gamePlayedData2.addedby);
    });

    it('should only fetch games for a single team', async () => {
        expect.assertions(5);
        const gamePlayedData1 = await createTestGamePlayed();
        const gamePlayedData2 = await createTestGamePlayed();
        const addedGame1 = gamePlayedData1.getGamePlayed();
        const addedGame2 = gamePlayedData2.getGamePlayed();
        const teamId1 = addedGame1.teamid;
        const teamId2 = addedGame2.teamid;
        const expectedLength = 1;
        const gamesPlayed1 = await GamePlayed.getGamesPlayedForTeam(teamId1);
        const gamesPlayed2 = await GamePlayed.getGamesPlayedForTeam(teamId2);

        expect(teamId1).not.toBe(teamId2);
        expect(addedGame1.id).toBe(teamId1);
        expect(addedGame2.id).toBe(teamId2);
        expect(gamesPlayed1.length).toBe(expectedLength);
        expect(gamesPlayed2.length).toBe(expectedLength);
    });
});

