import Team from '../../models/team';
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
});

