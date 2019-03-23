import request from 'supertest';
import app from '../../server/app';
import Player from '../../models/player';
import Team from '../../models/team';

describe('user auth route', () => {
    it('should fail with incorrect details', () => {
        request(app)
            .post('/api/v1/player/authenticate')
            .send({ username: 'testfalse', password: 'incorrect' })
            .end((err, res) => {
                expect(res.status).toBe(401);
            });
    });

    it('should 201 with payload on correct details', async () => {
        const newTeamObj = await Team.addNewTeam({name: 'testteamplayers'});
        const newTeam = newTeamObj.getTeam();
        const newPlayerData = {
            username: 'averynewplayer',
            email: 'averynewplayer@bytecode.nl',
            password: 'verysecret',
            teamid: newTeam.id,
        };
        const newPlayer = await Player.addNewPlayer(newPlayerData);
        console.log(newPlayer);
        request(app)
            .post('/api/v1/player/authenticate')
            .send({
                username: newPlayerData.username,
                password: newPlayerData.password })
            .end((err, res) => {
                expect(res.status).toBe(201);
                expect(typeof res.body.jwt).toBe('string');
                expect(typeof res.body.username).toBe('string');
                expect(typeof res.body.userid).toBe('number');
                expect(typeof res.body.teamid).toBe('number');
            });
    });
});

describe('user register route', () => {
    it('should return status OK', () => {
        request(app)
            .post('/api/v1/player/register')
            .send({ data: 'test' })
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});
