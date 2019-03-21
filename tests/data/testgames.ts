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

const nick: IPlayer = {
    id: 420,
    username: 'nick',
    password: 'hashed-secret-pass',
    email: 'nick@bytecode.nl',
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
    {
        id: 2,
        teamid: testTeam.id,
        player1id: luciano.id,
        player1score: 12,
        player2id: jeroen.id,
        player2score: 10,
        winner: luciano.id,
        addedby: luciano.id,
        playedon: new Date(),
    },
    {
        id: 3,
        teamid: testTeam.id,
        player1id: luciano.id,
        player1score: 11,
        player2id: jeroen.id,
        player2score: 13,
        winner: jeroen.id,
        addedby: nick.id,
        playedon: new Date(),
    },
    {
        id: 4,
        teamid: testTeam.id,
        player1id: luciano.id,
        player1score: 11,
        player2id: jeroen.id,
        player2score: 13,
        winner: jeroen.id,
        addedby: luciano.id,
        playedon: new Date(),
    },
    {
        id: 5,
        teamid: testTeam.id,
        player1id: luciano.id,
        player1score: 11,
        player2id: jeroen.id,
        player2score: 4,
        winner: luciano.id,
        addedby: luciano.id,
        playedon: new Date(),
    },
    {
        id: 6,
        teamid: testTeam.id,
        player1id: jeroen.id,
        player1score: 11,
        player2id: luciano.id,
        player2score: 8,
        winner: jeroen.id,
        addedby: luciano.id,
        playedon: new Date(),
    },
    {
        id: 7,
        teamid: testTeam.id,
        player1id: nick.id,
        player1score: 11,
        player2id: jeroen.id,
        player2score: 8,
        winner: nick.id,
        addedby: luciano.id,
        playedon: new Date(),
    },
    {
        id: 8,
        teamid: testTeam.id,
        player1id: jeroen.id,
        player1score: 11,
        player2id: nick.id,
        player2score: 1,
        winner: jeroen.id,
        addedby: nick.id,
        playedon: new Date(),
    },
    {
        id: 9,
        teamid: testTeam.id,
        player1id: jeroen.id,
        player1score: 9,
        player2id: nick.id,
        player2score: 11,
        winner: nick.id,
        addedby: nick.id,
        playedon: new Date(),
    },
    {
        id: 10,
        teamid: testTeam.id,
        player1id: jeroen.id,
        player1score: 9,
        player2id: nick.id,
        player2score: 11,
        winner: nick.id,
        addedby: nick.id,
        playedon: new Date(),
    },
];

export default testGames;
