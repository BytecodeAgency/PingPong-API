import request from 'supertest';
import app from '../../server/app';

describe('team create route', () => {
    it('should return status OK', () => {
        request(app)
            .post('/api/v1/team/create')
            .send({ data: 'test' })
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});

describe('team get all route', () => {
    it('should return status OK', () => {
        request(app)
            .post('/api/v1/team/get-all-data')
            .send({ data: 'test' })
            .end((err, res) => {
                expect(res.status).toBe(200);
            });
    });
});
