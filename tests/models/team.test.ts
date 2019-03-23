import Team from '../../models/team';
import Player from '../../models/player';
import { useTestDatabase } from '../config';

useTestDatabase();

const testTeamData = {
    id: 96,
    name: 'testteam',
    invitecode: 'testinvite',
    timecreated: new Date(),
};

const testNewTeamData = {
    name: 'teamname',
};

const addTestTeamWithMembers = async () => {
    const newTeamObject = await Team.addNewTeam({ name: 'teammembertestteam' });
    const newTeam = newTeamObject.getTeam();
    const newPlayer1 = await Player.addNewPlayer({
        teamid: newTeam.id,
        username: 'teamthenewplayer1',
        password: 'testpass1',
        email: 'teamthenewplayer1@gmail.com',
    });
    const newPlayer2 = await Player.addNewPlayer({
        teamid: newTeam.id,
        username: 'teamthenewplayer2',
        password: 'testpass2',
        email: 'teamthenewplayer2@gmail.com',
    });
    const expectedTeamMembers = [newPlayer1, newPlayer2];
    return {
        expectedTeamMembers,
        team: newTeamObject,
    };
};

describe('Team model', () => {
    it('should create a player object without errors', () => {
        expect(() => new Team(testTeamData)).not.toThrow();
    });

    it('should be possible to use the getTeam method', () => {
        const playerInstance = new Team(testTeamData);
        const player = playerInstance.getTeam();
        expect(player).toEqual(testTeamData);
    });

    it('should be possible to add users and fetch by id', async () => {
        expect.assertions(4);
        const newTeamObject = await Team.addNewTeam(testNewTeamData);
        const newTeam = newTeamObject.getTeam();
        const fetchedNewTeamObject = await Team.getTeamById(newTeam.id);
        const fetchedNewTeam = fetchedNewTeamObject.getTeam();
        expect(newTeam.id).toBe(fetchedNewTeam.id);
        expect(newTeam.name).toBe(fetchedNewTeam.name);
        expect(newTeam.invitecode).toBe(fetchedNewTeam.invitecode);
        expect(newTeam.timecreated).toEqual(fetchedNewTeam.timecreated);
    });

    it('should be possible to fetch all team members', async () => {
        const testData = await addTestTeamWithMembers();
        const teamMembers = await testData.team.getTeamMembers();
        expect(teamMembers).toEqual(testData.expectedTeamMembers);
    });
});

