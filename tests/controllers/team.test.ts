import request from 'supertest';
import app from '../../server/app';

describe('team create route', () => {
    it('should return status OK', () => {
        request(app)
            .get('/api/v1/team/create')
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});

describe('team get all route', () => {
    it('should return status OK', () => {
        request(app)
            .get('/api/v1/team/get-all-data')
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});
