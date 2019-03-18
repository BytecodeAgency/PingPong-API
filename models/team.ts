import knex from '../helpers/db';

class Team implements ITeamClass {
    private id: number;
    private name: string;
    private invitecode?: string;
    private timecreated: Date;


    constructor(teamData: ITeam) {
        this.id = teamData.id;
        this.name = teamData.name;
        this.invitecode = teamData.invitecode;
        this.timecreated = teamData.timecreated;
    }

    public getTeam(): ITeam {
        const team: ITeam = {
            id: this.id,
            name: this.name,
            invitecode: this.invitecode,
            timecreated: this.timecreated,
        };
        return team;
    }

    public static async addNewTeam(newTeam: ITeamNew): Promise<Team> {
        const returning = [
            'id', 'name', 'invitecode', 'timecreated',
        ];
        const addedTeamArr = await knex('teams')
            .insert(newTeam)
            .returning(returning);
        const addedTeam: ITeam = addedTeamArr[0];
        const team = new Team(addedTeam);
        return team;
    }

    public static async getTeamById(id: number): Promise<Team> {
        const teamArr = await knex.select('*').from('teams').where({ id });
        const teamData: ITeam = teamArr[0];
        const team: Team = new Team(teamData);
        return team;
    }
}

interface ITeam {
    id: number;
    name: string;
    invitecode?: string;
    timecreated: Date;
}

interface ITeamNew {
    name: string;
}

interface ITeamClass {
    getTeam(): ITeam;
}

export default Team;
