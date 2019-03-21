import IPlayer from '../../typescript/IPlayer';
import ITeam from '../../typescript/ITeam';
import IGamePlayed from '../../typescript/IGamePlayed';

// TODO: Continue building test games

const testTeam: ITeam = {
    id: 42,
    name: 'bytecode',
    timecreated: new Date(),
};

const luciano: IPlayer = {
    id: 42,
    username: 'luciano',
    password: 'hashed-secret-pass',
    email: 'luciano@bytecode.nl',
    teamid: testTeam.id,
    timecreated: new Date(),
};

const jeroen: IPlayer = {
    id: 142,
    username: 'jeroen',
    password: 'hashed-secret-pass',
    email: 'jeroen@bytecode.nl',
    teamid: testTeam.id,
    timecreated: new Date(),
};

const testGames: IGamePlayed[] = [
    {
        id: 1,
        teamid: testTeam.id,
        player1id: luciano.id,
        player1score: 11,
        player2id: jeroen.id,
        player2score: 8,
        winner: luciano.id,
        addedby: luciano.id,
        playedon: new Date(),
    },
];

export default testGames;
