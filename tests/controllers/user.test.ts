import request from 'supertest';
import app from '../../server/app';

describe('user auth route', () => {
    it('should return status OK', () => {
        request(app)
            .get('/api/v1/user/authenticate')
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});

describe('user register route', () => {
    it('should return status OK', () => {
        request(app)
            .get('/api/v1/user/register')
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});
