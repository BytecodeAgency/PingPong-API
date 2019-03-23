import request from 'supertest';
import app from '../../server/app';

describe('user auth route', () => {
    it('should return status OK', () => {
        request(app)
            .post('/api/v1/player/authenticate')
            .send({ data: 'test' })
            .end((err, res) => {
                expect(res.status).toBe(200);
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
